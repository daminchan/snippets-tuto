interface UseConversionPrefixFormProps {
  setPrefix: React.Dispatch<React.SetStateAction<string>>;
  setSnippetName: React.Dispatch<React.SetStateAction<string>>;
}

export const useConversionPrefixForm = ({ setPrefix, setSnippetName }: UseConversionPrefixFormProps) => {
  const handlePrefixChange = (value: string) => {
    setPrefix(value);
  };

  const handleSnippetChange = (value: string) => {
    setSnippetName(value);
  };

  return {
    handlePrefixChange,
    handleSnippetChange,
  };
};
