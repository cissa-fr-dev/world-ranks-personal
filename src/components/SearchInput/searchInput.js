import SearchRounded from '@material-ui/icons/SearchRounded';
import styles from './searchInput.module.css';

export default function SearcInput({ ...rest }) {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} {...rest} />
    </div>
  );
}
