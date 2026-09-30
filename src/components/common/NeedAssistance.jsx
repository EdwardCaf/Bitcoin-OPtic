import { Link } from 'react-router-dom';
import { Handshake, ArrowRight } from 'lucide-react';
import styles from './NeedAssistance.module.css';

export function NeedAssistance({ tagline, className = '' }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Handshake size={20} />
        </div>
        <div className={styles.text}>
          <span className={styles.title}>Need Assistance?</span>
          <span className={styles.tagline}>{tagline}</span>
        </div>
      </div>
      <Link to="/support" className={styles.button}>
        <span>Get Help</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default NeedAssistance;
