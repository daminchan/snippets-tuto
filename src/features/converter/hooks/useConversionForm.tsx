import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useUIState } from './useUIState';

interface WordChangeProps {
  wordsToReplace: { word: string; caseFormat: string; id: string; inputOrder: number }[];
  setWordsToReplace: Dispatch<SetStateAction<{ word: string; caseFormat: string; id: string; inputOrder: number }[]>>;
  //アイコンアニメーション
  //   setIsIconVisible: Dispatch<SetStateAction<boolean>>;
  //   setIsIconVisibleTwo: Dispatch<SetStateAction<boolean>>;
  //   setIsIconVisibleThree: Dispatch<SetStateAction<boolean>>;
}

interface WordsToReplace {
  word: string;
  caseFormat: string;
  id: string;
  inputOrder: number;
}
export const useConversionForm = ({
  wordsToReplace,
  setWordsToReplace,
  //   setIsIconVisible,
  //   setIsIconVisibleTwo,
  //   setIsIconVisibleThree,
}: WordChangeProps) => {
  const { isIconVisibleThree, setIsIconVisible, setIsIconVisibleTwo, setIsIconVisibleThree } = useUIState();
  useEffect(() => {
    console.log(isIconVisibleThree); // isLoading の値が変更された後に実行される
  }, [isIconVisibleThree]); // 依存配列に isLoading を指定

  const toast = useToast();
  const toastIdRef = useRef<string | number | undefined>();
  // 変換単語
  const handleWordChange = (index: number, value: string) => {
    const pattern = /^[a-zA-Z0-9]*$/;
    if (pattern.test(value)) {
      const newWord = [...wordsToReplace];
      newWord[index].word = value;
      setWordsToReplace(newWord);
      //アイコンアニメーションの表示管理
      setIsIconVisible(false);
      setIsIconVisibleTwo(value === '');
      setIsIconVisibleThree(value !== '');
    } else {
      const toastId = 'only-ascii';
      if (!toastIdRef.current || !toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast({
          id: toastId,
          title: '半角英数字のみを入力してください',
          description: 'クリップボードへのコピーに失敗しました。',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };
  // 変換形式
  const handleCaseFormatChange = (index: number, value: string) => {
    const newCaseFormat = [...wordsToReplace];
    newCaseFormat[index].caseFormat = value;
    setWordsToReplace(newCaseFormat);
  };
  // 変換順序
  const handleInputOrderChange = (valueAsNumber: number, id: string) => {
    const updatedWordSettings = wordsToReplace.map((element) => {
      if (element.id === id) {
        return { ...element, inputOrder: valueAsNumber };
      } else {
        return element;
      }
    });
    setWordsToReplace(updatedWordSettings);
  };
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

  return { handleWordChange, handleCaseFormatChange, handleInputOrderChange, addForm, removeForm };
};
