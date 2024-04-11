'use client';
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
interface CodeEditorProps {
  inputCode: string;
  snippetOutput: string;
  onCodeChange: (code: string) => void;
  isUpdated: boolean;
  highlight: (code: string) => string;
}
const ConverterCodeEditor: React.FC<CodeEditorProps> = ({
  inputCode,
  snippetOutput,
  onCodeChange,
  isUpdated,
  highlight,
}) => {
  const codeToShow = isUpdated ? snippetOutput : inputCode;

  return (
    <Editor
      value={codeToShow}
      onValueChange={onCodeChange}
      highlight={highlight}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 15,
        minHeight: '24rem',
        overflow: 'auto',
        backgroundColor: '#2D2D2D',
        color: '#fff',
        borderRadius: '15px',
        cursor: 'pointer',
      }}
    />
  );
};

export default ConverterCodeEditor;
