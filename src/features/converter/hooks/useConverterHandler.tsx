import { useToast } from '@chakra-ui/react';
import { useFormState } from './useFormState';
import { useUIState } from './useUIState';
import { useRef } from 'react';

export const useConverterHandler = () => {
  const { wordsToReplace, setWordsToReplace, setPrefix, setSnippetName } = useFormState();
  const { setIsIconVisible, setIsIconVisibleTwo, setIsIconVisibleThree } = useUIState();
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
  const handlePrefixChange = (value: string) => {
    setPrefix(value);
  };

  const handleSnippetChange = (value: string) => {
    setSnippetName(value);
  };

  return {
    handleWordChange,
    handleCaseFormatChange,
    handleInputOrderChange,
    handlePrefixChange,
    handleSnippetChange,
  };
};
