import { signOut, useSession } from "next-auth/client";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { axiosAPI } from "@/config/axios";

export const Header = () => {
  const [session, loading] = useSession();

  const handleLogout = async () => {
    await axiosAPI.post("auth/logout");
    signOut({ callbackUrl: "/" });
  };

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
        {!session ? (
          <div className="">
            <Link href="/api/auth/signin">
              <a className="flex items-center gap-1 rounded px-3 py-1 bg-gray-700 text-sm text-gray-100">
                <FaSignInAlt />
                Login
              </a>
            </Link>
          </div>
        ) : (
          <>
            <div>
              <Link href="/auth/profile">
                <a className="rounded px-3 py-1 text-gray-500 hover:text-gray-900">
                  {session.user?.email}
                </a>
              </Link>
            </div>
            <div className="">
              <button
                onClick={() => handleLogout()}
                className="flex items-center gap-1 rounded px-3 py-1 bg-gray-700 text-sm text-gray-100"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
