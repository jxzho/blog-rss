import styles from './tags.module.css';

const Tag = (props: { tag: string }) => {
  return <span className={styles.tag}>{props.tag}</span>;
};

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
