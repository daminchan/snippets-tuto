"use client"
import { Box,  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import 'prismjs/themes/prism-okaidia.css';


const page = () => {
  const [snippetOutput,setSnippetOutput]=useState('');
  

  return (
    <Box>
      <Box width='500px' p={3}>
      <Box>
      <Editor
        value={snippetOutput}
        onValueChange={code => setSnippetOutput(code)}
        highlight={code => highlight(code, languages.js,'javascript')}
        padding={10}
        style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 15,
        minHeight: '24rem', // エディタの最小高さを設定
        overflow: 'auto',
        backgroundColor: '#2D2D2D', // 背景色
        color: '#fff',
        borderRadius: '15px', // 角丸
        }}/>
      </Box>
      
      </Box>
    </Box>
  )
}

export default page
