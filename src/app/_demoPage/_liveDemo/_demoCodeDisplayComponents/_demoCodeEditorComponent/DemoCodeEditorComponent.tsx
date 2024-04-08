"use client"

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';


//React.Dispatchは、Reactにおける状態更新関数を表す型。この関数を通じて、コンポーネントの状態を更新することができる
//React.SetStateAction<string>は、状態を更新するためのアクションを表します。この型は、新しい状態の値を直接指定するか（この場合はstring）、現在の状態値を受け取り新しい状態値を返す関数を指定するかのどちらかを受け入れることができます。
interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const DemoCodeEditorComponent:React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <Editor
    value={code}
    onValueChange={setCode}
    highlight={code => highlight(code, languages.js, 'javascript')}
    readOnly={true}
    padding={10}
    style={{
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 15,
      minHeight: '24rem',
      overflow: 'auto',
      backgroundColor: '#2D2D2D',
      color: '#fff',
      borderRadius: '15px',
      width: '100%',
      marginTop: '16px',
    }}
  />
  );
};

export default DemoCodeEditorComponent;
 