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
            return data;
        }
        catch (err) {
            console.log(err);
            console.log("oops");
        }
    });
}
function doOtherStuff() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield importFileAsync();
        console.log("outside flag");
        console.log(data.slice(1, 10));
    });
}
doOtherStuff();
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
//# sourceMappingURL=processText.js.map