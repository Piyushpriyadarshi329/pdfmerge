import React, { useState, useref, useRef } from "react";
import jsPDF from "jspdf";
// import {  pdfjs } from "react-pdf";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


export default function App() {
  const [pdffile, setpdffile] = useState([]);

  async function handlerfun() {
    var doc = new jsPDF("l", "mm", [1200, 1210]);

    var pdfjs = document.querySelector("#temp-target");

    doc.html(pdfjs, {
      callback: function (doc) {
        doc.save("output.pdf");
      },
      x: 10,
      y: 10,
    });
  }
  // setpdffile([...pdffile,e.target.files[0]])

  async function getBase64(file) {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;
        console.log("baseURL", baseURL);
        setpdffile([...pdffile, baseURL]);

        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  }

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  console.log("length==>", pdffile.length);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <>
      <input
        type={"file"}
        onChange={(e) => {
          getBase64(e.target.files[0]);
        }}
      />
      <div id="temp-target">
        {pdffile.map((item,index) => {
          return (
            <div key={index.toString()}>

            <Document file={item} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                height={1200}
                width={1210}
                margin={20}
                pageNumber={pageNumber}
              />
            </Document>
            </div>
          );
        })}
      </div>

      <button onClick={handlerfun}>download pdf</button>
    </>
  );
}
