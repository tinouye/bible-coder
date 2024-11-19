"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs/promises');
const readline = require('readline');
// const promptConsole = require('prompt-sync')();
let textArr = [];
let textArrPromise = (Promise);
class CharacterBit {
    constructor(char, shouldBeCounted) {
        this.char = "";
        this.shouldBeCounted = false;
        this.char = char;
        this.shouldBeCounted = shouldBeCounted;
    }
}
function getCbArrSubstring(cbArr, start, end) {
    let returnStr = "";
    cbArr.slice(start, end).forEach((cbItem) => returnStr += cbItem.char);
    return returnStr;
}
function importFileAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs.readFile('text/kjvBible.txt', { encoding: 'utf8' });
            console.log("waiting");
            console.log(data.slice(11, 30));
            console.log("waiting2");
            return data;
        }
        catch (err) {
            console.log(err);
            console.log("oops");
            return "File read error";
        }
    });
}
function indexCharacters(text) {
    let characterBitArr = [];
    let validSegment = false;
    let colonFound = false;
    for (let i = 0; i < text.length; i++) {
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
        let currChar = text[i];
        let currBool = true;
        if (currChar == "	") {
            currChar = " ";
        }
        if (currChar == " ") {
            currBool = false;
        }
        characterBitArr.push(new CharacterBit(currChar, currBool));
    }
    return characterBitArr;
}
function findStringPatterns(text, query) {
    let toReturn = [];
    // Iterate through entire text
    for (let i = 0; i < text.length; i++) {
        // Search for starting letter of query
        if (text[i].shouldBeCounted && text[i].char == query[0]) {
            let numInvalidCharsFound = 0;
            let hopDist = 1;
            // Search for the second letter at distance hopDist from header
            while (hopDist < 50) {
                let numHops = 1;
                let indicatorStr = "V";
                let nextIndex = i + 1;
                let charsBeforeNextCounted = hopDist - 1;
                // Hop hopDist letters k times to see if the query can be found
                while (numHops < query.length) {
                    // Break if end of string
                    if (nextIndex >= text.length) {
                        hopDist++;
                        break;
                    }
                    const newCharBit = text[nextIndex];
                    // Move onto next character in text if current char is invalid
                    if (!newCharBit.shouldBeCounted) {
                        indicatorStr += "o";
                        numInvalidCharsFound++;
                    }
                    // If character is to be hopped over, decrement countdown and move to next char
                    else if (charsBeforeNextCounted > 0) {
                        indicatorStr += "_";
                        charsBeforeNextCounted--;
                    }
                    // Beyond this point we know the current char is valid
                    // If the current char doesn't match the query break and start a new Hop dist
                    else if (newCharBit.char != query[numHops]) {
                        hopDist++;
                        break;
                    }
                    // Case where match was found
                    else {
                        indicatorStr += "V";
                        numHops++;
                        charsBeforeNextCounted = hopDist - 1;
                    }
                    // Made it to the end of the query so match has been found
                    if (numHops == query.length) {
                        // Clamp text sample so it doesn't leave the bounds of the text
                        const sampleStart = Math.max(i - 20, 0);
                        for (let j = 0; j < (i - sampleStart); j++) {
                            indicatorStr = " " + indicatorStr;
                        }
                        const sampleEnd = Math.min(nextIndex + 100, text.length);
                        // Build return string from the text array because it isn't natively text
                        let returnStr = getCbArrSubstring(text, sampleStart, sampleEnd);
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
function processText() {
    return __awaiter(this, arguments, void 0, function* (query = "curse") {
        const data = yield importFileAsync();
        let consoleMode = false;
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
        const indexedText = indexCharacters(data);
        const searchResults = findStringPatterns(indexedText, query);
        searchResults.forEach((arrayItem) => {
            console.log(arrayItem[0]);
            console.log(arrayItem[1]);
        });
    });
}
processText();
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
//# sourceMappingURL=processText.js.map