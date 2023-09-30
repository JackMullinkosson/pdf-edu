const express = require('express');
const cors = require('cors');
const fs = require('fs');
const pdf = require('pdf-parse');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/parse-pdf', (req, res) => {
    let dataBuffer = fs.readFileSync('/Users/jackmullinkosson/Downloads/o-saci.pdf');
  
    let options = {
        pagerender: function(pageData) { 
            let render_options = {
                normalizeWhitespace: true,
                disableCombineTextItems: false
            };
            return pageData.getTextContent(render_options)
                .then(function(textContent) {
                    let lastY, text = '';
                    for (let item of textContent.items) {
                        if (lastY == item.transform[5] || !lastY){
                            text += ' ' + item.str;  // Add a space before each item.str
                        }  
                        else{
                            text += '\n' + item.str;
                        }    
                        lastY = item.transform[5];
                    }
                    return text;
                });
        }
    };
  
    pdf(dataBuffer, options).then((data) => {
      res.json(data);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
