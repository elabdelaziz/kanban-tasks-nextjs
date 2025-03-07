import useLocalStorage from '@/app/hooks/useLocalStorage';
import Image from 'next/image';
import React from 'react'

const Logo = () => {
  const [darkMode] = useLocalStorage("darkMode", false);
  const [isMobile] = useLocalStorage("isMobile", false);

  return (
    <div className='pl-6'>
      {darkMode && !isMobile && (
        <Image
          width={150}
          height={26}
          src="assets/logo-light.svg"
          alt="logo"
        />
      )}
      {!darkMode && !isMobile &&
        <Image
          width={150}
          height={26}
          src="assets/logo-dark.svg"
          alt="logo"
        />
      }
      {isMobile &&
        <Image
          width={150}
          height={26}
          src="assets/logo-mobile.svg"
          alt="logo"
        />
      }
    </div>
  );
}

export default Logo