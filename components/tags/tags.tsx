import { Tag } from './tag'

export const Tags = (props: { tags: string[] | string }) => {
  const tags = props.tags;
  if (Array.isArray(tags)) {
    return (
      <>
        {tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </>
    );
  } else {
    return <Tag tag={tags} />;
  }
};
