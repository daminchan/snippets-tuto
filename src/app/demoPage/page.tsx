"use client"
import React, { useState } from 'react'
import ExamplePage from './examplePage/examplePage'


const page = () => {
    const [showTryOut,setShowTryOut] = useState(true);

    const handlePreviewButtonClick=()=>{
      setShowTryOut(true);
    }
  return (
    <div>
        <ExamplePage></ExamplePage>
    </div>
  )
}

export default page
