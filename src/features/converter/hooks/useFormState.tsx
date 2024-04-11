import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
interface WordsToReplace {
  word: string;
  caseFormat: string;
  id: string;
  inputOrder: number;
}

interface FormStateContextType {
  snippetOutput: string;
  inputCode: string;
  wordsToReplace: WordsToReplace[];
  prefix: string;
  snippetName: string;
  setSnippetOutput: React.Dispatch<React.SetStateAction<string>>;
  setInputCode: React.Dispatch<React.SetStateAction<string>>;
  setWordsToReplace: React.Dispatch<React.SetStateAction<WordsToReplace[]>>;
  setPrefix: React.Dispatch<React.SetStateAction<string>>;
  setSnippetName: React.Dispatch<React.SetStateAction<string>>;
}

const FormStateContext = createContext<FormStateContextType | undefined>(undefined);
interface FormStateProviderProps {
  children: ReactNode;
}

export const FormStateProvider: React.FC<FormStateProviderProps> = ({ children }) => {
  const [wordsToReplace, setWordsToReplace] = useState<WordsToReplace[]>([
    { word: '', caseFormat: 'default', id: uuidv4(), inputOrder: 1 },
  ]);
  const [inputCode, setInputCode] = useState('');
  const [snippetOutput, setSnippetOutput] = useState('');
  const [prefix, setPrefix] = useState('');
  const [snippetName, setSnippetName] = useState('');

  const value = {
    snippetOutput,
    inputCode,
    wordsToReplace,
    prefix,
    snippetName,
    setSnippetOutput,
    setInputCode,
    setWordsToReplace,
    setPrefix,
    setSnippetName,
  };

  return <FormStateContext.Provider value={value}>{children}</FormStateContext.Provider>;
};

export const useFormState = () => {
  const context = useContext(FormStateContext);
  if (context === undefined) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};

// const [wordsToReplace, setWordsToReplace] = useState<WordsToReplace[]>([
//   { word: '', caseFormat: 'default', id: uuidv4(), inputOrder: 1 },
// ]);
