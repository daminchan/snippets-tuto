export const CustomButtonLayoutStyle = {
  transition: 'transform 0.9s ease, box-shadow 0.9s ease',
  backgroundImage: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  color: 'white',

  _hover: {
    cursor: 'pointer',
    boxShadow: 'md',
    // ここに他のホバースタイルを追加できます
  },
  _active: {
    bgGradient: 'linear-gradient(45deg, #e6683c 0%, #dc2743 25%, #cc2366 50%, #bc1888 75%, #f09433 100%)',
    transform: 'scale(0.9)',
  },
};
