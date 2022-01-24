import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkRehype from 'remark-rehype';
//@ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import rehypeStringify from 'rehype-stringify'

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown)
  return result.toString()
};
