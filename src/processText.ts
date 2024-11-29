import next from "next";

const fs = require('fs/promises');
const readline = require('readline');
// const promptConsole = require('prompt-sync')();

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


function getCbArrSubstring(cbArr: Array<CharacterBit>, start: number, end: number): string {
    let returnStr: string = "";
    cbArr.slice(start, end).forEach((cbItem) => returnStr += cbItem.char);

    return returnStr;
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
        //TODO Actually create logic for setting characters as invalid
        /*
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
        } */

        // Replace tab with space, make spaces invalid
        let currChar: string = text[i];
        let currBool: boolean = true;
        if (currChar == "	") {
            currChar = " "
        }

        if (currChar == " ") {
            currBool = false
        }
        
       characterBitArr.push(new CharacterBit(currChar, currBool));
    }

    return characterBitArr;
}

function findStringPatterns(text:Array<CharacterBit>, query:string): Array<Array<string>> {
    let toReturn: Array<Array<string>> = []
    // Iterate through entire text
    for (let i: number = 0; i < text.length; i++) {
        // Search for starting letter of query
        if (text[i].shouldBeCounted && text[i].char == query[0]) {
            let numInvalidCharsFound: number = 0;
            let hopDist: number = 1;
            // Search for the second letter at distance hopDist from header
            while (hopDist < 50) {

                let numHops: number = 1;
                let indicatorStr: string = "V";
                let nextIndex: number = i+1;
                let charsBeforeNextCounted = hopDist-1;
                // Hop hopDist letters k times to see if the query can be found
                while (numHops < query.length) {
                    // Break if end of string
                    if (nextIndex >= text.length) {
                        hopDist++;
                        break
                    }

                    const newCharBit: CharacterBit = text[nextIndex];
                    // Move onto next character in text if current char is invalid
                    if (!newCharBit.shouldBeCounted) {
                        indicatorStr += "o";
                        numInvalidCharsFound++;
                    }
                    // If character is to be hopped over, decrement countdown and move to next char
                    else if (charsBeforeNextCounted > 0) {
                        indicatorStr += ".";
                        charsBeforeNextCounted--;
                    }
                    
                    // Beyond this point we know the current char is valid
                    // If the current char doesn't match the query break and start a new Hop dist
                    else if (newCharBit.char != query[numHops]) {
                        hopDist++;
                        break
                    }
                    // Case where match was found
                    else {
                        indicatorStr += "V";
                        numHops++;
                        charsBeforeNextCounted = hopDist-1;
                    }
                    // Made it to the end of the query so match has been found
                    if (numHops == query.length) {
                        // Clamp text sample so it doesn't leave the bounds of the text
                        const sampleStart: number = Math.max(i-20, 0);
                        for (let j=0; j<(i-sampleStart); j++) {
                            indicatorStr = "o" + indicatorStr;
                        }
                        const sampleEnd: number = Math.min(nextIndex+100, text.length);

                        // Build return string from the text array because it isn't natively text
                        let returnStr: string = getCbArrSubstring(text, sampleStart, sampleEnd);
                        toReturn.push([indicatorStr, returnStr]);
                        hopDist++;
                    }

                    nextIndex++;
                }
            }
        }
    }

    return toReturn;
}

export async function processText(query: string = "curse") {
    const data = await importFileAsync();
    let consoleMode: boolean = false;
    /* Prompt sync broke for some reason
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
        */ 

    const indexedText: Array<CharacterBit> = indexCharacters(data);

    const searchResults: Array<Array<string>> = findStringPatterns(indexedText, query);
    searchResults.forEach((arrayItem) => {
        console.log(arrayItem[0]);
        console.log(arrayItem[1]);
    })
    return searchResults
}
