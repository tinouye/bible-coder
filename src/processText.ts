const fs = require('fs/promises');
const readline = require('readline');
const promptConsole = require('prompt-sync')();

let textArr: String[] = [];
let textArrPromise = Promise<String[]>

class CharacterBit {
    char: string = "";
    shouldBeCounted: Boolean = false;

    constructor(char:string, shouldBeCounted:boolean) {
        this.char = char;
        this.shouldBeCounted = shouldBeCounted;
    }


}


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

function indexCharacters(text:string) {
    let characterBitArr: Array<CharacterBit> = [];
    let validSegment: Boolean = false;
    let colonFound: Boolean = false;

    for (let i=0; i < text.length; i++) {
        // If we are currently in a header
        if (!validSegment) {
            // If a colon hasn't found in this part of the header yet, advance until it is
            if (!colonFound) {
                if (text[i] == ":") {
                    colonFound = true;
                }
            }
            else {

            }
        }
    }
}

function findStringPatterns(text:string, query:string): Array<string> {
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
                    // Made it to the end of the query so match has been found
                    if (k == query.length-1) {
                        
                        let indicatorArr: Array<string> = []
                        // build string that shows where the letters are
                        for (let count: number = 0; count <= j*k; count++) {
                            if (count%j == 0) {
                                indicatorArr.push("v");
                            }
                            else {
                                indicatorArr.push("-");
                            }
                        }
                        return [indicatorArr.join(""), text.slice(i, i+(j*k)+100)]
                    }
                }
            }
        }
    }
}

async function processText(query: string = "test") {
    const data = await importFileAsync();
    let consoleMode: boolean = false;
    if (consoleMode) {
        query = "";
        while (query != "quit") {
            query = promptConsole("Enter query (quit to exit): ");
            if (query != "quit") {
                findStringPatterns(data, query);
            }
        }
    }
    else {
        return findStringPatterns(data, query);
    }
}

console.log(processText());



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