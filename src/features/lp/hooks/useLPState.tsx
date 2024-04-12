import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LPStateContextType {
  sampleCode: string; // デモ表示用のサンプルコード
  code: string; // ユーザーに表示する現在のコード
  rightCode: string; // 正しいコード例を表示するための状態
  newCode: string; // 新しいコードスニペットを生成するためのテンプレート
  setSampleCode: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setRightCode: React.Dispatch<React.SetStateAction<string>>; //
}
const LPStateContext = createContext<LPStateContextType | undefined>(undefined);
interface LPStateProviderProps {
  children: ReactNode;
}
export const LPStateProvider: React.FC<LPStateProviderProps> = ({ children }) => {
  const [sampleCode, setSampleCode] = useState(`
  
    import React  from 'react';
  
    const user = () => {
      return (
        <div>
          { content }
        </div>
      );
    };`);
  //サンプルコードを表示させる
  const [code, setCode] = useState(sampleCode);

  const [rightCode, setRightCode] = useState('');

  const newCode = `
    {
      "": {
        "prefix": "",
        "body": [
          "  ",
          "  import React  from 'React';",
          "",
          "  const \${1/(.*)/\${1:/pascalcase}/}\ = () => {",
          "    return (",
          "      <div>",
          "        { content }",
          "      </div>",
          "    );",
          "  };"
        ],
        "description": ""
      }
    }`;

  const value = {
    sampleCode,
    code,
    rightCode,
    newCode,
    setSampleCode,
    setCode,
    setRightCode,
  };

  return <LPStateContext.Provider value={value}>{children}</LPStateContext.Provider>;
};

export const useLPState = () => {
  const context = useContext(LPStateContext);
  if (context === undefined) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};
