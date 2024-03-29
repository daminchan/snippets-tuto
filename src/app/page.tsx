"use client"
import Image from "next/image";
import Link from "next/link";
import CreateFormat from "@/components/test/createFormat";
import { Button, ButtonGroup, Select, Stack } from '@chakra-ui/react'



export default function Home() {
 
  return (
    <main>
      <div>
          <div>
          <Link href="/demoPage"><Button>デモページ</Button></Link>
          <Link href="/testPage"><Button>練習ページ</Button></Link>
          </div>
      </div>
    </main>
  );
}

