import { Box, Heading, Text, List, ListItem, ListIcon, Flex } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';







const UpdateInfo = () => {

    const updates = [
        {
          date: '2024/04/04',
          details: [
            { title: '更新', description: '変換ページ：ワード未入力時、正規表現の関係でスペースも変換対象に含まれていたのを対応' },
            { title: '更新', description: '変換ページ：ステップちゃんが変換ボタンと被っていたのを修正・調整' },
            { title: '更新', description: '全体：アップデート内容などの表示を左寄せに変更・"LatestUpdates"から"Update Information"に変更' },
            { title: '更新', description: '変換ページ："prefix"と"snippet"フォームを追加' },
            { title: '更新', description: '変換ページ:クリップボードにコピーする機能・完了トーストの追加' },
            { title: '更新', description: '変換ページ:インプットフォームを半角英数字のみ受け付けるように変更、全角文字を入力した場合トーストメッセージが出るように変更' },
            { title: '更新', description: '全体ページ:その他UI部分の調整・修正(ホバー時のpointer等)' },
            { title: '対応中', description: '変換条件を追加した時に順序をn+1になるように' },
      
          ],
        },
        {
          date: '2024/03/29',
          details: [
            { title: '不具合', description: 'なつめは👶' },
            { title: '対応中', description: 'スニペット構文から他のスニペット構文に変換する際エラーがでる不具合' },
            { title: '対応中', description: '“new”というワードをスニペット構文に変換する際、張り付けたコード内に"news"という文字列が存在した場合それらにもスニペット構文が適応されてしまう不具合' },
            { title: '対応中', description: '未入力時に入力促進のエラーメッセージを表示' },
            { title: '対応中', description: 'アプデ情報を最新の10件まで表示するように' },
            { title: '対応中', description: 'Json形式からJson形式への変換を出来るように対応中' },
            { title: '対応中', description: 'Choice構文は未実装' },
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
    <Heading as="h3"fontSize="2xl" fontWeight="bold" textAlign="center" fontStyle="italic" mb={2}>
        Update Information
    </Heading>
    <Text fontWeight="md" textAlign="center" color="gray.500" >アップデートインフォメーション</Text>
    <Box display="flex" flexDirection="column" alignItems="center" width="100%"padding="12">
      <Box width="100%" maxWidth="1000px"> {/* maxWidthを調整してコンテンツの幅を制御 */}
        <List spacing={3} m={6} textAlign="left">
          {updates.map((update, index) => (
            <ListItem key={index}>
              <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600"pb={1}>{update.date}</Text>
              <Flex direction="column" align="flex-start" gap="1">
                {update.details.map((detail, detailIndex) => {
                  const style = getDetailStyle(detail.title);
                  return(
                    <Flex key={detailIndex} justifyContent="flex-start" alignItems="flex-start">
                      <ListIcon as={InfoOutlineIcon} color="blue.500" />
                      <Box flexShrink={0}>
                    <Text color={style.color} fontWeight={style.fontWeight}>{detail.title}</Text>
                      </Box>
                      <Box maxW="1000px" wordBreak="break-word"> {/* 最大幅をsmに設定し、単語が長い場合は改行する */}
                    <Text color="gray.600">: {detail.description}</Text>
                  </Box>
                    </Flex>
                  )})}
              </Flex>
            </ListItem>
          ))}
    </List>
  </Box>
</Box>
  </Box>
  );
};

export default UpdateInfo;