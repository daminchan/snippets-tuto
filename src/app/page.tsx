"use client"
import Image from "next/image";
import Link from "next/link";
import { Box, Button, ButtonGroup, Select, Stack } from '@chakra-ui/react'
import FeatureDemoPage from "./_featureDemoPage/FeatureDemoPage";



export default function Home() {
 
  return (
    <main>
          <Box>
            <FeatureDemoPage/>
          </Box>
    </main>
  );
}

