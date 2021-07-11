import { signIn } from "next-auth/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res: any = await signIn("domain", {
      username: email,
      password,
      redirect: false,
    });
    console.log(res);
    if (res.error === "CredentialsSignin" || !res.error) {
      router.push("/");
    } else {
      toast.error("Invalid credential");
    }
  };

  return (
    <Layout title="User Login">
      <div className="flex mt-7 items-center justify-center">
        <div className="w-1/3">
          <h1 className="flex gap-1 items-center text-xl font-bold">
            <FaUser /> Login to your account
          </h1>
          <ToastContainer />

          <form onSubmit={handleSubmit} className="mt-7">
            <div>
              <label className="text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
              ></input>
            </div>
            <div className="mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
              ></input>
            </div>
            <div className="mt-0 text-right">
              <Link href="/">
                <a className="text-sm text-gray-700">Forgot Password</a>
              </Link>
            </div>
            <button
              type="submit"
              className="btn w-full rounded mt-7 py-2 text-white bg-gray-500 hover:bg-red-700 hover:text-white "
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link href="/">
              <a className="font-semibold">Register</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
