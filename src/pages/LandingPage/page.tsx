"use client";
import React from 'react'
import TopSection from './TopSection';
import Tokenomics from './Tokenomics';
import BottomSection from './BottomSection';
import SliderSection from './SliderSection';

const page = () => {
  return (
    <div>
        <TopSection/>
        <Tokenomics/> 
        <SliderSection/>
        <BottomSection/>
    </div>
  )
}

export default page