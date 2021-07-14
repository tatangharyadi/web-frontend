import { signIn } from "next-auth/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Layout } from "@/components/Layout";

interface IFormInput {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res: any = await signIn("domain", {
      redirect: false,
      username: data.email,
      password: data.password,
    });

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

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
            <div>
              <label className="text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
                {...register("email")}
              ></input>
              <span className="py-2 text-sm text-red-500">
                {errors?.email?.message}
              </span>
            </div>
            <div className="mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
                {...register("password")}
              ></input>
              <span className="py-2 text-sm text-red-500">
                {errors?.password?.message}
              </span>
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
            <Link href="/auth/register">
              <a className="font-semibold">Register</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
