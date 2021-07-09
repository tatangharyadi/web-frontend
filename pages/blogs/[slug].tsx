import { Blog } from "@/models/blog.inteface";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { axiosCMS } from "configs/axios";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  data: Blog;
};

const BlogPage: FC<Props> = ({ data }) => {
  return (
    <Layout title="Blog">
      <h1>{data.title}</h1>
      <p className="prose">{data.content}</p>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axiosCMS.get("blogs");
  const paths = data.map((blog: Blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
}: any) => {
  const { data } = await axiosCMS.get(`blogs?slug=${slug}`);

  return {
    props: {
      data: data[0],
    },
    revalidate: 1,
  };
};

export default BlogPage;
