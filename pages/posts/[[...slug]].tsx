import type { NextPage } from 'next';
import Head from 'next/head'
import { getAllPosts, getPostBySlug } from '../../utils';
import { markdownToHtml } from '../../lib';
import { PostBody } from '../../components/post/post-body';
import { IconBack } from '../../components/icon-back/icon-back';
import { IconHome } from '../../components/icon-home/icon-home';
import { Tags } from '../../components/tags/tags';
import styles from '../../styles/Post.module.css';
import { useState } from "react";

type PostProps = {
  title: string;
  tag: string | string[];
  content: string;
  icon: string;
  updateAt: string
};

const Posts: NextPage<PostProps> = ({ title, tag, icon, content, updateAt }) => {
  const [modeFocus, setModeFocus] = useState(false)

  const enterMainContent = () => {
    setModeFocus(true)
  }

  const leaveMainContent = () => {
    setModeFocus(false)
  }

  const isFocusClass = modeFocus ? styles.focus : styles.normal

  return (
    <div className={styles.container}>

      <Head>
        <title>《{ title }》Russell&apos;s Blog</title>
      </Head>

      <article className={styles.article}>
        <header className={`${styles.header} ${isFocusClass}`}>
          <div className="flex justify-between mb-5">
            <IconBack />
            <IconHome />
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.headerInfoLeft}>{ updateAt }</div>
            <div className={styles.headerInfoRight}>共 {content.length} 字</div>
          </div>
        </header>
        <div className={`${styles.tagBar} ${isFocusClass}`}>
          {icon && <img className={styles.icon} src={icon} />}
          <Tags tags={tag} />
        </div>
        <div
          className="view-main-content"
          onMouseEnter={enterMainContent}
          onMouseLeave={leaveMainContent}
        >
          <h1>{title}</h1>
          <div className={styles.contents}>
            <PostBody content={content} />
          </div>
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
      updateAt: data.updateAt
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
