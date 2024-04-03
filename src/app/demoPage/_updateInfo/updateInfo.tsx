import { Box, Heading, Text, List, ListItem, ListIcon, Flex } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';







const UpdateInfo = () => {

    const updates = [
        {
          date: '2024/03/30',
          details: [
            { title: '更新', description: '本番ページ：インプットフォームが未入力時、臨時対応として変換不可とし、トーストで入力されていない事を表示するよう対応' },
            { title: '更新', description: '全体：ユーザーの操作を直感的にサポートする為、アニメーションアイコンを導入しました' },
            { title: '更新', description: 'デモページ：アップデートや不具合関連を表示するようにしました。' },
            { title: '更新', description: '本番ページ：オールクリアボタンの追加' },
            { title: '更新', description: '本番ページ:StepUpIconの初期位置が意図しない場所に表示する為、遅らせて表示する事で対応' },
            { title: '更新', description: '変換が完了していないのに変換ボタンを押せる不具合の修正' },
            { title: '対応中', description: 'スニペット構文から他のスニペット構文に変換する際エラーがでる不具合' },
            { title: '対応中', description: '“new”というワードをスニペット構文に変換する際、張り付けたコード内に"news"という文字列が存在した場合それらにもスニペット構文が適応されてしまう不具合' },
            { title: '対応中', description: '未入力時に入力促進のエラーメッセージを表示' },
            { title: '対応中', description: 'アプデ情報を最新の10件まで表示するように' },
            { title: '対応中', description: 'Json形式からJson形式への変換を出来るように対応中' },
            { title: '対応中', description: 'Choice構文は未実装' },
          ],
        },
        {
          date: '2024/03/29',
          details: [
            { title: '不具合', description: 'なつめは👶' },
            
          ],
        },
      ];

      // const updatesWithHighlight = updates.filter(update =>
      //   update.details.some(detail => detail.title === '不具合'))
    
        const getDetailStyle =(title:string)=>{
          switch (title) {
            case '不具合':
              return {color: "red.500", fontWeight: "bold"}
            case '更新':
              return {color: "blue.500", fontWeight: "bold"}
            case '対応中':
              return {color: "gray.500", fontWeight: "bold"}
            default:
              return {color: "gray.800", fontWeight: "normal"}
          }
        }
      

  return (
    <Box  overflow="hidden" p={4}   m={24} >
    <Heading as="h3"fontSize="2xl" fontWeight="bold" textAlign="center" fontStyle="italic" mb={4}>
        Latest Updates
    </Heading>
    <List spacing={3} m={6} textAlign="center">
      {updates.map((update, index) => (
        <ListItem key={index}>
          <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600">{update.date}</Text>
          <Flex direction="column" align="center" gap="1">
            {update.details.map((detail, detailIndex) => {
              const style = getDetailStyle(detail.title);
          return(
            <Flex key={detailIndex} justifyContent="center" alignItems="center">
                <ListIcon as={InfoOutlineIcon} color="blue.500" />
                <Text color={style.color}
                      fontWeight={style.fontWeight}
                >{detail.title}</Text>
                <Text color="gray.600">: {detail.description}</Text>
              </Flex>
            )})}
          </Flex>
        </ListItem>
      ))}
    </List>
  </Box>
  );
};

export default UpdateInfo;