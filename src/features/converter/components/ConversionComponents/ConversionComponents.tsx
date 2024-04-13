'use client';
import * as Converter from '@/features/converter/components/index';
import * as Effects from '@/components/Effects/index';
import * as ConverterHooks from '@/features/converter/hooks/index';
//試みた事。
//hooksを作成して、ConverterComponents内をすっきりさせてみた。
//import文も長くなるため、indexファイルから一括でインポートするようにしてみた：参考にした記事 https://note.com/ryoppei/n/n2e3e7a66e758#a56a37a1-5d0b-49d6-b1cd-1bfa19a28fa5
//アニメーションのステート、処理関数に使用するステートをhooks、useContextにしてConverterコンポーネント内の各コンポーネントで共有できるようにしてみた(使い方あっているかどうか知りたい)
//ロジックHooksを、ハンドルとアクションの二つに分けてみた。(もっと良い感じの分け方とか、テンプレート的な分け方あれば教えてほしい)
//各フォーム（editorとconverter）のレイアウトBoxをプロジェクト全体で使えると思ったのでShadowBoxと命名して共有できるようにしてみた
//ボタンに関してはグラデーションだけカスタムCSSとして共有できるようにしてみた。（buttonも全体で共有できるようにした方がいいとは思う。）

//Eslintから初めてだらけで記事を読んだりやAIに質問しながらなので追いついていない・抜けているところがあると思うので足りないところは遠慮しないで指摘して欲しい。
//ググったり、カーソル先生に質問しながら作成したので、もし間違えているところとかあれば教えてほしい。
//恐らく、なんでここはきちんとやっているのにここはやってないの？的な箇所あると思う。

//クリックで文字入力を完了するとanimateエラーがでる。未対応
//対応案→クリック入力の受付をフォーム入力時にできないようにする。アニメーションの表示条件を変更してみる。
import React from 'react';
import { Box, Text, HStack, Flex, Divider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
import { useUIState } from '../../hooks/useUIState';
import { useFormState } from '../../hooks/useFormState';
import ConverterCodeEditor from '../ConverterCodeEditor/ConverterCodeEditor';
import ShadowBox from '@/components/Elements/Box/ShadowBox';

const ConversionComponents = () => {
  //フォーム関連の状態管理
  const { wordsToReplace, prefix, snippetName, setInputCode, inputCode, setSnippetOutput, snippetOutput } =
    useFormState();
  //アニメーションUIの状態管理
  const {
    isLoading,
    isUpdated,
    isIconVisible,
    isIconVisibleTwo,
    isIconVisibleThree,
    setIsIconVisible,
    setIsIconVisibleThree,
    setIsIconVisibleTwo,
  } = useUIState();
  //ハンドラーを管理するフック
  const { handlePrefixChange, handleSnippetChange, handleWordChange, handleCaseFormatChange, handleInputOrderChange } =
    ConverterHooks.useConverterHandler();
  //変換コンポーネントの追加、削除、クリア、コピー機能を管理するフック
  const { addForm, removeForm, clearCode, copyToClipboard, updateCode } = ConverterHooks.useConverterActions();
  //react-simple-code-editorがhooksなどに関与すると画面が真っ白になる為、一旦このまま
  const highlightWithPrism = (code: string) => Prism.highlight(code, Prism.languages.javascript, 'javascript');
  const handleCodeChange = (code: string) => {
    if (isUpdated) {
      setSnippetOutput(code);
    } else {
      setInputCode(code);
    }
    setIsIconVisible(code === '');
    setIsIconVisibleTwo(code !== '');
    setIsIconVisibleThree(false);
  };

  return (
    <Box>
      <Flex
        justifyContent="center"
        flexDirection="row"
        bg="gray.50"
        as="form"
        width="100%"
        alignItems="flex-start"
        gap={5}
      >
        <Flex justifyContent="space-between" flexDirection="row" width="80%" maxWidth="1200px" gap={5}>
          <ShadowBox>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                変換したいコードを張り付ける
              </Text>
              <AnimatePresence>
                {isIconVisible && <Effects.StepChanInitial />}
                {isIconVisibleTwo && <Effects.StepChanNext />}
                {isIconVisibleThree && <Effects.StepChanComplete />}
              </AnimatePresence>
              <Converter.ConverterClearCopyButton onClear={clearCode} onCopy={copyToClipboard} />
            </Flex>
            <Divider my={4} sx={{ borderColor: 'gray.400' }} />{' '}
            <ConverterCodeEditor
              inputCode={inputCode}
              snippetOutput={snippetOutput}
              onCodeChange={handleCodeChange}
              isUpdated={isUpdated}
              highlight={highlightWithPrism}
            />
          </ShadowBox>
          {/* 変換フォーム */}
          <Flex flex="1" direction="column">
            <ShadowBox
              width="550px"
              maxWidth="550px"
              shadowBoxHeight="90%"
              shadowBoxWidth="91%"
              shadowBoxBorder="15px solid rgba(74, 74, 74, 0.25)"
              shadowBoxLeft="50px"
              shadowBoxTop="26px"
            >
              {/* ここ自体をConverterFormという命名にしてコンポーネント化してconverterディレクトリに格納する */}
              <Flex justifyContent="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  変換フォーム
                </Text>
                <HStack>
                  <Converter.ConverterAddUpdateButton
                    isLoading={isLoading}
                    onAddForm={addForm}
                    onUpdateCode={updateCode}
                  />
                </HStack>
              </Flex>
              <Divider my={4} sx={{ borderColor: 'gray.400' }} />
              {/* インプットフォームとフォーム関連は共通化componentsにまとめてPropsとして受け取る形にした方がいい */}
              {/* ConverterPrefixForm → InputFormに変更  共通のコンポーネントに格納してpropsとして渡して使用する */}
              <Converter.ConverterPrefixForm
                prefix={prefix}
                snippetName={snippetName}
                onPrefixChange={handlePrefixChange}
                onSnippetChange={handleSnippetChange}
              />
              {wordsToReplace.map((word, index) => (
                // ConverterForm → Formに変更  共通のコンポーネントに格納してpropsとして渡して使用する
                <Converter.ConverterWordForm
                  key={index}
                  word={word.word}
                  id={word.id}
                  caseFormat={word.caseFormat}
                  inputOrder={word.inputOrder}
                  onWordChange={(value) => handleWordChange(index, value)}
                  onCaseFormatChange={(value) => handleCaseFormatChange(index, value)}
                  onInputOrderChange={(value, id) => handleInputOrderChange(value, id)}
                  onRemove={() => removeForm(word.id)}
                />
              ))}
            </ShadowBox>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default ConversionComponents;
//ワード更新関数
//動的なリストの予定なのでindexは不適切…？
//あとでUUIDを使用してIDで識別して処理する関数が適切？
// const handleWordChange = (index: number, value: string) => {
//   //正規表現で英数字
//   const pattern = /^[a-zA-Z0-9]*$/;
//   if (pattern.test(value)) {
//     // 入力値が英数字のみの場合は、状態を更新
//     const newWord = [...wordsToReplace];
//     newWord[index].word = value;
//     setWordsToReplace(newWord);
//     //ステップアップちゃんの動作更新
//     setIsIconVisible(false);
//     setIsIconVisibleTwo(value === '');
//     setIsIconVisibleThree(value !== '');
//   } else {
//     // 英数字以外が含まれている場合は、何もしない or エラーメッセージを表示
//     const toastId = 'only-ascii';
//     if (!toastIdRef.current || !toast.isActive(toastIdRef.current)) {
//       toastIdRef.current = toast({
//         id: toastId,
//         title: '半角英数字のみを入力してください',
//         description: 'クリップボードへのコピーに失敗しました。',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//         position: 'top',
//       });
//     }
//   }
// };

//ケースフォーマット更新関数
// const handleCaseFormatChange = (index: number, value: string) => {
//   const newCaseFormat = [...wordsToReplace];
//   newCaseFormat[index].caseFormat = value;
//   setWordsToReplace(newCaseFormat);
// };
//IndexではなくIDを参照して配列のinputOrderを更新
// const handleInputOrderChange = (valueAsNumber: number, id: string) => {
//   const updatedWordSettings = wordsToReplace.map((element) => {
//     if (element.id === id) {
//       return { ...element, inputOrder: valueAsNumber };
//     } else {
//       return element;
//     }
//   });
//   setWordsToReplace(updatedWordSettings);
// };

// Prefixの変更を扱う関数
// const handlePrefixChange = (value: string) => {
//   setPrefix(value);
// };
// // スニペット名の変更を扱う関数
// const handleSnippetChange = (value: string) => {
//   setSnippetName(value);
// };

//追加
// const addForm = () => {
//   const newWordsToReplace: wordsToReplace = {
//     word: '',
//     caseFormat: 'default',
//     id: uuidv4(),
//     inputOrder: wordsToReplace.length + 1,
//   };
//   setWordsToReplace([...wordsToReplace, newWordsToReplace]);
// };

//削除
//あとで復習
// const removeForm = (id: string) => {
//   // 指定されたIDを持つフォームを除外して新しい配列を作成
//   const updatedWordsToReplace = wordsToReplace.filter((form) => form.id !== id);
//   // inputOrderを更新
//   const reorderedWordsToReplace = updatedWordsToReplace.map((form, index) => ({
//     ...form,
//     inputOrder: index + 1, // 1から始まる連番に更新
//   }));
//   setWordsToReplace(reorderedWordsToReplace);
// };

//変換フォーマットを扱う関数
// const createCaseFormat = (wordsToReplace: wordsToReplace) => {
//   switch (wordsToReplace.caseFormat) {
//     case 'Pascal':
//       return `\${${wordsToReplace.inputOrder}/(.*)/\${${wordsToReplace.inputOrder}:/pascalcase}/}`;
//     case 'default':
//       return `\${${wordsToReplace.inputOrder}}`;
//   }
// };

// //Json形式変換を扱う関数
// const convertToJSON = (createToJsonText: string, prefix: string, snippet: string) => {
//   const snippetTemplate = {
//     [snippet]: {
//       prefix: prefix,
//       body: createToJsonText.split('\n'),
//     },
//   };
//   let jsonString = JSON.stringify(snippetTemplate, null, 2);
//   jsonString = jsonString.slice(1, -1).trim();
//   const addCharacter = (i: number) => {
//     if (i < jsonString.length) {
//       setTimeout(() => {
//         setSnippetOutput((currentCode) => currentCode + jsonString[i]);
//         addCharacter(i + 1);
//         //currentCode・・・現在のコード、つまり現在のコードに生成されたJsonStringコードのi番目を渡している。
//         //それを繰り返すことで動的にコードが生成されているようにみせている。
//       }, 1);
//     } else {
//       setIsLoading(false);
//     }
//   };
//   addCharacter(0);
//   //アニメーション無しの場合はこちら
//   // setSnippetOutput(jsonString)
//   // setIsLoading(false)
// };

// //変換関数
// const updateCode = () => {
//   //入力催促用のトースト
//   // const hasEmptyFields = wordsToReplace.some(item => !item.word.trim() || !item.caseFormat.trim());

//   // if (hasEmptyFields) {
//   //   toast({
//   //     title: "エラー",
//   //     description: "すべてのフィールドを入力してください。",
//   //     status: "error",
//   //     duration: 5000,
//   //     isClosable: true,
//   //     position: "top", // トーストを上部に表示
//   //   });
//   //   return;
//   // }
//   setSnippetOutput('');
//   setIsLoading(true);
//   //置換処理
//   let newCode = inputCode;

//   wordsToReplace.forEach((wordsToReplace) => {
//     if (wordsToReplace.word.trim() !== '') {
//       const regex = new RegExp(wordsToReplace.word, 'g');
//       const replacement = createCaseFormat(wordsToReplace) || '';
//       newCode = newCode.replace(regex, replacement);
//     }
//   });
//   convertToJSON(newCode, prefix, snippetName);
//   setIsUpdated(true);
//   setIsIconVisibleThree(false);
// };
// //コードエディターフォーム関連
// //入力を初期化ボタン
// const clearCode = () => {
//   const newWordsToReplace: wordsToReplace = { word: '', caseFormat: 'default', id: uuidv4(), inputOrder: 1 };
//   setWordsToReplace([newWordsToReplace]);
//   setInputCode('');
//   setSnippetOutput('');
//   setPrefix('');
//   setSnippetName('');
//   setIsUpdated(false);
// };
// //コピー機能
// const copyToClipboard = async () => {
//   try {
//     await navigator.clipboard.writeText(snippetOutput);
//     toast({
//       title: 'コピー成功',
//       description: 'コピー完了!!',
//       status: 'success',
//       duration: 5000,
//       isClosable: true,
//       position: 'top',
//     });
//   } catch (err) {
//     console.error('クリップボードへのコピーに失敗しました', err);
//     toast({
//       title: 'コピー失敗',
//       description: 'クリップボードへのコピーに失敗しました。',
//       status: 'error',
//       duration: 5000,
//       isClosable: true,
//       position: 'top',
//     });
//   }
// };
