"use strict";

var newDocx=require("docx4js/spec/newDocx")
var DocxHub=require("../lib")

describe("docxhub", function(){
	describe("can parse template for", function(){
		describe("root", function(){
			function check(content, model, done){
				DocxHub.parse(newDocx(content)).then(variantDocx=>{
					if(variantDocx.variantChildren[0].type==model){
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}
			it("expression",done=>check(contents['var'],'variant.exp',done))

			it("if", done=>check(contents['if'](),'variant.if',done))

			it("for", done=>check(contents['for'](),'variant.for',done))

			it("picture", done=>check(contents['picture'](), 'variant.picture',done))

		})

		describe("nested if", function(){
			function check(content, model, done){
				DocxHub.parse(newDocx(contents['if'](content))).then(variantDocx=>{
					var _if=variantDocx.variantChildren[0]
					if(_if.type=="variant.if" && _if.variantChildren[0].type==model){
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}

			it("expression",done=>check(contents['var'],'variant.exp',done))

			it("if", done=>check(contents['if'](),'variant.if',done))

			it("for", done=>check(contents['for'](),'variant.for',done))

			it("picture", done=>check(contents['picture'](),'variant.picture',done))
		})

		describe("nested for", function(){
			function check(content, model, done){
				DocxHub.parse(newDocx(contents['for'](content))).then(variantDocx=>{
					var _for=variantDocx.variantChildren[0]
					if(_for.type=="variant.for" && _for.variantChildren[0].type==model){
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}

			it("expression",done=>check(contents['var'],'variant.exp',done))

			it("if", done=>check(contents['if'](),'variant.if',done))

			it("for", done=>check(contents['for'](),'variant.for',done))

			it("picture", done=>check(contents['picture'](),'variant.picture',done))
		})

		let contents={
			"if":a=>`
				<w:sdt>
					<w:sdtPr>
						<w:alias w:val="a==1"/>
						<w:tag w:val="if(1==1)"/>
						<w:id w:val="922459404"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						${a||`<w:p>
							<w:r>
								<w:t>hello.</w:t>
							</w:r>
						</w:p>`}
					</w:sdtContent>
				</w:sdt>`,
			"for":a=>`
				<w:sdt>
					<w:sdtPr>
						<w:alias w:val="loop 10 times"/>
						<w:tag w:val="for(var i=10;i>0;i--)"/>
						<w:id w:val="922459404"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						${a||`<w:p>
							<w:r>
								<w:t>hello.</w:t>
							</w:r>
						</w:p>`}
					</w:sdtContent>
				</w:sdt>`,
			"var":`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="922459404"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p>
							<w:r>
								<w:t>${"${name}"}</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`,
				"picture": a=>`
		            <w:sdt>
		              <w:sdtPr>
		                <w:alias w:val="${a||"${photo}"}"/>
		                <w:tag w:val="${a||"${photo}"}"/>
		                <w:id w:val="12965037"/>
		                <w:picture/>
		              </w:sdtPr>
		              <w:sdtEndPr/>
		              <w:sdtContent>
		                <w:p w14:paraId="3B5C815A" w14:textId="77777777" w:rsidR="001E2BD6" w:rsidRDefault="001E2BD6" w:rsidP="00157BC0">
		                  <w:r>
		                    <w:rPr>
		                      <w:noProof/>
		                      <w:lang w:eastAsia="en-US"/>
		                    </w:rPr>
		                    <w:drawing>
		                      <wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="66DB2419" wp14:editId="0004BB16">
		                        <wp:extent cx="1901825" cy="1267883"/>
		                        <wp:effectExtent l="0" t="0" r="3175" b="2540"/>
		                        <wp:docPr id="2" name="Picture 1"/>
		                        <wp:cNvGraphicFramePr>
		                          <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
		                        </wp:cNvGraphicFramePr>
		                        <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
		                          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
		                            <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
		                              <pic:nvPicPr>
		                                <pic:cNvPr id="0" name="Picture 1"/>
		                                <pic:cNvPicPr>
		                                  <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
		                                </pic:cNvPicPr>
		                              </pic:nvPicPr>
		                              <pic:blipFill>
		                                <a:blip r:embed="rId7">
		                                  <a:extLst>
		                                    <a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
		                                      <a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
		                                    </a:ext>
		                                  </a:extLst>
		                                </a:blip>
		                                <a:stretch>
		                                  <a:fillRect/>
		                                </a:stretch>
		                              </pic:blipFill>
		                              <pic:spPr bwMode="auto">
		                                <a:xfrm>
		                                  <a:off x="0" y="0"/>
		                                  <a:ext cx="1901825" cy="1267883"/>
		                                </a:xfrm>
		                                <a:prstGeom prst="rect">
		                                  <a:avLst/>
		                                </a:prstGeom>
		                                <a:noFill/>
		                                <a:ln>
		                                  <a:noFill/>
		                                </a:ln>
		                              </pic:spPr>
		                            </pic:pic>
		                          </a:graphicData>
		                        </a:graphic>
		                      </wp:inline>
		                    </w:drawing>
		                  </w:r>
		                </w:p>
		              </w:sdtContent>
		            </w:sdt>`
		}
	})

	describe("can assemble with data for", function(){
		describe("root", function(){
			let contents={
				"if":a=>`
					<w:sdt>
						<w:sdtPr>
							<w:alias w:val="a==1"/>
							<w:tag w:val="if(${a})"/>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							<w:p>
								<w:r>
									<w:t>hello.</w:t>
								</w:r>
							</w:p>
						</w:sdtContent>
					</w:sdt>`,
				"for":(a,b)=>`
					<w:sdt>
						<w:sdtPr>
							<w:alias w:val="loop 10 times"/>
							<w:tag w:val="for(${a})"/>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							${b||`<w:p>
								<w:r>
									<w:t>hello.</w:t>
								</w:r>
							</w:p>`}
						</w:sdtContent>
					</w:sdt>`,
				"var":a=>`
					<w:sdt>
						<w:sdtPr>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							<w:p>
								<w:r>
									<w:t>${a||"${name}"}</w:t>
								</w:r>
							</w:p>
						</w:sdtContent>
					</w:sdt>`,
				"picture": a=>`
			            <w:sdt>
			              <w:sdtPr>
			                <w:alias w:val="${a||"${photo}"}"/>
			                <w:tag w:val="${a||"${photo}"}"/>
			                <w:id w:val="12965037"/>
			                <w:picture/>
			              </w:sdtPr>
			              <w:sdtEndPr/>
			              <w:sdtContent>
			                <w:p w14:paraId="3B5C815A" w14:textId="77777777" w:rsidR="001E2BD6" w:rsidRDefault="001E2BD6" w:rsidP="00157BC0">
			                  <w:r>
			                    <w:rPr>
			                      <w:noProof/>
			                      <w:lang w:eastAsia="en-US"/>
			                    </w:rPr>
			                    <w:drawing>
			                      <wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="66DB2419" wp14:editId="0004BB16">
			                        <wp:extent cx="1901825" cy="1267883"/>
			                        <wp:effectExtent l="0" t="0" r="3175" b="2540"/>
			                        <wp:docPr id="2" name="Picture 1"/>
			                        <wp:cNvGraphicFramePr>
			                          <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
			                        </wp:cNvGraphicFramePr>
			                        <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
			                          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
			                            <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
			                              <pic:nvPicPr>
			                                <pic:cNvPr id="0" name="Picture 1"/>
			                                <pic:cNvPicPr>
			                                  <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
			                                </pic:cNvPicPr>
			                              </pic:nvPicPr>
			                              <pic:blipFill>
			                                <a:blip r:embed="rId7">
			                                  <a:extLst>
			                                    <a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
			                                      <a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
			                                    </a:ext>
			                                  </a:extLst>
			                                </a:blip>
			                                <a:stretch>
			                                  <a:fillRect/>
			                                </a:stretch>
			                              </pic:blipFill>
			                              <pic:spPr bwMode="auto">
			                                <a:xfrm>
			                                  <a:off x="0" y="0"/>
			                                  <a:ext cx="1901825" cy="1267883"/>
			                                </a:xfrm>
			                                <a:prstGeom prst="rect">
			                                  <a:avLst/>
			                                </a:prstGeom>
			                                <a:noFill/>
			                                <a:ln>
			                                  <a:noFill/>
			                                </a:ln>
			                              </pic:spPr>
			                            </pic:pic>
			                          </a:graphicData>
			                        </a:graphic>
			                      </wp:inline>
			                    </w:drawing>
			                  </w:r>
			                </w:p>
			              </w:sdtContent>
			            </w:sdt>`
				}

			function check(content, model, data, done, moreExpect){
				DocxHub.assemble(newDocx(content), data).then(docx=>{
					expect(docx.variantChildren.length).toBeGreaterThan(0)
					if(docx.variantChildren[0].type==model){
						moreExpect(docx.variantChildren[0],docx)
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}
			it("expression, and main part are serialized with changes",done=>check(contents['var'](),'variant.exp',{name:"abc"}, done, (assembledVariant,docx)=>{
				expect(assembledVariant.assembledXml.$1('t').textContent=="abc")
				let Part=require("docx4js/lib/openxml/part")
				spyOn(Part.prototype,"_serialize").and.callThrough()
				docx.save()
				expect(Part.prototype._serialize).toHaveBeenCalled()
			}))

			it("picture",done=>{
				var Picture=require("../lib/model/_picture")
				spyOn(Picture.prototype,"getImageData").and.returnValue(Promise.resolve([1,2,3]))
				check(contents['picture'](),'variant.picture',{photo:"abc"}, done, (assembledVariant,docx)=>{
					expect(Picture.prototype.getImageData).toHaveBeenCalledWith("abc")
					// r:embed="rId10" updated
					expect(assembledVariant.assembledXml.$1('blip').getAttribute('r:embed')).toBe("rId10")
					// relationship appended
					expect(!!assembledVariant.docxPart.rels["rId10"]).toBe(true)
					// image part added
					expect(!!assembledVariant.docxPart.getRel("rId10")).toBe(true)
					done()
				})
			})

			describe("if", function(){
				it("if(true)", done=>check(contents['if']("true"),'variant.if',{},done, assembledVariant=>{
					expect(assembledVariant.assembledXml.$1('sdtContent').childNodes.length).toBeGreaterThan(0)
				}))

				it("if(name=='abc')", done=>check(contents['if']("name='abc'"),'variant.if',{name:"abc"},done, assembledVariant=>{
					expect(assembledVariant.assembledXml.$1('sdtContent').childNodes.length).toBeGreaterThan(0)
				}))

				it("if(false)", done=>check(contents['if']("false"),'variant.if',{},done, assembledVariant=>{
					expect(assembledVariant.assembledXml.$1('sdtContent').childNodes.length).toBe(0)
				}))

				it("if(name=='abcd')", done=>check(contents['if']("name=='abcd'"),'variant.if',{name:"abc"},done, assembledVariant=>{
					expect(assembledVariant.assembledXml.$1('sdtContent').childNodes.length).toBe(0)
				}))
			})

			describe("for", function(){
				it("for(var i=0;i<10;i++)", done=>check(contents['for']("var i=0;i&lt;10;i++"),'variant.for',{},done, assembledVariant=>{
					expect(assembledVariant.assembledXml.$('p').length).toBe(10)
				}))

				it("for(var i=0, len=types.length;i<len;i++)", done=>
					check(contents['for']("var i=0,len=types.length;i &lt; len;i++"),'variant.for',{types:["a","b"]},done, assembledVariant=>{
						expect(assembledVariant.assembledXml.$('p').length).toBe(2)
				}))

				it("for(var i=0, len=types.length;i<len;i++): ${name}", done=>
					check(contents['for']("var i=0,len=types.length;i &lt; len;i++",contents['var']()),'variant.for',{types:["a","b"],name:"hello"},done, assembledVariant=>{
						expect(assembledVariant.variantChildren.length).toBe(1)
						var ps=assembledVariant.assembledXml.$('p')
						//console.log(assembledVariant.assembledXml.outerHTML)
						expect(ps.length).toBe(2)
						expect(ps[0].textContent.trim()).toBe("hello")
						expect(ps[1].textContent.trim()).toBe("hello")
				}))

				it("for(var i=0, len=types.length;i<len;i++): ${types[i]}", done=>
					check(contents['for']("var i=0,len=types.length;i &lt; len;i++",contents['var']('${types[i]}')),'variant.for',{types:["a","b"],name:"hello"},done, assembledVariant=>{
						var ps=assembledVariant.assembledXml.$('p')
						expect(ps.length).toBe(2)
						expect(ps[0].textContent.trim()).toBe("a")
						expect(ps[1].textContent.trim()).toBe("b")
				}))

			})

		})

		describe("nested if", function(){
			function check(content, model, data, done, moreExpect){
				DocxHub.assemble(newDocx(contents['if'](content)),data).then(variantDocx=>{
					var _if=variantDocx.variantChildren[0]
					if(_if.type=="variant.if" && _if.variantChildren[0].type==model){
						moreExpect(_if.assembledXml)
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}

			it("expression",done=>check(contents['var'](),'variant.exp',{name:"abc"}, done, a=>{
				expect(a.$1('t').textContent).toBe("abc")
			}))

			it("picture",done=>{
				var Picture=require("../lib/model/_picture")
				spyOn(Picture.prototype,"getImageData").and.returnValue(Promise.resolve([1,2,3]))

				check(contents['picture'](),'variant.picture',{photo:"abc"}, done, a=>{
					expect(Picture.prototype.getImageData).toHaveBeenCalledWith("abc")
					expect(a.$1('blip').getAttribute("r:embed")).toBe("rId10")
				})
			})

			it("if", done=>check(contents['if'](),'variant.if',{}, done,a=>{
				expect(a.$1('t').textContent).toBe("hello.")
			}))

			it("for", done=>check(contents['for']("var i=0;i&lt;3;i++"),'variant.for',{},done, a=>{
				expect(a.$('p').length).toBe(3)
			}))

			let contents={
				"if":(a)=>`
					<w:sdt>
						<w:sdtPr>
							<w:alias w:val="a==1"/>
							<w:tag w:val="if(true)"/>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							${a||`<w:p>
								<w:r>
									<w:t>hello.</w:t>
								</w:r>
							</w:p>`}
						</w:sdtContent>
					</w:sdt>`,
				"for":(a,b)=>`
					<w:sdt>
						<w:sdtPr>
							<w:alias w:val="loop 10 times"/>
							<w:tag w:val="for(${a})"/>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							${b||`<w:p>
								<w:r>
									<w:t>hello.</w:t>
								</w:r>
							</w:p>`}
						</w:sdtContent>
					</w:sdt>`,
				"var":a=>`
					<w:sdt>
						<w:sdtPr>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							<w:p>
								<w:r>
									<w:t>${a||"${name}"}</w:t>
								</w:r>
							</w:p>
						</w:sdtContent>
					</w:sdt>`,
				"picture": a=>`
			            <w:sdt>
			              <w:sdtPr>
			                <w:alias w:val="${a||"${photo}"}"/>
			                <w:tag w:val="${a||"${photo}"}"/>
			                <w:id w:val="12965037"/>
			                <w:picture/>
			              </w:sdtPr>
			              <w:sdtEndPr/>
			              <w:sdtContent>
			                <w:p w14:paraId="3B5C815A" w14:textId="77777777" w:rsidR="001E2BD6" w:rsidRDefault="001E2BD6" w:rsidP="00157BC0">
			                  <w:r>
			                    <w:rPr>
			                      <w:noProof/>
			                      <w:lang w:eastAsia="en-US"/>
			                    </w:rPr>
			                    <w:drawing>
			                      <wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="66DB2419" wp14:editId="0004BB16">
			                        <wp:extent cx="1901825" cy="1267883"/>
			                        <wp:effectExtent l="0" t="0" r="3175" b="2540"/>
			                        <wp:docPr id="2" name="Picture 1"/>
			                        <wp:cNvGraphicFramePr>
			                          <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
			                        </wp:cNvGraphicFramePr>
			                        <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
			                          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
			                            <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
			                              <pic:nvPicPr>
			                                <pic:cNvPr id="0" name="Picture 1"/>
			                                <pic:cNvPicPr>
			                                  <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
			                                </pic:cNvPicPr>
			                              </pic:nvPicPr>
			                              <pic:blipFill>
			                                <a:blip r:embed="rId7">
			                                  <a:extLst>
			                                    <a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
			                                      <a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
			                                    </a:ext>
			                                  </a:extLst>
			                                </a:blip>
			                                <a:stretch>
			                                  <a:fillRect/>
			                                </a:stretch>
			                              </pic:blipFill>
			                              <pic:spPr bwMode="auto">
			                                <a:xfrm>
			                                  <a:off x="0" y="0"/>
			                                  <a:ext cx="1901825" cy="1267883"/>
			                                </a:xfrm>
			                                <a:prstGeom prst="rect">
			                                  <a:avLst/>
			                                </a:prstGeom>
			                                <a:noFill/>
			                                <a:ln>
			                                  <a:noFill/>
			                                </a:ln>
			                              </pic:spPr>
			                            </pic:pic>
			                          </a:graphicData>
			                        </a:graphic>
			                      </wp:inline>
			                    </w:drawing>
			                  </w:r>
			                </w:p>
			              </w:sdtContent>
			            </w:sdt>`
			}
		})

		describe("nested for", function(){
			function check(content, model, data, done, moreExpect){
				DocxHub.assemble(newDocx(contents['for'](content)),data).then(variantDocx=>{
					var _for=variantDocx.variantChildren[0]
					if(_for.type=="variant.for" && _for.variantChildren[0].type==model){
						moreExpect(_for.assembledXml)
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}

			it("expression",done=>check(contents['var'](),'variant.exp',{name:"abc"}, done, a=>{
				expect(a.$1('t').textContent).toBe("abc")
			}))

			it("picture",done=>{
				var Picture=require("../lib/model/_picture")
				spyOn(Picture.prototype,"getImageData").and.returnValue(Promise.resolve([1,2,3]))

				check(contents['picture'](),'variant.picture',{photo:"abc"}, done, a=>{
					expect(Picture.prototype.getImageData).toHaveBeenCalledWith("abc")
					expect(a.$1('blip').getAttribute("r:embed")).toBe("rId10")
				})
			})

			it("if", done=>check(contents['if'](),'variant.if',{name:"abc"}, done,a=>{
				expect(a.$1('t').textContent).toBe("hello.")
			}))

			it("for", done=>check(contents['for'](),'variant.for',{},done, a=>{
				expect(a.$('p').length).toBe(3)
			}))

			it("for", done=>check(contents['for'](contents['var']()),'variant.for',{name:"abc"},done, a=>{
				expect(a.$('p').length).toBe(3)
				expect(a.$1('t').textContent).toBe("abc")

			}))

			it("for", done=>{
				var data={
					a:["a","b","c"],
					c:{
						b:["z","y"]
					}
				}
				var varContent=contents['var']("${`${i}.${b[k]}.${a[j]}`}")
				var loop3=contents['for'](varContent,"var k=0,b=c.b,klen=b.length;k&lt;klen;k++")
				var loop2=contents['for'](loop3,"var j=0,jlen=a.length;j&lt;jlen;j++")
				check(loop2,'variant.for',data,done, a=>{
					var texts=a.$('t')
					expect(texts.length).toBe(18)
					expect(texts[0].textContent).toBe("0.z.a")
					expect(texts[17].textContent).toBe("2.y.c")
				})
			})

			let contents={
				"if":(a)=>`
					<w:sdt>
						<w:sdtPr>
							<w:alias w:val="a==1"/>
							<w:tag w:val="if(true)"/>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							${a||`<w:p>
								<w:r>
									<w:t>hello.</w:t>
								</w:r>
							</w:p>`}
						</w:sdtContent>
					</w:sdt>`,
				"for":(b,a)=>`
					<w:sdt>
						<w:sdtPr>
							<w:alias w:val="loop 10 times"/>
							<w:tag w:val="for(${a||"var i=0;i&lt;3;i++"})"/>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							${b||`<w:p>
								<w:r>
									<w:t>hello.</w:t>
								</w:r>
							</w:p>`}
						</w:sdtContent>
					</w:sdt>`,
				"var":a=>`
					<w:sdt>
						<w:sdtPr>
							<w:id w:val="922459404"/>
							<w:placeholder>
								<w:docPart w:val="DefaultPlaceholder_1082065158"/>
							</w:placeholder>
						</w:sdtPr>
						<w:sdtEndPr/>
						<w:sdtContent>
							<w:p>
								<w:r>
									<w:t>${a||"${name}"}</w:t>
								</w:r>
							</w:p>
						</w:sdtContent>
					</w:sdt>`,
				"picture": a=>`
			            <w:sdt>
			              <w:sdtPr>
			                <w:alias w:val="${a||"${photo}"}"/>
			                <w:tag w:val="${a||"${photo}"}"/>
			                <w:id w:val="12965037"/>
			                <w:picture/>
			              </w:sdtPr>
			              <w:sdtEndPr/>
			              <w:sdtContent>
			                <w:p w14:paraId="3B5C815A" w14:textId="77777777" w:rsidR="001E2BD6" w:rsidRDefault="001E2BD6" w:rsidP="00157BC0">
			                  <w:r>
			                    <w:rPr>
			                      <w:noProof/>
			                      <w:lang w:eastAsia="en-US"/>
			                    </w:rPr>
			                    <w:drawing>
			                      <wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="66DB2419" wp14:editId="0004BB16">
			                        <wp:extent cx="1901825" cy="1267883"/>
			                        <wp:effectExtent l="0" t="0" r="3175" b="2540"/>
			                        <wp:docPr id="2" name="Picture 1"/>
			                        <wp:cNvGraphicFramePr>
			                          <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
			                        </wp:cNvGraphicFramePr>
			                        <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
			                          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
			                            <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
			                              <pic:nvPicPr>
			                                <pic:cNvPr id="0" name="Picture 1"/>
			                                <pic:cNvPicPr>
			                                  <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
			                                </pic:cNvPicPr>
			                              </pic:nvPicPr>
			                              <pic:blipFill>
			                                <a:blip r:embed="rId7">
			                                  <a:extLst>
			                                    <a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
			                                      <a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
			                                    </a:ext>
			                                  </a:extLst>
			                                </a:blip>
			                                <a:stretch>
			                                  <a:fillRect/>
			                                </a:stretch>
			                              </pic:blipFill>
			                              <pic:spPr bwMode="auto">
			                                <a:xfrm>
			                                  <a:off x="0" y="0"/>
			                                  <a:ext cx="1901825" cy="1267883"/>
			                                </a:xfrm>
			                                <a:prstGeom prst="rect">
			                                  <a:avLst/>
			                                </a:prstGeom>
			                                <a:noFill/>
			                                <a:ln>
			                                  <a:noFill/>
			                                </a:ln>
			                              </pic:spPr>
			                            </pic:pic>
			                          </a:graphicData>
			                        </a:graphic>
			                      </wp:inline>
			                    </w:drawing>
			                  </w:r>
			                </w:p>
			              </w:sdtContent>
			            </w:sdt>`
			}
		})
	})
})
