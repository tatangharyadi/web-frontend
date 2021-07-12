import { Layout } from "@/components/Layout";
import { axiosAPI } from "@/config/axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { FC } from "react";

type Props = {
  data: {
    email: string;
    name: string;
    imagePath: string;
  };
};

const ProfilePage: FC<Props> = ({ data }) => {
  return (
    <Layout title="Profile">
      <h1>{data.name}</h1>
      {data.email}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const { data } = await axiosAPI.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return {
    props: { data },
  };
};

export default ProfilePage;
