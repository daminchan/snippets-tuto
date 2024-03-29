
import React from 'react';
type ConversionFormat = {
    case: 'pascal' | 'default'
    inputOrder: number
    target: string
  }
  



const createCaseFormat = (
    caseFormat: 'pascal' | 'default',
    inputOrder: number,
    
  ) => {
    switch (caseFormat) {
      case 'pascal':
        return '${inputOrder/(.*)/${inputOrder:/pascalcase}/}'.replace(
          // 'inputOrder',これだと最初のinputOrderにしか変換が適応されないので/inputOrder/gこれにかえてグローバルで適応するようにした
          /inputOrder/g,
          inputOrder.toString(),
          
        )
      case 'default':
        return '${inputOrder}'.replace('inputOrder', inputOrder.toString())
    }
  }
  
//ドロップダウンで選択
  const state: ConversionFormat = {
    case: 'pascal',
    inputOrder: 2,
    target: 'user',
  }


  const code = 'user'
  
  // state.targetをcreateCaseFormat関数の結果で置換し、結果をコンソールに出力
  const replacedCode = code.replace(state.target, createCaseFormat(state.case, state.inputOrder));  
  console.log(replacedCode);


  // const formatLog =()=>{
  //   console.log(replacedCode);
  // }
  
 
  
 const CreateFormat = () => {
  // console.log(replacedCode);
  const formattedText = createCaseFormat(state.case, state.inputOrder);
   return (
     <div>
      
        {/* <button onClick={formatLog}>フォーマットログを表示</button> */}
     </div>
   );
 };
 
 export default CreateFormat;

 
 