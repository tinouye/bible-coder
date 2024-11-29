'use client'

import {processText} from '../src/processText';
import './app.css'
import { useState } from 'react';

async function formatReturnedText() {
  let resultArray: Array<Array<string>> = await processText("mashi");
  let returnArray = [];
  for (let i=0; i<resultArray.length; i++) {
    let guideString: string = resultArray[i][0];
    let resultString: string = resultArray[i][1];
    returnArray.push(<li>{guideString}</li>)
    returnArray.push(<li>{resultString}</li>)

  }
  return returnArray;
}

export default function Page() {
  const [textField, setTextField] = useState("");
    return (
      <div>
        <input value={textField} onChange={e => setTextField(e.target.value)} />
        <ul>{formatReturnedText()}</ul>
      </div>
    );
  }