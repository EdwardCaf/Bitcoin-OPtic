import { Link } from 'react-router-dom';
import { Library, ChevronRight } from 'lucide-react';
import styles from './ResourceLinkCard.module.css';

/**
 * A card component that links to a specific section of the Resources page.
 * Uses the same cyan color scheme as the Resources link in the sidebar.
 * 
 * @param {string} section - The section ID to link to (e.g., "lightningWallets")
 * @param {string} title - The display title (e.g., "Lightning Wallets")
 */
export function ResourceLinkCard({ section, title }) {
  return (
    <Link 
      to={`/resources#${section}`}
      className={styles.card}
    >
      <div className={styles.iconWrapper}>
        <Library size={20} />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>Explore Resources</span>
        <span className={styles.title}>{title}</span>
      </div>
      <ChevronRight size={20} className={styles.arrow} />
    </Link>
  );
}

export default ResourceLinkCard;
