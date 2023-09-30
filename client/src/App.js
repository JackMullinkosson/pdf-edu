import React, { useEffect, useState } from "react";

function App() {
  const [pdfText, setPdfText] = useState("");

  const addLineBreak = (str) =>
  str.split('\n').map((subStr) => {
    return (
      <>
        {subStr}
        <br />
      </>
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
    <div className="App">
      <div>{addLineBreak(pdfText)}</div>
    </div>
  );
}

export default App;
