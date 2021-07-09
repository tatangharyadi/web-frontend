import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-center">
      <p>Copyright &copy;2021</p>
      <p>
        <Link href="/about">About</Link>
      </p>
    </footer>
  );
};
