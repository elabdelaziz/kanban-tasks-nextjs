import Image from 'next/image';
import NavBarActions from './NavBarActions';

const Nav = () => {
  return (
    <nav className="flex justify-between items-center pr-6 w-full border-b border-b-mainBorder dark:border-b-darkBorder">
      <div className="flex items-center min-w-[300px]">
        <span className="pl-6">
          <Image
            src={"/assets/logo-light.svg"}
            alt="Logo"
            width={150}
            height={26}
          />
        </span>
        {/* <h1 className="items-center text-xl pl-2">Kanban Tasks</h1> */}
      </div>

      <div className="flex flex-grow items-center justify-between gap-4">
        <h2 className="px-4 border-l border-l-mainBorder dark:border-l-darkBorder py-8">
          TODO
        </h2>
        <NavBarActions />
      </div>
    </nav>
  );
}

export default Nav