import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Zap,
  Coins,
  Droplets,
  Shield,
  Server,
  ArrowLeftRight,
  BookOpen,
  Search,
  ExternalLink,
  Library
} from 'lucide-react';
import { Badge } from '../components/common';
import styles from './ResourcesPage.module.css';

// Resource data structure
const RESOURCES = {
  desktopWallets: {
    title: 'Desktop Wallets',
    icon: Monitor,
    description: 'Full-featured Bitcoin wallets for desktop computers',
    resources: [
      {
        name: 'Sparrow Wallet',
        url: 'https://sparrowwallet.com',
        description: 'Full-featured desktop wallet with advanced coin control and privacy features.',
        tags: ['Desktop'],
        icon: Monitor,
        favorite: true
      },
      {
        name: 'Nunchuk',
        url: 'https://nunchuk.io',
        description: 'Collaborative multisig wallet for desktop with assisted key management.',
        tags: ['Desktop', 'Mobile'],
        icon: Shield
      }
    ]
  },
  mobileWallets: {
    title: 'Mobile Wallets',
    icon: Smartphone,
    description: 'Bitcoin wallets for iOS and Android devices',
    resources: [
      {
        name: 'Bull Wallet',
        url: 'https://wallet.bullbitcoin.com',
        description: 'Self-custody mobile wallet with hardware wallet support and Liquid integration.',
        tags: ['Mobile', 'Liquid'],
        favorite: true,
        icon: Smartphone
      },
      {
        name: 'Blue Wallet',
        url: 'https://bluewallet.io',
        description: 'Easy-to-use mobile wallet with Watch-only support.',
        tags: ['Mobile'],
        icon: Smartphone
      },
      {
        name: 'Nunchuk',
        url: 'https://nunchuk.io',
        description: 'Collaborative multisig wallet for mobile with assisted key management and support for NFC.',
        tags: ['Desktop', 'Mobile'],
        icon: Shield
      },
      {
        name: 'Bitcoin Keeper',
        url: 'https://bitcoinkeeper.app',
        description: 'Mobile wallet with multisig support, hardware wallet integration, and advanced privacy features.',
        tags: ['Mobile'],
        icon: Shield
      }
    ]
  },
  lightningWallets: {
    title: 'Lightning Wallets',
    icon: Zap,
    description: 'Wallets focused on Lightning Network payments',
    resources: [
      {
        name: 'Phoenix',
        url: 'https://phoenix.acinq.co',
        description: 'Self-custodial Lightning wallet with automatic channel management.',
        tags: ['Lightning', 'Mobile'],
        icon: Zap
      },
      {
        name: 'Zeus',
        url: 'https://zeusln.com',
        description: 'Mobile wallet for managing your Lightning node and on-chain funds.',
        tags: ['Lightning', 'Mobile'],
        icon: Zap
      }
    ]
  },
  ecashWallets: {
    title: 'Ecash Wallets',
    icon: Coins,
    description: 'Cashu ecash wallets for private payments',
    resources: [
      {
        name: 'Macadamia',
        url: 'https://macadamia.cash',
        description: 'Cashu ecash wallet with focus on privacy and ease of use.',
        tags: ['Ecash', 'Mobile'],
        icon: Coins
      },
      {
        name: 'Minibits',
        url: 'https://minibits.cash',
        description: 'Cashu ecash wallet for private payments.',
        tags: ['Ecash', 'Mobile'],
        icon: Coins
      },
      {
        name: 'Cashu.me',
        url: 'https://Cashu.me',
        description: 'Progressive Web App Cashu wallet with built-in mint discovery.',
        tags: ['Ecash', 'Mobile'],
        icon: Coins
      },
      {
        name: 'Fedi',
        url: 'https://fedi.xyz',
        description: 'Fedimint-based community custody wallet with ecash and Lightning support.',
        tags: ['Ecash', 'Mobile', 'Lightning'],
        icon: Coins
      }
    ]
  },
  liquidWallets: {
    title: 'Liquid Wallets',
    icon: Droplets,
    description: 'Wallets supporting the Liquid Network sidechain',
    resources: [
      {
        name: 'Bull Wallet',
        url: 'https://wallet.bullbitcoin.com',
        description: 'Self-custody mobile wallet with hardware wallet support and Liquid integration.',
        tags: ['Mobile', 'Liquid'],
        favorite: true,
        icon: Smartphone
      },
      {
        name: 'Blockstream Wallet',
        url: 'https://blockstream.com/green',
        description: 'Multi-platform wallet supporting Bitcoin and Liquid Network.',
        tags: ['Liquid', 'Mobile', 'Desktop'],
        icon: Droplets
      },
      {
        name: 'AQUA Wallet',
        url: 'https://aquawallet.io',
        description: 'Mobile wallet for Liquid Network with focus on UX.',
        tags: ['Liquid', 'Mobile'],
        icon: Droplets
      }
    ]
  },
  hardware: {
    title: 'Hardware Wallets',
    icon: Shield,
    description: 'Physical devices for secure Bitcoin key storage',
    resources: [
      {
        name: 'Coldcard',
        url: 'https://coldcard.com',
        description: 'Air-gapped Bitcoin hardware wallet with advanced security features.',
        tags: ['Air-gapped'],
        favorite: true,
        icon: Shield
      },
      {
        name: 'BitBox02',
        url: 'https://bitbox.swiss',
        description: 'Swiss-made hardware wallet with Bitcoin-only edition.',
        tags: ['Bitcoin-only'],
        icon: Shield
      },
      {
        name: 'Blockstream Jade',
        url: 'https://blockstream.com/jade',
        description: 'Budget-friendly hardware wallet with QR air-gapped signing.',
        tags: ['Air-gapped', 'Budget'],
        icon: Shield
      },
      {
        name: 'Tapsigner',
        url: 'https://tapsigner.com',
        description: 'NFC card for secure Bitcoin key storage in your wallet.',
        tags: ['NFC', 'Budget'],
        icon: Shield
      },
      {
        name: 'Foundation Passport',
        url: 'https://foundation.xyz/passport',
        description: 'Open-source, air-gapped hardware wallet with a beautiful interface.',
        tags: ['Air-gapped'],
        icon: Shield
      },
      {
        name: 'Trezor Safe 7',
        url: 'https://trezor.io/trezor-safe-7',
        description: 'Bitcoin-only edition hardware wallet with secure element and touchscreen.',
        tags: ['Bitcoin-only'],
        icon: Shield
      }
    ]
  },
  nodes: {
    title: 'Node Software',
    icon: Server,
    description: 'Run your own Bitcoin node for sovereignty and privacy',
    resources: [
      {
        name: 'Start9',
        url: 'https://start9.com',
        description: 'Sovereign computing platform for running Bitcoin and other services.',
        tags: ['Node'],
        icon: Server,
        favorite: true
      },
      {
        name: 'Umbrel',
        url: 'https://umbrel.com',
        description: 'User-friendly home server for Bitcoin, Lightning, and apps.',
        tags: ['Node'],
        icon: Server
      },
      {
        name: 'Bitcoin Core',
        url: 'https://bitcoincore.org',
        description: 'The reference implementation of the Bitcoin protocol.',
        tags: ['Node', 'Reference'],
        icon: Server
      }
    ]
  },
  exchanges: {
    title: 'Exchanges & Services',
    icon: ArrowLeftRight,
    description: 'Buy, sell, and trade Bitcoin',
    resources: [
      {
        name: 'Bull Bitcoin',
        url: 'https://bullbitcoin.com',
        description: 'Canadian non-custodial Bitcoin exchange with focus on self-custody.',
        tags: ['Exchange', 'Canada'],
        icon: ArrowLeftRight,
        favorite: true
      },
      {
        name: 'Strike',
        url: 'https://strike.me',
        description: 'Lightning-native app for sending money globally.',
        tags: ['Exchange', 'Global', 'Lightning'],
        icon: Zap,
        favorite: true
      },
      {
        name: 'River Financial',
        url: 'https://river.com',
        description: 'US-based Bitcoin exchange with Lightning withdrawals.',
        tags: ['Exchange', 'US', 'Lightning'],
        icon: ArrowLeftRight
      },
      {
        name: 'Bisq 2',
        url: 'https://bisq.network',
        description: 'Decentralized peer-to-peer Bitcoin exchange.',
        tags: ['P2P'],
        icon: ArrowLeftRight
      },
      {
        name: 'RoboSats',
        url: 'https://learn.robosats.org',
        description: 'Private peer-to-peer Bitcoin exchange over Lightning and Tor.',
        tags: ['P2P'],
        icon: Zap
      },
      {
        name: 'Hodl Hodl',
        url: 'https://hodlhodl.com',
        description: 'Non-custodial peer-to-peer Bitcoin trading platform.',
        tags: ['P2P'],
        icon: ArrowLeftRight
      }
    ]
  },
  education: {
    title: 'Educational Resources',
    icon: BookOpen,
    description: 'Learn about Bitcoin from trusted sources',
    resources: [
      {
        name: 'BTC Sessions',
        url: 'https://youtube.com/@BTCSessions',
        description: 'Video tutorials covering wallets, nodes, Lightning, and privacy.',
        tags: ['Video', 'Tutorials'],
        icon: BookOpen,
        favorite: true
      },
      {
        name: 'Bitcoin.org',
        url: 'https://bitcoin.org',
        description: 'Official Bitcoin resource with guides, documentation, and wallet info.',
        tags: ['Reference'],
        icon: BookOpen
      },
      {
        name: 'Nakamoto Institute',
        url: 'https://nakamotoinstitute.org',
        description: 'Literature and research on Bitcoin, cryptography, and Austrian economics.',
        tags: ['Literature', 'History'],
        icon: Library
      }
    ]
  },
  books: {
    title: 'Books & Technical Reading',
    icon: Library,
    description: 'Deep dive into Bitcoin with these essential books',
    resources: [
      {
        name: 'Mastering Bitcoin',
        url: 'https://github.com/bitcoinbook/bitcoinbook',
        description: 'Andreas Antonopoulos\'s comprehensive technical guide to Bitcoin (free online).',
        tags: ['Technical'],
        icon: BookOpen
      },
      {
        name: 'Bitcoin Whitepaper',
        url: 'https://bitcoin.org/bitcoin.pdf',
        description: 'Satoshi Nakamoto\'s original Bitcoin whitepaper from 2008.',
        tags: ['Documentation'],
        icon: BookOpen
      }
    ]
  },
  explorers: {
    title: 'Block Explorers',
    icon: Search,
    description: 'Explore the Bitcoin blockchain and mempool',
    resources: [
      {
        name: 'Mempool.space',
        url: 'https://mempool.space',
        description: 'Open-source block explorer with mempool visualization and fee estimation.',
        tags: ['Block Explorer'],
        icon: Search
      },
      {
        name: 'Timechain Calendar',
        url: 'https://timechaincalendar.com',
        description: 'Unique visualization of Bitcoin blocks as a calendar.',
        tags: ['Visualization'],
        icon: Search
      }
    ]
  }
};

const getTagVariant = (tag) => {
  const tagLower = tag.toLowerCase();
  
  if (tagLower === 'desktop') return 'info';
  if (tagLower === 'mobile') return 'success';
  if (tagLower === 'lightning') return 'warning';
  if (tagLower === 'ecash') return 'purple';
  if (tagLower === 'liquid') return 'cyan';
  if (tagLower.includes('node')) return 'node';
  if (tagLower === 'exchange') return 'exchange';
  if (tagLower === 'p2p') return 'purple';
  
  return 'default';
};

function ResourceCard({ resource, index }) {
  const Icon = resource.icon;
  const cardClasses = [styles.card, resource.favorite && styles.cardFavorite].filter(Boolean).join(' ');

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.03,
        ease: 'easeOut'
      }}
    >
      {resource.favorite && (
        <span className={styles.favoriteBadge}>Recommended</span>
      )}
      
      {/* Desktop Grid Layout */}
      <div className={styles.desktopLayout}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <Icon size={16} />
          </div>
          <ExternalLink size={14} className={styles.externalIcon} />
        </div>
        
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{resource.name}</h3>
          <p className={styles.cardDescription}>{resource.description}</p>
        </div>

        <div className={styles.cardTags}>
          {resource.tags.map((tag) => (
            <Badge key={tag} variant={getTagVariant(tag)} size="small">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileLeft}>
          <div className={styles.cardIcon}>
            <Icon size={18} />
          </div>
          <div className={styles.mobileTitleGroup}>
            <h3 className={styles.cardTitle}>
              {resource.name}
              {resource.favorite && <span className={styles.favoriteBadgeMobile}>Recommended</span>}
            </h3>
          </div>
        </div>
        
        <p className={styles.mobileDescription}>{resource.description}</p>

        <div className={styles.mobileRight}>
          <div className={styles.cardTags}>
            {resource.tags.map((tag) => (
              <Badge key={tag} variant={getTagVariant(tag)} size="small">
                {tag}
              </Badge>
            ))}
          </div>
          <ExternalLink size={14} className={styles.externalIcon} />
        </div>
      </div>
    </motion.a>
  );
}

function ResourceSection({ section, sectionId, isFirst }) {
  const SectionIcon = section.icon;

  return (
    <motion.section
      id={sectionId}
      className={styles.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.4,
        ease: 'easeOut'
      }}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <SectionIcon size={14} />
          <span>{section.title}</span>
        </div>
        <p className={styles.sectionDescription}>{section.description}</p>
      </div>

      <div className={styles.resourceGrid}>
        {section.resources.map((resource, index) => (
          <ResourceCard key={resource.name} resource={resource} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

export function ResourcesPage() {
  const location = useLocation();

  // Handle hash navigation - scroll to section when URL has hash
  useEffect(() => {
    if (location.hash) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [location.hash]);

  const sectionKeys = Object.keys(RESOURCES);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Badge variant="primary" size="medium" icon={<Library size={14} />}>
          Bitcoin-Only Resources
        </Badge>
        
        <h1 className={styles.heroTitle}>
          Bitcoin <span className={styles.heroHighlight}>Resources</span>
        </h1>
        
        <p className={styles.heroText}>
          A curated collection of Bitcoin-only wallets, hardware, node software, exchanges, 
          educational content, and tools.
        </p>
      </motion.section>

      {/* Resource Sections */}
      <div className={styles.sections}>
        {sectionKeys.map((key, index) => (
          <ResourceSection 
            key={key}
            section={RESOURCES[key]} 
            sectionId={key}
            isFirst={index === 0}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        className={styles.disclaimer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <p>
          <strong>Disclaimer:</strong> These resources are provided for educational purposes. 
          Always do your own research (DYOR) before using any service or product.
        </p>
      </motion.div>
    </div>
  );
}

export default ResourcesPage;
