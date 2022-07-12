import PDF from "./PDF.jsx";
import MovingBody from "./MovingBody.tsx";
import {useEffect, useRef} from "react";
var QRCode = require('qrcode')


export default function PDF_wrapper({currentPdf}){
    const canvasRef = useRef(null)
    useEffect(() => {        
        QRCode.toCanvas(canvasRef.current, 'www.antonkindt.be', function (error) {
          if (error) console.error(error)
        })
    }, [])


    return (
        <div className="PDF bg-slate-100 relative overflow-hidden">
            <PDF currentPdf={currentPdf} canvasRef={canvasRef} size={150} x={100} y={30}></PDF>
            <MovingBody canvasRef={canvasRef}></MovingBody>
        </div>
    )
}