import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { GetStaticProps } from "next";

type Props = {
  frontmatter: {
    title: string;
  };
  content: any;
};

const AboutPage: FC<Props> = ({ frontmatter, content }) => {
  return (
    <Layout title={frontmatter.title}>
      <div className="w-full px-10 py-6 bg-white mt-6">
        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const markdown = fs.readFileSync(path.join("contents", "about.md"), "utf-8");

  const { data: frontmatter, content } = matter(markdown);

  return {
    props: { frontmatter, content },
  };
};

export default AboutPage;
