import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useUIState } from './useUIState';

interface wordsToReplace {
  word: string;
  caseFormat: string;
  id: string;
  inputOrder: number;
}

interface UseSnippetConverterProps {
  wordsToReplace: { word: string; caseFormat: string; id: string; inputOrder: number }[];
  setWordsToReplace: Dispatch<SetStateAction<{ word: string; caseFormat: string; id: string; inputOrder: number }[]>>;
  setSnippetOutput: Dispatch<SetStateAction<string>>;
  inputCode: string;
  prefix: string;
  snippetName: string;
}

export const useSnippetConverter = ({
  wordsToReplace,
  // setIsIconVisibleThree,
  setSnippetOutput,
  inputCode,
  // setIsLoading,
  // setIsUpdated,
  prefix,
  snippetName,
}: UseSnippetConverterProps) => {
  const { setIsLoading, setIsUpdated, setIsIconVisibleThree } = useUIState();

  //変換フォーマットを扱う関数
  const createCaseFormat = (wordsToReplace: wordsToReplace) => {
    switch (wordsToReplace.caseFormat) {
      case 'Pascal':
        return `\${${wordsToReplace.inputOrder}/(.*)/\${${wordsToReplace.inputOrder}:/pascalcase}/}`;
      case 'default':
        return `\${${wordsToReplace.inputOrder}}`;
    }
  };

  //Json形式変換を扱う関数
  const convertToJSON = (createToJsonText: string, prefix: string, snippet: string) => {
    const snippetTemplate = {
      [snippet]: {
        prefix: prefix,
        body: createToJsonText.split('\n'),
      },
    };
    let jsonString = JSON.stringify(snippetTemplate, null, 2);
    jsonString = jsonString.slice(1, -1).trim();
    const addCharacter = (i: number) => {
      if (i < jsonString.length) {
        setTimeout(() => {
          setSnippetOutput((currentCode) => currentCode + jsonString[i]);
          addCharacter(i + 1);
          //currentCode・・・現在のコード、つまり現在のコードに生成されたJsonStringコードのi番目を渡している。
          //それを繰り返すことで動的にコードが生成されているようにみせている。
        }, 1);
      } else {
        setIsLoading(false);
      }
    };
    addCharacter(0);
    //アニメーション無しの場合はこちら
    // setSnippetOutput(jsonString)
    // setIsLoading(false)
  };

  //変換関数
  const updateCode = () => {
    //入力催促用のトースト
    // const hasEmptyFields = wordsToReplace.some(item => !item.word.trim() || !item.caseFormat.trim());

    // if (hasEmptyFields) {
    //   toast({
    //     title: "エラー",
    //     description: "すべてのフィールドを入力してください。",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top", // トーストを上部に表示
    //   });
    //   return;
    // }
    setSnippetOutput('');
    setIsLoading(true);
    //置換処理
    let newCode = inputCode;

    wordsToReplace.forEach((wordsToReplace) => {
      if (wordsToReplace.word.trim() !== '') {
        const regex = new RegExp(wordsToReplace.word, 'g');
        const replacement = createCaseFormat(wordsToReplace) || '';
        newCode = newCode.replace(regex, replacement);
      }
    });
    convertToJSON(newCode, prefix, snippetName);
    setIsUpdated(true);
    setIsIconVisibleThree(false);
  };

  return { updateCode };
};
