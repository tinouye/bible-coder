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
exports.default = Page;
const processText_1 = require("../src/processText");
require("./app.css");
function formatReturnedText() {
    return __awaiter(this, void 0, void 0, function* () {
        let resultArray = yield (0, processText_1.processText)("mashi");
        let returnArray = [];
        for (let i = 0; i < resultArray.length; i++) {
            let guideString = resultArray[i][0];
            let resultString = resultArray[i][1];
            returnArray.push(<li>{guideString}</li>);
            returnArray.push(<li>{resultString}</li>);
        }
        return returnArray;
    });
}
function Page() {
    return <ul>{formatReturnedText()}</ul>;
}
//# sourceMappingURL=page.jsx.map