import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Layout } from "@/components/Layout";
import { axiosAPI } from "@/config/axios";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords not matching")
    .required("Confirm password is required"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const res: any = await axiosAPI.post("auth/register", { ...data });
      router.push("/auth/login");
    } catch (e) {
      toast.error(e.response.data.message[0]);
    }
  };

  return (
    <Layout title="Register">
      <div className="flex  mt-7 items-center justify-center">
        <div className="md:w-1/3">
          <h1 className="flex gap-1 items-center text-xl font-bold">
            <FaUser /> Create an account
          </h1>
          <ToastContainer />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
            <div>
              <label className="text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
                {...register("name")}
              ></input>
              <span className="py-2 text-sm text-red-500">
                {errors?.name?.message}
              </span>
            </div>
            <div className="mt-3">
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
            <div className="mt-3">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="Confirm password"
                className="w-full rounded px-3 py-2 bg-gray-300 border focus:bg-white focus:outline-none"
                {...register("passwordConfirm")}
              ></input>
              <span className="py-2 text-sm text-red-500">
                {errors?.passwordConfirm?.message}
              </span>
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
