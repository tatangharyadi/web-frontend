import { Blog } from "@/models/blog.inteface";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { axiosCMS } from "../../configs/axios";
import { GetServerSideProps } from "next";

type Props = {
  data: Array<Blog>;
};

const BlogsPage: FC<Props> = ({ data }) => {
  return (
    <Layout title="Blogs">
      <div>
        <h1>Blogs</h1>
        {data.map((blog: Blog) => (
          <div key={blog.id}>
            <Link href={`/blogs/${blog.slug}`}>
              <a>{blog.title}</a>
            </Link>
          </div>
        ))}
      </div>
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
