import { useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useUIState } from './useUIState';
import { useFormState } from './useFormState';

interface WordsToReplace {
  word: string;
  caseFormat: string;
  id: string;
  inputOrder: number;
}

export const useConverterActions = () => {
  const {
    wordsToReplace,
    setWordsToReplace,
    prefix,
    setPrefix,
    snippetName,
    setSnippetName,
    setSnippetOutput,
    inputCode,
    setInputCode,
    snippetOutput,
  } = useFormState();
  const { setIsUpdated, setIsLoading, setIsIconVisibleThree } = useUIState();
  const toast = useToast();
  const toastIdRef = useRef<string | number | undefined>();
  // 変換フォーム条件追加
  const addForm = () => {
    const newForm: WordsToReplace = {
      word: '',
      caseFormat: 'default',
      id: uuidv4(),
      inputOrder: wordsToReplace.length + 1,
    };
    setWordsToReplace((prevForms) => [...prevForms, newForm]);
  };
  // 変換フォーム条件削除
  const removeForm = (id: string) => {
    setWordsToReplace((prevForms) => {
      const updatedWordsToReplace = prevForms.filter((form) => form.id !== id);
      return updatedWordsToReplace.map((form, index) => ({
        ...form,
        inputOrder: index + 1, // 1から始まる連番に更新
      }));
    });
  };
  //入力を初期化ボタン
  const clearCode = () => {
    const newWordsToReplace: WordsToReplace = { word: '', caseFormat: 'default', id: uuidv4(), inputOrder: 1 };
    setWordsToReplace([newWordsToReplace]);
    setInputCode('');
    setSnippetOutput('');
    setPrefix('');
    setSnippetName('');
    setIsUpdated(false);
  };
  //コピー機能
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippetOutput);
      toast({
        title: 'コピー成功',
        description: 'コピー完了!!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (err) {
      console.error('クリップボードへのコピーに失敗しました', err);
      toast({
        title: 'コピー失敗',
        description: 'クリップボードへのコピーに失敗しました。',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  const createCaseFormat = (wordsToReplace: WordsToReplace) => {
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

  return { addForm, removeForm, clearCode, copyToClipboard, updateCode };
};
