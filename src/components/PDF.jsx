import { useState, useEffect } from "react";
import examplePDF from "../PDF/example.pdf";

import {getPageSize, getPdfDocumentUrl} from "../lib/ModifyPdf";

const PDF = ({currentPdf, canvasRef, x, y, size}) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [pdfDocUrl, setPdfDocUrl] = useState(null);

    useEffect(() => {
      if(currentPdf !== undefined){
        getPdfDocumentUrl(currentPdf).then(url => {
          setPdfDocUrl(url)
        });
        getPageSize(currentPdf, 0).then(({height, width}) => {
          console.log(height, width);
          setHeight(window.innerHeight);
          setWidth(width * (window.innerHeight / height));
        })
      }
    }, [currentPdf]);

    if(currentPdf === undefined){
      return <>{<embed height={window.innerHeight} width={window.innerHeight/297*210} src={examplePDF+"#toolbar=0&navpanes=0&scrollbar=0"} />}</>
    }
    return (
      <>{<embed height={height} width={width} src={pdfDocUrl+"#toolbar=0&navpanes=0&scrollbar=0"} />}</>
    );
  };
  
  export default PDF;