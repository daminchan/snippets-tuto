// import { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// interface WordToReplace {
//   word: string;
//   caseFormat: string;
//   id: string;
//   inputOrder: number;
// }

// export const useConversionState = () => {
//   const [snippetOutput, setSnippetOutput] = useState('');
//   const [inputCode, setInputCode] = useState('');
//   const [wordsToReplace, setWordsToReplace] = useState<WordToReplace[]>([
//     { word: '', caseFormat: 'default', id: uuidv4(), inputOrder: 1 },
//   ]);
//   const [prefix, setPrefix] = useState('');
//   const [snippetName, setSnippetName] = useState('');
//   const [isIconVisible, setIsIconVisible] = useState(true);
//   const [isIconVisibleTwo, setIsIconVisibleTwo] = useState(false);
//   const [isIconVisibleThree, setIsIconVisibleThree] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUpdated, setIsUpdated] = useState(false);

//   return {
//     snippetOutput,
//     setSnippetOutput,
//     inputCode,
//     setInputCode,
//     wordsToReplace,
//     setWordsToReplace,
//     prefix,
//     setPrefix,
//     snippetName,
//     setSnippetName,
//     isIconVisible,
//     setIsIconVisible,
//     isIconVisibleTwo,
//     setIsIconVisibleTwo,
//     isIconVisibleThree,
//     setIsIconVisibleThree,
//     isLoading,
//     setIsLoading,
//     isUpdated,
//     setIsUpdated,
//   };
// };
