var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs/promises');
const readline = require('readline');
let textArr = [];
let textArrPromise = (Promise);
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
        }
    });
}
function findStringPatterns(text, query) {
    // Iterate through entire text
    for (let i = 0; i < text.length; i++) {
        // Search for starting letter of query
        if (text[i] == query[0]) {
            // Search for the second letter at distance j from header
            for (let j = 1; j < 11; j++) {
                // Hop j letters k times to see if the query can be found
                for (let k = 1; k < query.length; k++) {
                    if (!(text[i + (j * k)] == query[k])) {
                        break;
                    }
                    if (k == query.length - 1) {
                        console.log(i);
                        console.log(text.slice(i, i + (j * k) + 100));
                        let indicatorArr = [];
                        for (let count = 0; count <= j * k; count++) {
                            if (count % j == 0) {
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield importFileAsync();
        findStringPatterns(data, "inheritance");
    });
}
main();
console.log("interrim");
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