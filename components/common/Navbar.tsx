import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";

const Hamburger = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="md:hidden" onClick={onClick}>
    {isOpen ? <MdClose size="1.5rem" /> : <GiHamburgerMenu size="1.5rem" />}
  </div>
);

interface NavbarProps {
  active: "Home" | "Plans" | "Gallery" | "Contact";
}

const NavPaths = [
  { path: "/", name: "Home" },
  { path: "/#plans", name: "Plans" },
  { path: "/gallery", name: "Gallery" },
  { path: "/#contact", name: "Contact" },
];

function Navbar({ active }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className={`left-0 top-0 z-20 p-2 w-full bg-white fixed`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        <div className="px-2 py-4 flex justify-between items-center relative w-full">
          <Link href="/">
            <h1 className="text-2xl md:text-2xl text-gray-900 cursor-pointer">
              GoodShot
            </h1>
          </Link>
          <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
        {isOpen && (
          <ul className="flex md:hidden flex-col items-stretch px-2 space-y-3 cursor-pointer w-full z-20">
            {NavPaths.map(({ path, name }) => (
              <Link href={path}>
                <li
                  className={
                    active === name
                      ? "font-bold border-b-2 border-yellow-500"
                      : ""
                  }
                >
                  {name}
                </li>
              </Link>
            ))}
          </ul>
        )}

        <ul className="hidden md:flex items-stretch px-0 space-x-3 cursor-pointer w-fit z-20">
          {NavPaths.map(({ path, name }) => (
            <Link href={path}>
              <li
                className={
                  active === name
                    ? "font-bold border-b-2 border-yellow-500"
                    : ""
                }
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
