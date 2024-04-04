import { Box, Heading, Text, List, ListItem, ListIcon, Flex, VStack, HStack } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import React, { useEffect, useRef, useState } from 'react';






const UpdateInfo = () => {
  // const [isBottom, setIsBottom] = useState(false);
  // const scrollContainerRef =  useRef<HTMLDivElement>(null);

  // const handleScroll = () => {
  //   if (!scrollContainerRef.current) return;
  //   const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
  //   const isAtBottom = scrollTop + clientHeight >= scrollHeight;
  //   setIsBottom(isAtBottom);
  // };

  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;
  //   if (scrollContainer) {
  //     scrollContainer.addEventListener('scroll', handleScroll);
  //   }
  //   return () => {
  //     if (scrollContainer) {
  //       scrollContainer.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, []);
    const updates = [
        {
          date: '2024/04/04',
          details: [
            { title: '更新', description: '変換ページ：デザイン変更・各"UIの調整"' },
            { title: '更新', description: ' LP ：アップデートインフォメーションをスクロールで表示出来るように変更・"UIの調整"' },
            { title: '更新', description: '変換ページ：ステップちゃんが変換ボタンと被っていたのを修正・調整' },
            { title: '更新', description: '全体：アップデート内容などの表示を左寄せに変更・"LatestUpdates"から"Update Information"に変更' },
            { title: '更新', description: '変換ページ："prefix"と"snippet"フォームを追加' },
            { title: '更新', description: '変換ページ:クリップボードにコピーする機能・完了トーストの追加' },
            { title: '更新', description: '変換ページ:インプットフォームを半角英数字のみ受け付けるように変更' },
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
    <Box>
    <Flex  minHeight="auto" direction="column" p={4}>
    <Text  fontSize="2xl" fontWeight="bold" textAlign="center"fontStyle="italic"mb={2}> Update Information</Text>
    <Text fontWeight="md" textAlign="center" color="gray.500">アップデートインフォメーション</Text>
    </Flex>



    <Box display="flex" flexDirection="column" alignItems="center" width="100%"padding="12" >
      <Box width="100%" maxWidth="700px"position="relative"> {/* maxWidthを調整してコンテンツの幅を制御 */}
      <Box
            maxHeight="300px"
            overflowY="auto"
          
            sx={{
              '&::-webkit-scrollbar': {
                width: '6px',
                background: '#f0f0f0',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f0f0f0',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#cccccc',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#bbbbbb',
              },
            }}
          >
            <Box
              position="absolute"
              left="0"
              right="0"
              bottom="0"
              height="30px"
              pointerEvents="none" // ぼやけ効果がマウスイベントを阻害しないように
              background="linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))" // ぼやけ効果
            />
        <List spacing={3} m={6} textAlign="left">
          {updates.map((update, index) => (
            <ListItem key={index}>
              <Text fontSize="lg" fontWeight="normal" fontStyle="italic" color="gray.600"pb={1}>{update.date}</Text>
              <Flex direction="column" align="flex-start" gap="1">
                {update.details.map((detail, detailIndex) => {
                  const style = getDetailStyle(detail.title);
                  return(
                    <Flex key={detailIndex} justifyContent="flex-start" alignItems="flex-start">
                      <HStack spacing={3} alignItems="flex-start">
                      <Box flexShrink={0}>
                      <Text color={style.color} fontWeight={style.fontWeight}>
                      <ListIcon as={InfoOutlineIcon} color="blue.500" />
                        {detail.title}<Box as="span" color="gray.500" fontWeight="bold">:</Box></Text>
                        </Box>
                        <Box maxW="700px" > {/* 最大幅をsmに設定し、単語が長い場合は改行する */}
                      <Text color="gray.600">{detail.description}</Text>
                      </Box>
                      </HStack>
                    </Flex>
                  )})}
              </Flex>
            </ListItem>
          ))}
        </List>
        </Box>
      </Box>
    </Box>
  </Box>
  );
};

export default UpdateInfo;