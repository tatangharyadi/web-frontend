import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex space-x-3 items-center bg-white text-gray-900 h-7 px-3 shadow">
      <div className="text-red-500 text-xl uppercase">
        <Link href="/">
          <a>Shop!</a>
        </Link>
      </div>

      <nav>
        <ul className="flex flex-col items-center justify-center list-none">
          <li>
            <Link href="/blogs">
              <a>Community</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
