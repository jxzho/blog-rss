import type { NextPage } from 'next';
import { getAllPosts, getPostBySlug } from '../../utils/index';
import styles from '../../styles/Post.module.css';
import { markdownToHtml } from '../../lib';
import { PostBody } from '../../components/post/post-body';
import { IconBack } from '../../components/icon-back/icon-back';
import { IconHome } from '../../components/icon-home/icon-home';
import { Tags } from '../../components/tags/tags';

type PostProps = {
  title: string;
  tag: string | string[];
  content: string;
  icon: string;
};

const Posts: NextPage<PostProps> = ({ title, tag, icon, content }) => {
  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className="flex justify-between mb-4">
            <IconBack />
            <IconHome />
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.headerInfoLeft}>2021.11.12 08:30 PM</div>
            <div className={styles.headerInfoRight}>共 {content.length} 字</div>
          </div>
        </header>
        <div className={styles.tagBar}>
          {icon && <img className={styles.icon} src={icon} />}
          <Tags tags={tag} />
        </div>
        <h1>{title}</h1>
        <div className={styles.contents}>
          <PostBody content={content} />
        </div>
      </article>
    </div>
  );
};

// 静态传参
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || '');
  const { data } = post;
  return {
    props: {
      title: data.title,
      tag: data.tag,
      icon: data.icon || '',
      content,
    },
  };
}

// 获取所有静态路径
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
