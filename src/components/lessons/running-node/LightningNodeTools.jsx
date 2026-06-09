import { AlertTriangle, Wrench, Zap } from 'lucide-react';
import { Badge, Card } from '../../common';
import styles from './LightningNodeTools.module.css';

const columns = [
  {
    title: 'Tools',
    icon: Wrench,
    items: [
      {
        title: 'Implementation',
        description: 'Software that manages channels and payments.',
        badges: ['LND', 'Core Lightning'],
      },
      {
        title: 'Management',
        description: 'Dashboards for peers, channels, invoices, and routing.',
        badges: ['ThunderHub', 'Ride The Lightning'],
      },
      {
        title: 'Mobile Control',
        description: 'Remote control for your node. Secure access carefully.',
        badges: ['Zeus'],
      },
    ],
  },
  {
    title: 'Responsibilities',
    icon: AlertTriangle,
    items: [
      {
        title: 'Liquidity',
        description: 'Balance inbound and outbound capacity for payments.',
      },
      {
        title: 'Channel Backups',
        description: 'Keep recovery material current and accessible.',
      },
      {
        title: 'Force Closes',
        description: 'Understand when channels close on-chain.',
      },
      {
        title: 'Uptime',
        description: 'More important than base-layer node uptime.',
      },
    ],
  },
];

export function LightningNodeTools() {
  return (
    <Card variant="elevated" padding="large" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Zap size={24} />
        </div>
        <div>
          <h3>Lightning Stack</h3>
          <p>Lightning adds useful tools, but also adds active operational duties.</p>
        </div>
      </div>

      <div className={styles.columns}>
        {columns.map((column) => {
          const ColumnIcon = column.icon;

          return (
            <section key={column.title} className={styles.column}>
              <div className={styles.columnHeader}>
                <div className={styles.columnIcon}>
                  <ColumnIcon size={18} />
                </div>
                <h4>{column.title}</h4>
              </div>

              <div className={styles.itemList}>
                {column.items.map((item) => {
                  return (
                    <div key={item.title} className={styles.item}>
                      <div className={styles.itemContent}>
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        {item.badges && (
                          <div className={styles.badges}>
                            {item.badges.map((badge) => (
                              <Badge key={badge} variant="outline" size="small">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </Card>
  );
}

export default LightningNodeTools;
