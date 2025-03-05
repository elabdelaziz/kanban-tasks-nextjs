'use client'

import React from 'react'
import DayNightToggle from './DayNightToggle';
import Image from 'next/image';

const DarkModeSwitch = () => {

  return (
    <div className="w-full">
      <div className="mb-[2rem] relative h-[48px] rounded-[6px] my-[1rem] bg-bgWhite dark:bg-bgDark flex items-center justify-between">
        <Image
          alt="Light Theme"
          width={20}
          height={20}
          className="w-[20px] ml-[10px] h-[20px]"
          src="/assets/icon-light-theme.svg"
        />
        <DayNightToggle isDark={false} />
        <Image
          alt="Dark Theme"
          width={20}
          height={20}
          className="w-[20px] mr-[10px] h-[20px]"
          src="/assets/icon-dark-theme.svg"
        />
      </div>
      
    </div>
  );
}

export default DarkModeSwitch