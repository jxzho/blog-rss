import { useRouter } from 'next/router';
import styles from './icon-home.module.css';

export const IconHome = () => {
  const router = useRouter();
  const goHome = () => router.push('/');
  return (
    <div className={styles.iconHome}>
      <svg
        onClick={goHome}
        className="icon-home"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#847469" stopOpacity={1} />
            <stop offset="100%" stopColor="#bdaca1" stopOpacity={1} />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad1)"
          d="M512 32L0 544l96 96 96-96v416h256V768h128v192h256V544l96 96 96-96L512 32zm0 416a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
        />
      </svg>
    </div>
  );
};
