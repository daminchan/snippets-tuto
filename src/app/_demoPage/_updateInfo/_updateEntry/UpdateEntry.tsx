// import { Box, Flex, Text, ListItem, HStack, ListIcon } from '@chakra-ui/react';

// import { InfoOutlineIcon } from '@chakra-ui/icons';
// import { Update, Detail, GetDetailStyleFunction } from '@/types/updateTypes';
// import UpdateDetail from './_updateDetail/UpdateDetail';

// interface UpdateEntryProps {
//   update: Update;
//   getDetailStyle: GetDetailStyleFunction;
// }

// const UpdateEntry: React.FC<UpdateEntryProps> = ({ update, getDetailStyle }) => (
//   <ListItem>
//     <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600" pb={1}>
//       {update.date}
//     </Text>
//     <Flex direction="column" align="flex-start" gap="1">
//       {update.details.map((detail, detailIndex) => (
//         <UpdateDetail key={detailIndex} detail={detail} style={getDetailStyle(detail.title)} />
//       ))}
//     </Flex>
//   </ListItem>
// );

// export default UpdateEntry;
