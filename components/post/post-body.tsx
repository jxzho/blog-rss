import styles from './markdown-styles.module.css';

export const PostBody = (props: { content: string }) => {
  return (
    <div className="post-body">
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{
          __html: props.content,
        }}
      />
    </div>
  );
};
