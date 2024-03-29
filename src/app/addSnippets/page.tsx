"use client"
import React, { useState, ChangeEvent } from 'react';

interface WordToReplace {
  word: string;
  caseFormat: string; // 'default', 'pascal', 'choice'
  choice: string; // このフィールドはcaseFormatが'choice'の場合のみ使用されます
}

const SnippetTransformerWithFormat = () => {
  const [codeInput, setCodeInput] = useState('');
  const [wordsToReplace, setWordsToReplace] = useState<WordToReplace[]>([{ word: '', caseFormat: 'default', choice: '' }]);
  const [inputOrder, setInputOrder] = useState(1);
  const [transformedCode, setTransformedCode] = useState('');
  const [prefix, setPrefix] = useState('');
  const [description, setDescription] = useState('');
  const [snippetOutput, setSnippetOutput] = useState('');

  const handleCodeInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => setCodeInput(e.target.value);

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...wordsToReplace];
    newWords[index].word = value;
    setWordsToReplace(newWords);
  };

  const handleCaseFormatChange = (index: number, value: string) => {
    const newWords = [...wordsToReplace];
    newWords[index].caseFormat = value;
    setWordsToReplace(newWords);
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newWords = [...wordsToReplace];
    newWords[index].choice = value;
    setWordsToReplace(newWords);
  };

  const addWordToReplace = () => {
    setWordsToReplace([...wordsToReplace, { word: '', caseFormat: 'default', choice: '' }]);
  };

  const removeWordToReplace = (index: number) => {
    const newWords = [...wordsToReplace];
    newWords.splice(index, 1);
    setWordsToReplace(newWords);
  };

  const createCaseFormat = (inputOrder: number, wordToReplace: WordToReplace) => {
    switch (wordToReplace.caseFormat) {
      case 'pascal':
        return `\${${inputOrder}/(.*)/\${${inputOrder}:/pascalcase}/}`;
      case 'choice':
        if (wordToReplace.choice) {
          const formattedChoices = wordToReplace.choice.split(',').join(',');
          return `\${${inputOrder}|${formattedChoices}|}`;
        }
        return `\${${inputOrder}}`; // choicesが指定されていない場合は、通常のプレースホルダを返す
      default:
        return `\${${inputOrder}}`;
    }
  };

  const handleInputOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputOrder(parseInt(e.target.value, 10));
  };
  
  // Prefix(スニペット構文のタイトルとかそういうの)変更を処理する関数
  const handlePrefixChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrefix(e.target.value);
  };
  
  // Descriptionの変更を処理する関数
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const transformSnippet = () => {
    let newCode = codeInput;
    wordsToReplace.forEach((wordToReplace, index) => {
      const regex = new RegExp(wordToReplace.word, 'g');
      const replacement = createCaseFormat(inputOrder + index, wordToReplace);
      newCode = newCode.replace(regex, replacement);
    });
    setCodeInput(newCode);
  };

  const generateSnippetOutput = () => {
    const snippetTemplate = {
      [prefix]: {
        "prefix": prefix,
        "body": transformedCode.split('\n'),
        "description": description
      }
    };
    setSnippetOutput(JSON.stringify(snippetTemplate, null, 2));
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">フォーマット付きスニペット変換器</h2>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        rows={10}
        cols={50}
        placeholder="変換したいコードを張り付ける"
        value={codeInput}
        onChange={handleCodeInputChange}
      ></textarea>
      <div className="flex flex-col space-y-2">
        {wordsToReplace.map((wordToReplace, index) => (
          <div key={index} className="flex flex-wrap items-center space-x-2">
            <input
              type="text"
              placeholder={`変換したい単語を入力 #${index + 1}`}
              value={wordToReplace.word}
              onChange={(e) => handleWordChange(index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <select
              value={wordToReplace.caseFormat}
              onChange={(e) => handleCaseFormatChange(index, e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="default">Default</option>
              <option value="pascal">PascalCase</option>
              <option value="choice">Choice</option>
            </select>
            {wordToReplace.caseFormat === 'choice' && (
              <input
                type="text"
                placeholder="Choices構文。カンマで区切ってね。(例 user,id,date)"
                value={wordToReplace.choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
            )}
            <button
              onClick={() => removeWordToReplace(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              削除
            </button>
          </div>
        ))}
        <button onClick={addWordToReplace} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">変換したい単語を追加</button>
      </div>
      <input
        type="number"
        placeholder="Input Order"
        value={inputOrder}
        onChange={handleInputOrderChange}
        className="p-2 border border-gray-300 rounded"
      />
      <button onClick={transformSnippet} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">コード変換</button>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Snippet Prefix"
          value={prefix}
          onChange={handlePrefixChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Snippet Description"
          value={description}
          onChange={handleDescriptionChange}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={generateSnippetOutput} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700">スニペット形式に変換</button>
      </div>
      {transformedCode && (
        <>
          <h3 className="text-lg font-semibold">コード変換:</h3>
          <pre className="p-2 border border-gray-300 rounded overflow-x-auto"><code>{transformedCode}</code></pre>
        </>
      )}
      {snippetOutput && (
        <>
          <h3 className="text-lg font-semibold">スニペット形式に変更:</h3>
          <pre className="p-2 border border-gray-300 rounded overflow-x-auto"><code>{snippetOutput}</code></pre>
        </>
      )}
    </div>
  );
};
  export default SnippetTransformerWithFormat;