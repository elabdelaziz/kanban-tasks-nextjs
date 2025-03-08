import useLocalStorage from '@/app/hooks/useLocalStorage';
import Image from 'next/image';
import React from 'react'

const Logo = () => {
  const [darkMode] = useLocalStorage("darkMode", false);
  const [isMobile] = useLocalStorage("isMobile", false);

  return (
    <div className="pl-6">
      {darkMode && !isMobile && (
        <Image width={150} height={26} src="assets/logo-light.svg" alt="logo" />
      )}
      {!darkMode && !isMobile && (
        <Image
          className="w-[150px] h-[26px]"
          width={150}
          height={26}
          src="/assets/logo-dark.svg"
          alt="logo"
          priority
        />
      )}
      {isMobile && (
        <Image
          width={150}
          height={26}
          src="/assets/logo-mobile.svg"
          alt="logo"
          priority
        />
      )}
    </div>
  );
}

export default Logo