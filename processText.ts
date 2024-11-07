const fs = require('fs/promises');
const readline = require('readline');

let textArr: String[] = [];
let textArrPromise = Promise<String[]>


async function importFileAsync(): Promise<string> {
    try {
      const data = await fs.readFile('text/kjvBible.txt', { encoding: 'utf8' });
      console.log("waiting");
      
      return data
    } catch (err) {
      console.log(err);
      console.log("oops");
    }
}

async function doOtherStuff() {
    const data = await importFileAsync();
    console.log("outside flag");
    console.log(data.slice(1,10));
}

doOtherStuff()
console.log("interiim");



/*
async function processReadStream(readStream, textArr): Promise<String[]> {
    let flag = 0
    for await (const line of readStream) {
        console.log(line);
        textArr.push(line);
        if (flag % 100 == 0) {
            console.log(flag);
        }
        flag += 1;
    }

    return textArr;
}

const fileReadStream = fs.createReadStream(
    'text/kjvBible1.txt', {encoding: 'utf-8'});

fileReadStream.on('data', function (chunk) {
    console.log(chunk.toString());
});

let foo = processReadStream(fileReadStream, textArr);

console.log(foo[0])

console.log("done")
*/