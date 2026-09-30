import styles from './StatsSection.module.css';

const STATS = [
  { value: '12', label: 'Visual Lessons' },
  { value: '40+', label: 'Concepts Covered' },
  { value: '30+', label: 'Visualizations' },
  { value: '100%', label: 'Free' },
];

export function StatsSection() {
  return (
    <section className={styles.container} aria-label="Learning at a glance">
      <dl className={styles.grid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <dt className={styles.label}>{stat.label}</dt>
            <dd className={styles.value}>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default StatsSection;
