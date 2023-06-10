import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { ArticleList } from '../components/article/article-list';
import { Tag } from '../components/tags/tag';
import { getAllPosts } from '../utils/index';
import { useState } from 'react';

const Home: NextPage = ({ posts, tagMap }: any) => {
  const [postShown, setPostShown] = useState(posts);
  const onTagClick = (tag: string) => {
    setPostShown(tagMap[tag]);
  };
  const onTitleClick = () => {
    setPostShown(posts);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Russell&apos;s Blog</title>
        <meta name="description" content="My Blog Site" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <div className="sm:w-96 mx-auto">
          <h1 className={styles.title + ' sm:my-6'} onClick={onTitleClick}>
            文章
          </h1>
          <div className="sm:my-6">
            {Object.keys(tagMap).map((tag, index) => (
              <Tag tag={tag} key={`tag-${index}`} onTagClick={onTagClick} />
            ))}
          </div>

          <div className='sm:hidden h-0 border-b-0 border-dashed border-t-[0.1px] border-t-[#927c6e] my-2'></div>

          <ArticleList posts={postShown} />
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();
  const tagMap: {
    [tag: string]: any;
  } = {};

  posts.forEach((item) => {
    // 收集所有tag
    const tags = item.data.tag || [];
    if (tags) {
      tags.forEach((tag: string) => {
        if (!(tag in tagMap)) {
          tagMap[tag] = [];
        }
        tagMap[tag].push(item);
      });
    }
  });

  return {
    props: {
      posts,
      tagMap,
    },
  };
}

export default Home;
