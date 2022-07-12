import JSZip from "jszip";
import { saveAs } from "file-saver";
import { PDFDocument, degrees } from 'pdf-lib';

var QRCode = require('qrcode')

export async function getPdfDocument(pdf){
    const existingPdfBytes = await pdf.arrayBuffer();
    return await PDFDocument.load(existingPdfBytes);
}

export async function getPdfBytes(pdf){
    const existingPdfBytes = await pdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    return await pdfDoc.save();
}

async function pdfToDoc(pdf){
    const existingPdfBytes = await pdf.arrayBuffer();
    return await PDFDocument.load(existingPdfBytes);
}

export async function getPdfDocumentUrl(currentPdf){
    const pdfDoc = await pdfToDoc(currentPdf);
    
    const pdfBytes = await pdfDoc.save();
    const bytes  = new Uint8Array( pdfBytes ); 
    const blob   = new Blob( [ bytes ], { type: "application/pdf" } );
    const docUrl = URL.createObjectURL( blob );
    return (docUrl);
}

export async function getPageSize(currentPdf, page){
    const pdfDoc = await pdfToDoc(currentPdf);
    const firstPage = pdfDoc.getPages()[page];
    
    // Get the width and height of the first page
    return firstPage.getSize();
}

export async function getQrStampedPdf(currentPdf, link, qrDataObject){
    console.log(qrDataObject);
    const pdfDoc = await pdfToDoc(currentPdf);

    const firstPage = pdfDoc.getPages()[0];
    
    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();
    const scale = window.innerHeight / height;

    var canvas = document.createElement('canvas');

    QRCode.toCanvas(canvas, link, function (error) {
        if (error) console.error(error)
    })

    const pngImageBytes = await fetch(canvas.toDataURL()).then((res) => res.arrayBuffer())
    const testQR = await pdfDoc.embedPng(pngImageBytes);
    firstPage.drawImage(testQR, {
        x: qrDataObject.translate[0]/scale,
        y: height - (qrDataObject.translate[1] + qrDataObject.scale[1]) /scale,
        width: qrDataObject.scale[0] / scale,
        height: qrDataObject.scale[1] / scale,
        rotate: degrees(0),
    })
      
    const pdfBytes = await pdfDoc.save();
    return pdfBytes
}

export function downloadPDF(pdfs){
    var zip = new JSZip();
    const pdfDirectory = zip.folder("pdf");
    pdfs.forEach(pdf => {
        pdfDirectory.file(pdf.name, pdf.bytes, {base64: true});
    })
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, "pdf.zip");
    });
}