import { useToast } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useUIState } from './useUIState';
import { v4 as uuidv4 } from 'uuid';

interface wordsToReplace {
  word: string;
  caseFormat: string;
  id: string;
  inputOrder: number;
}

interface useEditorControlsProps {
  setWordsToReplace: Dispatch<SetStateAction<{ word: string; caseFormat: string; id: string; inputOrder: number }[]>>;
  setSnippetOutput: Dispatch<SetStateAction<string>>;
  setInputCode: Dispatch<SetStateAction<string>>;
  snippetOutput: string;
  setPrefix: Dispatch<SetStateAction<string>>;
  setSnippetName: Dispatch<SetStateAction<string>>;
}

export const useEditorControls = ({
  setWordsToReplace,
  setSnippetOutput,
  setInputCode,
  setPrefix,
  snippetOutput,
  setSnippetName,
}: useEditorControlsProps) => {
  const { isUpdated, setIsUpdated, setIsIconVisible, setIsIconVisibleTwo, setIsIconVisibleThree } = useUIState();
  const toast = useToast();
  //コードエディターフォーム関連
  //入力を初期化ボタン
  const clearCode = () => {
    const newWordsToReplace: wordsToReplace = { word: '', caseFormat: 'default', id: uuidv4(), inputOrder: 1 };
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

  return { clearCode, copyToClipboard };
};
