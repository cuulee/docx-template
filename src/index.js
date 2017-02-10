import esprima from "esprima"
import docx4js from "docx4js"

const VARIANTS="control.picture,control.text,block,inline".split(",") 
export class DocxTemplate extends docx4js{
	/**
	* entry: parse template as a variant document, then you can assemble with data
	**/
	static parse(file){
        return this.load(file).then(docx=>{
			let handler=new VariantHandler(docx)
			debugger
			docx.parse(handler, DocxTemplate.identify)
			return handler
        })
    }

    static assemble(file,data){
        return this.parse(file)
			.then(varDoc=>varDoc.assemble(data,true))
    }
	
	static isExp(text){
		text=text.trim()
		if(text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}'){
			text=text.substring(2,text.length-1).trim()
			if(text.length)
				return text
		}
		return false
	}
	
	static identify(node, officeDocument){
		let tagName=node.name.split(":").pop()
		if(tagName=="styles" || tagName=="numbering")
			return null
		
		let model=docx4js.OfficeDocument.identify(...arguments)
		if(typeof(model)=="string" || VARIANTS.indexOf(model.type)==-1)
			return model

		let tag=[node.children.find(a=>a.name=="w:sdtPr")]
			.find(a=>a.name=="w:tag")
			
		if(!tag)
			return model
		
		tag=tag.attribs["w:val"]
		if(!tag)
			return model
		
		tag=tag.trim()
		switch(model.type){
			case "control.picture":
			case "control.text": {
				let exp=DocxTemplate.isExp(tag)
				if(!exp)
					return model
				
				model.type=`${model.type}.var`
				model.code=exp
				return model
			}
			case "block":
			case "inline":{
				let parsedCode=esprima.parse(tag+'{}')
				if(parsedCode.body.length==2)//for/if(){}{}
					parsedCode.body.pop()
				else if(parsedCode.body.length>1){
					console.warn(`syntax error, ignore as static content: \n\r ${officeDocument.content(node).text()}`)
					return model
				}
				let [firstStatement]=parsedCode.body
				switch(firstStatement.type){
					case 'ForStatement':
						model.type=`${model.type}.for`
						model.code=parsedCode
						return model
					break
					case 'IfStatement':
						model.type=`${model.type}.if`
						model.code=parsedCode
						return model
					break
					default:
						console.warn(`unsupported statement in ${model.type}, ignore as static content: \n\r ${officeDocument.content(node).text()}`)
						return model
				}
			}
		}
		
		return model
	}
}

export default DocxTemplate

import ModelHandler from "docx4js/lib/openxml/docx/model-handler"
import Document from "./model/document"
import Expression from "./model/_exp"
import If from "./model/_if"
import For from "./model/_for"
import Picture from "./model/_picture"

class VariantHandler extends ModelHandler{
	constructor(docx){
		super()
		this.docx=docx
	}
	
	createElement(type,{code,node},children){
		console.log(type)
		switch(type){
			case "control.picture.var":
				return new Picture(node,code)
			case "control.text.var":
				return new Expression(node,code)
			case "block.for":
			case "inline.for":
				return new ForStatement(node,code,children)
			case "block.if":
			case "inline.if":
				return new IfStatement(node,code,children)
			case "document":
				this.varDoc=new Document(node,children,docx)
				return this
			default:
				return children
		}
		
	}

	assemble(data,transactional){
		return this.varDoc.assemble(...arguments)
	}
}