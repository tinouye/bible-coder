const fs = require('fs/promises');
const readline = require('readline');
const promptConsole = require('prompt-sync')();

let textArr: String[] = [];
let textArrPromise = Promise<String[]>


async function importFileAsync(): Promise<string> {
    try {
      const data = await fs.readFile('text/kjvBible.txt', { encoding: 'utf8' });
      console.log("waiting");
      console.log(data.slice(11,30))
      console.log("waiting2")
      
      return data

    } catch (err) {
      console.log(err);
      console.log("oops");
      return "File read error";
    }
}

function findStringPatterns(text:string, query:string) {
    // Iterate through entire text
    for (let i: number = 0; i < text.length; i++) {
        // Search for starting letter of query
        if (text[i] == query[0]) {
            // Search for the second letter at distance j from header
            for (let j: number = 1; j < 11; j++) {
                // Hop j letters k times to see if the query can be found
                for (let k: number = 1; k < query.length; k++) {
                    if (!(text[i+(j*k)] == query[k])) {
                        break
                    }
                    if (k == query.length-1) {
                        console.log(i);
                        console.log(text.slice(i, i+(j*k)+100))
                        let indicatorArr: Array<string> = []
                        for (let count: number = 0; count <= j*k; count++) {
                            if (count%j == 0) {
                                indicatorArr.push("^");
                            }
                            else {
                                indicatorArr.push("_");
                            }
                        }
                        console.log(indicatorArr.join(""));
                    }
                }
            }
        }
    }
}

async function main() {
    const data = await importFileAsync();
    let query: string = "";
    while (query != "quit") {
        query = promptConsole("Enter query (quit to exit): ");
        if (query != "quit") {
            findStringPatterns(data, query);
        }
    }
}

main()



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