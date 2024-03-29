"use client"
import Image from "next/image";
import Link from "next/link";
import { Button, ButtonGroup, Select, Stack } from '@chakra-ui/react'



export default function Home() {
 
  return (
    <main>
      <div>
          ここにデモページを表示させる
          <div>
          <Link href="/demoPage"><Button>デモページ</Button></Link>
          <Link href="/testPage"><Button>練習ページ</Button></Link>
          <Link href="/samplePage"><Button>他のフォーム</Button></Link>
          </div>
      </div>
    </main>
  );
}

