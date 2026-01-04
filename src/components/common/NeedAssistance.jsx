import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Handshake, ArrowRight } from 'lucide-react';
import styles from './NeedAssistance.module.css';

export function NeedAssistance({ tagline }) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
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
    </motion.div>
  );
}

export default NeedAssistance;
