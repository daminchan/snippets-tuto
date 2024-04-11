export const commonBoxStyles = {
  position: 'relative' as const, // TypeScriptにこの値が変更されないことを伝える
  display: 'inline-block',
  p: 3,
  m: 0,
};
export const detailedBoxStyles = {
  shadow: 'lg',
  borderColor: 'gray.200',
  bg: 'white',
  p: 10,
  m: 0,
  position: 'relative' as const,
};

export const shadowOverlayBoxStyles = {
  shadow: 'lg',
  borderRadius: 'sm',
  position: 'absolute' as const,
  zIndex: '0',
  // 他の共通スタイルがあればここに追加
};
