import { useState } from "react";
import { getQrStampedPdf, downloadPDF } from "../lib/ModifyPdf";
import { useSelector } from 'react-redux'
import icon from "../1x/qrStampIcon.png";

export default function Editor({setPDF, currentPDF}){
    const scale = useSelector(state => state.qr.scale)
    const rotate = useSelector(state => state.qr.rotate)
    const translate = useSelector(state => state.qr.translate)
    const value = useSelector(state => state.qr.value)
    const foreground = useSelector(state => state.qr.foreground)
    const background = useSelector(state => state.qr.background)

    const qrDataObject = {
        scale: scale,
        rotate: rotate,
        translate: translate,
        value: value,
        foreground: foreground,
        background: background,
    }

    const [links, setLinks] = useState([]);
    const handleClickStamp = () => {
        let pdfs = [];
        links.forEach(link => {
            const pdfBytes = getQrStampedPdf(currentPDF, link.domain, qrDataObject);
            pdfs.push({"bytes":pdfBytes, "name":link.name});
        });
        downloadPDF(pdfs);
    }
    const handleChangeLinks = (e) => {
        setLinks(
            e.target.value.split("\n").map((link, index) => {
                    link = link.trim(" ").split(" ")
                    if (link.length === 2) {
                        if (link[1].substr(link[1].length - 4) !== ".pdf") {
                            link[1] = link[1] + ".pdf";
                        }
                        return {"domain":link[0], "name": link[1]}
                    }
                return {"error": index}
            })
        );
    }
    return(
        <div className="w-0 flex-1 h-full Editor bg-slate-100 max-w-md p-10 rounded-xl overflow-scroll">
            <div className="flex">
                <img className="w-7 h-9 mr-2" src={icon}></img>
                <h1 className="title">QR stamp</h1>
            </div>
            <section>
                <h2>Select PDF</h2>
                <div className="flex justify-center">
                    <div className="mb-3 w-full">
                        <label className="w-full block bg-slate-200 rounded-md text-center p-5 cursor-pointer border text-blue-500 hover:border-blue-500">
                            <span className="">Add File</span>
                            <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setPDF(e.target.files[0])}/>
                        </label>
                        <input type="file" accept="application/pdf" className="m-0 p-0 h-0 w-0 focus:h-8 focus:w-full" onChange={(e) => setPDF(e.target.files[0])}/>
                    </div>
                </div>
            </section>
            <section className="flex flex-col">
                <h2>Links</h2>
                <p className="text-xs">Format: [URL] [Output name]</p>
                <textarea onChange={handleChangeLinks} name="stamps" className="bg-slate-200 w-full h-24 rounded-md py-1 px-2" placeholder="www.example.com example.pdf&#13;&#10;www.test.com test.pdf"></textarea>   
                <button className="bg-blue-500 text-white py-2 px-8 rounded-md self-end my-2">ADD</button>  
            </section>
            <section className="child:my-2">
                <h2 className="mb-2">Transform</h2>
                <div className="flex">   
                    <label>X:</label>
                    <input type="number" value={useSelector(state => state.qr.translate[0])} className="Input--number"></input>
                    <label>Y:</label>
                    <input type="number" value={useSelector(state => state.qr.translate[1])} className="Input--number"></input>
                </div>
                <div>
                    <label>Scale:</label>
                    <input type="number" value={useSelector(state => state.qr.scale[0])} className="Input--number"></input>
                </div>
                <div>
                    <label>Rotation:</label>
                    <input type="number" defaultValue="0" className="Input--number"></input>
                </div>
            </section>
            <section>
                <h2>Options</h2>
                <div>
                    <label>Foreground color:</label>
                    <input type="color" name="foreground" defaultValue="#000000" />
                </div>
                <div>
                    <label>Background color:</label>
                    <input type="color" name="foreground" defaultValue="#ffffff" />
                </div>
                <div>
                    <p>Pages</p>
                    <ul>
                        <li>
                            <p>Page</p>
                            <input></input>
                        </li>
                        <li>
                            <p>Pages</p>
                            <input></input>
                            <p>to</p>
                            <input></input>
                        </li>
                        <li>All pages</li>
                    </ul>
                </div>
            </section>
            <button onClick={handleClickStamp} className=" bg-blue-500 py-3 px-8 text-white rounded-full">Stamp</button>

        </div>
    )
}