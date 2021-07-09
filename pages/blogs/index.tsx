import { Blog } from "@/models/blog.inteface";
import { axiosCMS } from "../../configs/axios";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { GetServerSideProps } from "next";

type Props = {
  data: Array<Blog>;
};

const BlogsPage: FC<Props> = ({ data }) => {
  return (
    <Layout>
      <h1>Blogs</h1>
      {data.map((blog: Blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
        </div>
      ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axiosCMS.get("blogs?_sort=published_at:ASC");

  return {
    props: { data },
  };
};

export default BlogsPage;
