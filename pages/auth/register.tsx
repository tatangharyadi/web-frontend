import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { axiosAPI } from "@/config/axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await axiosAPI.post("auth/register", {
        name,
        email,
        password,
        passwordConfirm,
      });
      router.push("/auth/login");
    } catch (e) {
      toast.error(e.response.data.message[0]);
    }
  };

  return (
    <Layout title="Register">
      <div className="flex mt-7 items-center justify-center">
        <div className="w-1/3">
          <h1 className="flex gap-1 items-center text-xl font-bold">
            <FaUser /> Create an account
          </h1>
          <ToastContainer />

          <form onSubmit={handleSubmit} className="mt-7">
            <div>
              <label className="text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
              ></input>
            </div>
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
            <div className="mt-3">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm password"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
              ></input>
            </div>
            <button
              type="submit"
              className="btn w-full rounded mt-7 py-2 text-white bg-gray-500 hover:bg-red-700 hover:text-white "
            >
              Register
            </button>
          </form>

          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/auth/login">
              <a className="font-semibold">Login</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
