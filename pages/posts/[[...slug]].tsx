import type { NextPage } from 'next';
import { getAllPosts, getPostBySlug } from '../../utils/index';
import styles from '../../styles/Post.module.css';
import { markdownToHtml } from '../../lib';
import { PostBody } from '../../components/post/post-body';
import { IconBack } from '../../components/icon-back/icon-back'

type PostProps = {
  title: string;
  content: string;
}

const Posts: NextPage<PostProps> = ({ title, content }) => {
  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <IconBack />
          <div className={styles.headerInfo}>
            <div className="left">2021.11.12 08:30 PM</div>
            <div className="right">共 {content.length} 字</div>
          </div>
        </header>
        <h1>{title}</h1>
        <div className={styles.contents}>
          <PostBody content={content} />
        </div>
      </article>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || '');
  const { data } = post;
  return {
    props: {
      title: data.title,
      content,
    },
  };
}

export const getStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((item) => {
      return {
        params: {
          slug: item.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Posts;
