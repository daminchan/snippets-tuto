// import { Flex, HStack, Box, Text, ListIcon } from '@chakra-ui/react';
// import { InfoOutlineIcon } from '@chakra-ui/icons';
// import { Update, Detail, GetDetailStyleFunction, Style } from '@/types/updateTypes';

// interface UpdateDetailProps {
//   detail: Detail;
//   style: Style;
// }

// const UpdateDetail: React.FC<UpdateDetailProps> = ({ detail, style }) => (
//   <Flex justifyContent="flex-start" alignItems="flex-start">
//     <HStack spacing={3} alignItems="flex-start">
//       <Box flexShrink={0}>
//         <Text color={style.color} fontWeight={style.fontWeight}>
//           <ListIcon as={InfoOutlineIcon} color="blue.500" />
//           {detail.title}
//           <Box as="span" color="gray.500" fontWeight="bold">
//             :
//           </Box>
//         </Text>
//       </Box>
//       <Box maxW="700px">
//         <Text color="gray.600">{detail.description}</Text>
//       </Box>
//     </HStack>
//   </Flex>
// );

// export default UpdateDetail;
