'use client';
import { Box, Link } from '@chakra-ui/react';

// デモンストレーションの効果についての反省点：
// 現在のデモは既に機能に精通しているユーザーにとっては理解しやすいものの、
// 新規ユーザーにはその価値を十分に伝えるものになっていないかもしれない
// 「へぇ〜便利そう、使ってみよう、どのような動きになるのかな？」と思わせるような、
//直感的でわかりやすく興味をもってもらえるようなデモンストレーションを目指すべき

export default function Home() {
  return (
    <main>
      <Box>
        Homeです
        <span>
          <Link href="/converter">アプリ</Link>
        </span>
        <span>
          <Link href="/demo">デモ</Link>
        </span>
      </Box>
    </main>
  );
}
