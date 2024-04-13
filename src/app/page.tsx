'use client';

import Fade from '@/components/test2/Fade';
import Section from '@/components/section/Section';
import ConversionComponents from '@/features/converter/components/ConversionComponents/ConversionComponents';
import { FormStateProvider } from '@/features/converter/hooks/useFormState';
import { UIStateProvider } from '@/features/converter/hooks/useUIState';
import { Box } from '@chakra-ui/react';

// デモンストレーションの効果についての反省点：
// 現在のデモは既に機能に精通しているユーザーにとっては理解しやすいものの、
// 新規ユーザーにはその価値を十分に伝えるものになっていないかもしれない
// 「へぇ〜便利そう、使ってみよう、どのような動きになるのかな？」と思わせるような、
//直感的でわかりやすく興味をもってもらえるようなデモンストレーションを目指すべき

export default function Home() {
  return (
    <main>
      <Box bg="gray.50" minHeight="100vh">
        <Section />
        <Fade delay={0.33}>
          <UIStateProvider>
            <FormStateProvider>
              <ConversionComponents />
            </FormStateProvider>
          </UIStateProvider>
        </Fade>
      </Box>
    </main>
  );
}
