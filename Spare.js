const fs = require('fs');
const readline = require('readline');
const express = require('express')
const app = express()
const port = 3000

const dataset = []

async function processLineByLine() {
    const fileStream = fs.createReadStream('LE.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });
      
      for await(const line of rl) {
        let part = line.split('\t')
        dataset.push({
          serialNumber: part[0],
          name: part[1],
          warehouse1: part[2],
          warehouse2: part[3],
          warehouse3: part[4],
          warehouse4: part[5],
          warehouse5: part[6],
          type: part[9],
          price: part[10],
        })
        //if(part[1].includes('Plokisoojendus')){
        //  console.log(line)
        //}
      }
}

processLineByLine();

app.get('/', (req, res) => {
  
  res.send(dataset.filter((part) => part.name.includes('polt')).slice(0, 30))

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})