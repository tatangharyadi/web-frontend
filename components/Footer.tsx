import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex m-3 bg-gray-100 text-gray-500">
      <div className="p-3 text-sm">
        <p>
          <Link href="/about">About</Link>
        </p>
        <p className="text-xs">Copyright &copy;2021</p>
      </div>
      <div className="p-3 text-sm">
        <p className="text-red-500">Newsletter</p>
        <p>
          Lorem ipsum sit amet, consectetur adipisicing elit. Commodi,
          consectetur.
        </p>
        <div className="flex mt-3 text-gray-500">
          <input
            type="text"
            placeholder="Your email address"
            className="p-2 border border-gray-200 text-xs"
          />
          <button className="rounded-sm p-1 border border-gray-200 text-xs">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};
