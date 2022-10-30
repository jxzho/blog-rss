import styles from './article-list.module.css';
import Link from 'next/link';
import { Tags } from '../tags/tags';

const isArr = Array.isArray;

// type TypeArticleList = {
//   slug: string;
//   title: string;
//   intro: string;
//   updateAt: string;
// };

// const articlesMocked: TypeArticleList[] = [
//   {
//     slug: 'tips-for-base-use',
//     title: 'Tip: 基本操作介绍',
//     intro:
//       '在文稿列表页，点击右上角的按钮可新建一片文稿在文稿列表页，向右滑动一片文稿可快速实现删除...',
//     updateAt: '2021-11-12',
//   },
//   {
//     slug: 'insert-capsule-in-page',
//     title: '将胶囊插入文稿',
//     intro:
//       '在文稿列表页，点击右上角的按钮可新建一片文稿在文稿列表页，向右滑动一片文稿可快速实现删除...',
//     updateAt: '2021-11-12',
//   },
//   {
//     slug: 'introduction-for-tags',
//     title: '标签功能介绍',
//     intro:
//       '在文稿列表页，点击右上角的按钮可新建一片文稿在文稿列表页，向右滑动一片文稿可快速实现删除...',
//     updateAt: '2021-11-12',
//   },
//   {
//     slug: 'introduction-for-markdown-usage',
//     title: 'Markdown功能介绍',
//     intro:
//       '在文稿列表页，点击右上角的按钮可新建一片文稿在文稿列表页，向右滑动一片文稿可快速实现删除...',
//     updateAt: '2021-11-12',
//   },
// ];

// const formatTime = (time: string): string => {
//   return time && '37天前 11月12日 下午8:30';
// };

const getPostUrl = (slug: string | string[]) => {
  if (isArr(slug)) {
    return `/posts/${slug.join('/')}`;
  } else {
    return `/posts/${slug}`;
  }
};

export const ArticleList = ({
  posts,
}: {
  posts: {
    data: any;
    content: any;
    slug: string | string[];
  }[];
}) => {
  return (
    <>
      {posts.map(
        ({ data: { title, desc, tag, updateAt, icon }, slug }, index) => {
          const isShowIntro = desc || tag;
          return (
            <div className={'group ' + styles['article-item']} key={index}>
              <Link href={getPostUrl(slug)}>
                <a className={styles['title'] + ' text-lg font-bold'}>
                  {title}
                </a>
              </Link>
              {isShowIntro && (
                <div className={styles['intro'] + ' sm:!max-h-0 sm:group-hover:!max-h-12'}>
                  {icon && <img className={styles['icon']} src={icon} />}
                  <span>{desc}</span> {tag && <Tags tags={tag} />}
                </div>
              )}
              <div className={styles['info'] + ' text-xs'}>{updateAt}</div>
            </div>
          );
        }
      )}
    </>
  );
};
