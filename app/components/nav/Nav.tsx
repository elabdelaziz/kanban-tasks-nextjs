"use client";

import NavBarActions from "./NavBarActions";
import Logo from "./Logo";
import useLocalStorage from "@/app/hooks/useLocalStorage";

const Nav = () => {
  const [activeBoardId] = useLocalStorage("activeBoardId", 1);
  return (
    <nav className="flex justify-between items-center pr-6 w-full border-b border-b-mainBorder dark:border-b-darkBorder">
      <div className="flex items-center min-w-[300px]">
        <Logo />
      </div>
      <div className="flex flex-grow items-center justify-between gap-4">
        <h2 className="px-4 border-l border-l-mainBorder dark:border-l-darkBorder py-8">
          ActiveBoard: {activeBoardId}
        </h2>
        <NavBarActions />
      </div>
    </nav>
  );
};

export default Nav;
