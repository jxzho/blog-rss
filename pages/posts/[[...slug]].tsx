import type { NextPage } from 'next';
import { getAllPosts, getPostBySlug } from '../../utils/index';
import styles from '../../styles/Post.module.css';
import { markdownToHtml } from '../../lib';
import { PostBody } from '../../components/post/post-body';
import { useRouter } from 'next/router';

const IconBack = () => {
  const router = useRouter();
  return (
    <div className={styles.btnBack}>
      <svg
        onClick={router.back}
        className="icon-back"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#847469" stopOpacity={1} />
            <stop offset="100%" stopColor="#bdaca1" stopOpacity={1} />
          </linearGradient>
        </defs>
        <path
          d="M579.05 890.2l-44.4 44.4c-18.8 18.8-49.2 18.8-67.8 0L78.05 546c-18.8-18.8-18.8-49.2 0-67.8l388.8-388.8c18.8-18.8 49.2-18.8 67.8 0l44.4 44.4c19 19 18.6 50-.8 68.6l-241 229.6h574.8c26.6 0 48 21.4 48 48v64c0 26.6-21.4 48-48 48h-574.8l241 229.6c19.6 18.6 20 49.6.8 68.6z"
          fill="url(#grad1)"
        />
      </svg>
    </div>
  );
};

const Posts: NextPage = ({ title, content }) => {
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
