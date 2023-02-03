import React, { useState, useref } from "react";
import jsPDF from "jspdf";
// import {  pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { Circles } from "react-loader-spinner";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

export default function Pdfmerge() {
  const [loader, setloader] = useState(false);

  const [pdffile, setpdffile] = useState([]);

  const [name, setname] = useState([]);

  async function handlerfun() {
    var doc = new jsPDF("l", "mm", [1200, 1210]);

    var pdfjs = document.querySelector("#temp-target");

    doc.html(pdfjs, {
      callback: function (doc) {
        doc.save(name[0]);
      },
      x: 10,
      y: 10,
    });
  }
  // setpdffile([...pdffile,e.target.files[0]])

  async function getBase64(file) {
    setloader(true);
    let extension = file.type;
    console.log("extension", extension);

    console.log(file);
    let str = file.name;
    console.log("file.name: ", str);
    var pdfname = file.name.split("_");

    console.log("pdfname", pdfname);

    pdfname = pdfname[0] + "_Aadhaar";

    console.log("pdfname", pdfname);

    setname([...name, pdfname]);

    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log("Called", Object.keys(reader));
        baseURL = reader.result;

        console.log("baseURL", baseURL);

        var localname = reader.file || "hello";
        // console.log("baseURL", baseURL);

        if (extension == "application/pdf") {
          setpdffile([...pdffile, { path: baseURL, doctype: "pdf" }]);
        } else {
          setpdffile([...pdffile, { path: baseURL, doctype: "image" }]);
          setloader(false);
        }

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
    console.log("load....");
    setTimeout(() => {
      setloader(false);
    }, 5000);
  }
  return (
    <>
      <input
        id="btnSelectPdf"
        type={"file"}
        onChange={(e) => {
          getBase64(e.target.files[0]);
        }}
      />

      {loader == true ? (
        <div id="pdfloaderdiv">
          <Circles
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            id="pdfloader"
            wrapperStyle
            wrapperClass
          ></Circles>
        </div>
      ) : (
        <>
          <button id="btnDownloadPdf" onClick={handlerfun}>
            download pdf
          </button>
        </>
      )}

      <div
        id="temp-target"
        // onLoad={() => {
        //   console.log("load successfully");
        //   alert("load successfully");
        // }}

        onLoadSuccess={() => {
          console.log("load successfully");
        }}
      >
        {pdffile.map((item, index) => {
          return (
            <div key={index.toString()}>
              {item.doctype == "pdf" ? (
                <Document
                  file={item.path}
                  onLoadSuccess={onDocumentLoadSuccess}

                  // onDocumentLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    height={1200}
                    width={1210}
                    margin={20}
                    pageNumber={pageNumber}
                  />
                </Document>
              ) : (
                <>
                  <img
                    style={{width:600,height:800}}
                    src={item.path}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
