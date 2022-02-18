import styles from './tags.module.css';

export const Tag = (props: { tag: string, onTagClick?: (tagName: string) => void }) => {
  const onClick = () => {
    props.onTagClick?.(props.tag)
  }
  return <span className={styles.tag} onClick={onClick}>{props.tag}</span>;
};