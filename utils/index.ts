import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const isDir = (path: string) => fs.statSync(path).isDirectory();

const postDir = join(process.cwd(), '_blogs');

const postSuffixByType = {
  markdown: 'md'
}

export const getPostBySlug = (slug: string[]) => {
  const path4Slug = join(postDir, ...slug) + '.' + postSuffixByType.markdown;
  const fileContents = fs.readFileSync(path4Slug, 'utf-8');
  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
};

export const getFiles = (
  basePath: string,
  res: string[] = []
): any => {
  const subdirs = fs.readdirSync(basePath);
  const files = subdirs.map((item) => {
    const curPath = join(basePath, item);
    const itemRmSuffix = /(.+)\.[^.]+/g.exec(item)?.[1] || item;
    const curRes = res.concat(itemRmSuffix)
    if (isDir(curPath)) {
      return getFiles(curPath, curRes);
    } else {
      return curRes;
    }
  });
  return res.length === 0 ? files : files.flat();
};

export const getAllPosts = () => {
  const posts = getFiles(postDir);
  const realPosts = posts.map((item) => {
    const slug = Array.isArray(item) ? item : [item];
    const postMatter = getPostBySlug(slug);
    return {
      ...postMatter,
      slug,
    };
  });
  return realPosts;
};
