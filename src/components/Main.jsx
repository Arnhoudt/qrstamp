import Editor from "./Editor.jsx";
import PdfWrapper from "./PdfWrapper.jsx";
import { useState } from "react";

export default function Main(){

    const [currentPDF, setCurrentPDF] = useState(undefined);
    return (
        <main className="w-full h-full flex justify-center">
            <Editor setPDF={setCurrentPDF} currentPDF={currentPDF} ></Editor>
            <PdfWrapper currentPdf={currentPDF}></PdfWrapper>
        </main>
            )
}