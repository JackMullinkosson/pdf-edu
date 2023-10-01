import React, { useEffect, useState } from "react";
import './index.css'

function App() {
  const [pdfText, setPdfText] = useState("");

  const addLineBreak = (str) =>
  str.split('\n').map((subStr) => {
    return (
      <div className="my-4">
        {subStr}
        <br/>
      </div>
    );
  });


  useEffect(() => {
    fetch('http://localhost:5000/parse-pdf')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setPdfText(data.text);
    })
    .catch(error => console.error('Error:', error));
  
  }, []);


  return (
    <main className="flex flex-col items-center justify-center">
      <article className="text-xl px-8">{addLineBreak(pdfText)}</article>
    </main>
  );
}

export default App;
