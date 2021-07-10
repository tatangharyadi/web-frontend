import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <nav className="flex items-center  m-3 p-3 shadow-sm">
        <div className="flex text-red-500 text-xl font-semibold uppercase">
          <Link href="/">
            <a>Shop!</a>
          </Link>
        </div>
        <ul className="flex flex-grow">
          <li>
            <Link href="/">
              <a className="rounded px-3 py-1 text-gray-500 hover:text-gray-900">
                Products
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blogs">
              <a className="rounded px-3 py-1 text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </Link>
          </li>
        </ul>
        <div className="">
          <Link href="/">
            <a className="flex items-center gap-1 rounded px-3 py-1 bg-gray-700 text-sm text-gray-100">
              <FaSignInAlt />
              Login
            </a>
          </Link>
        </div>
      </nav>
    </header>

    // <header className="flex space-x-3 items-center bg-white text-gray-900 h-7 px-3 shadow">
    //   <div className="text-red-500 text-xl uppercase">
    //     <Link href="/">
    //       <a>Shop!</a>
    //     </Link>
    //   </div>

    //   <nav>
    //     <ul className="flex flex-row items-center justify-center list-none">
    //       <li>
    //         <Link href="/blogs">
    //           <a>Blog</a>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/">
    //           <a className="block rounded px-3 py-1  bg-gray-900 text-gray-100">
    //             <FaSignInAlt />
    //             Login
    //           </a>
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
};
