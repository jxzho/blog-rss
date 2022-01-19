import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { ArticleList } from '../components/article/article-list';
import { getAllPosts } from '../utils/index'

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>我的博客</title>
        <meta name="description" content="My Blog Site" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>我的博客</h1>
        <ArticleList posts={posts} />
      </main>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const posts = getAllPosts()
  return {
    props: {
      posts
    },
  }
}

export default Home;
