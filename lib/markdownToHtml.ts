import { remark } from 'remark'
import remarkHtml from 'remark-html'

export const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(remarkHtml).process(markdown)
  return result.toString()
}