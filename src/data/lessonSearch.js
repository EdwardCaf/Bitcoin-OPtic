import {
  Wallet,
  Archive,
  ArrowLeftRight,
  Coins,
  EyeOff,
  Key,
  Pickaxe,
  Blocks,
  Network,
  Server,
  Zap,
  Droplets,
  CircleDollarSign,
  Bitcoin,
} from 'lucide-react';

const buildSections = (sections) =>
  sections.map((section) => ({
    ...section,
    keywords: section.keywords ?? [],
  }));

export const lessonSections = [
  {
    id: 'fundamentals',
    title: 'Self-Custody',
    lessons: [
      {
        id: 'what-is-bitcoin',
        title: 'What is Bitcoin?',
        icon: Bitcoin,
        path: '/lessons/what-is-bitcoin',
        description: 'A plain-English overview of Bitcoin and why it exists.',
        keywords: ['bitcoin basics', 'self-custody', 'sound money', 'fixed supply', 'private keys', 'consensus', 'permissionless', 'borderless'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['bitcoin basics', 'digital money', 'self custody'] },
          { id: 'understanding', title: 'Understanding Bitcoin', keywords: ['why bitcoin', 'shared ledger', 'permissionless', 'censorship resistance'] },
          { id: 'properties', title: 'Key Properties', keywords: ['fixed supply', 'scarcity', 'durability', 'divisibility', 'portability'] },
          { id: 'start', title: 'Getting Started', keywords: ['how to start', 'first steps', 'learn bitcoin'] },
        ]),
      },
      {
        id: 'wallets',
        title: 'Wallets',
        icon: Wallet,
        path: '/lessons/wallets',
        description: 'Learn how Bitcoin wallets, keys, addresses, and signing work.',
        keywords: ['wallet', 'wallets', 'private key', 'public key', 'address', 'seed phrase', 'xpub', 'signer', 'coordinator'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['wallet basics', 'what is a wallet'] },
          { id: 'keys', title: 'Keys & Addresses', keywords: ['private key', 'public key', 'address', 'signing'] },
          { id: 'types', title: 'Address Types', keywords: ['taproot', 'segwit', 'legacy', 'address formats'] },
          { id: 'hd', title: 'HD Wallets & Seeds', keywords: ['seed phrase', 'mnemonic', 'derivation', 'hd wallet'] },
          { id: 'wallet-types', title: 'Hot vs Cold Wallets', keywords: ['hot wallet', 'cold wallet', 'hardware wallet', 'mobile wallet'] },
          { id: 'coordinators', title: 'Coordinators & Signers', keywords: ['signer', 'coordinator', 'multisig software', 'xpub'] },
        ]),
      },
      {
        id: 'backups',
        title: 'Backups',
        icon: Archive,
        path: '/lessons/backups',
        description: 'Protect recovery data with strong backup and inheritance practices.',
        keywords: ['backup', 'backups', 'recovery', 'seed backup', 'passphrase', 'inheritance', 'multisig backup', 'storage', 'bip85', 'bip-85', 'coldcard', 'derived seeds'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['backup basics', 'recovery plan'] },
          { id: 'seed-backups', title: 'Seed Backups', keywords: ['seed backup', 'mnemonic backup', 'metal backup'] },
          { id: 'derived-seeds', title: 'Derived Seeds', keywords: ['bip85', 'bip-85', 'coldcard', 'derived seeds', 'child seeds', 'deterministic entropy', 'hot wallet seeds'] },
          { id: 'passphrases', title: 'Passphrases', keywords: ['bip39 passphrase', '25th word', 'duress wallet'] },
          { id: 'multisig', title: 'Multisig', keywords: ['multisig backup', 'distributed backups', 'quorum recovery'] },
          { id: 'inheritance', title: 'Inheritance', keywords: ['inheritance', 'estate planning', 'family recovery'] },
        ]),
      },
      {
        id: 'transactions',
        title: 'Transactions',
        icon: ArrowLeftRight,
        path: '/lessons/transactions',
        description: 'Learn how Bitcoin transactions work from UTXOs to fees.',
        keywords: ['transaction', 'transactions', 'utxo', 'inputs', 'outputs', 'change', 'fees', 'confirmation'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['transaction basics', 'how transactions work'] },
          { id: 'utxos', title: 'Understanding UTXOs', keywords: ['utxo', 'unspent transaction output', 'coins'] },
          { id: 'building', title: 'Building Transactions', keywords: ['inputs', 'outputs', 'change address', 'transaction builder'] },
          { id: 'fees', title: 'Transaction Fees', keywords: ['fees', 'feerate', 'confirmation speed', 'miner fee'] },
        ]),
      },
    ],
  },
  {
    id: 'advanced-custody',
    title: 'Advanced Custody',
    lessons: [
      {
        id: 'utxo-management',
        title: 'UTXO Management',
        icon: Coins,
        path: '/lessons/utxo-management',
        description: 'Manage coin selection, consolidation, and dust for better wallet hygiene.',
        keywords: ['utxo management', 'coin selection', 'consolidation', 'dust', 'wallet hygiene', 'privacy', 'fees'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['utxo management basics', 'fragmentation'] },
          { id: 'consolidation', title: 'UTXO Consolidation', keywords: ['consolidation', 'merge utxos', 'low fee period'] },
          { id: 'coin-selection', title: 'Coin Selection', keywords: ['coin selection', 'manual coin control', 'spend strategy'] },
          { id: 'dust', title: 'Managing Dust', keywords: ['dust', 'small outputs', 'uneconomic utxos'] },
        ]),
      },
      {
        id: 'privacy',
        title: 'Privacy',
        icon: EyeOff,
        path: '/lessons/privacy',
        description: 'Understand common Bitcoin privacy leaks and practical defenses.',
        keywords: ['privacy', 'address reuse', 'coin control', 'chain analysis', 'network privacy', 'tracking', 'surveillance'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['bitcoin privacy basics', 'public ledger'] },
          { id: 'reuse', title: 'Address Reuse', keywords: ['address reuse', 'reuse risk', 'linkability'] },
          { id: 'analysis', title: 'Chain Analysis', keywords: ['chain analysis', 'clustering', 'surveillance'] },
          { id: 'coinjoin', title: 'CoinJoin', keywords: ['coinjoin', 'mixing', 'collaborative transaction'] },
          { id: 'liquid-pegs', title: 'Liquid Peg Privacy', keywords: ['liquid privacy', 'peg privacy', 'confidential transactions'] },
          { id: 'practices', title: 'Best Practices', keywords: ['best practices', 'coin control', 'privacy tips'] },
        ]),
      },
      {
        id: 'multisig',
        title: 'Multi-Signature',
        icon: Key,
        path: '/lessons/multisig',
        description: 'Explore multisig security tradeoffs, setups, and recovery paths.',
        keywords: ['multisig', 'multi-signature', '2-of-3', 'keys', 'recovery', 'custody setup', 'shared custody'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['multisig basics', 'shared custody'] },
          { id: 'how-it-works', title: 'How It Works', keywords: ['m of n', 'quorum', 'spending policy'] },
          { id: 'configurations', title: 'Configurations', keywords: ['2 of 3', '3 of 5', 'multisig setup'] },
          { id: 'key-management', title: 'Key Management', keywords: ['key management', 'key storage', 'device separation'] },
          { id: 'best-practices', title: 'Best Practices', keywords: ['multisig best practices', 'operational security'] },
        ]),
      },
    ],
  },
  {
    id: 'protocol',
    title: 'Protocol',
    lessons: [
      {
        id: 'mining',
        title: 'Mining',
        icon: Pickaxe,
        path: '/lessons/mining',
        description: 'See how miners secure Bitcoin and compete to produce blocks.',
        keywords: ['mining', 'miner', 'proof of work', 'hash', 'difficulty', 'nonce', 'halving'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['mining basics', 'miners'] },
          { id: 'hashing', title: 'Hash Functions', keywords: ['hash', 'sha-256', 'hash function'] },
          { id: 'puzzle', title: 'The Mining Puzzle', keywords: ['difficulty', 'nonce', 'target', 'proof of work'] },
          { id: 'rewards', title: 'Block Rewards', keywords: ['block subsidy', 'halving', 'miner rewards', 'fees'] },
        ]),
      },
      {
        id: 'blocks',
        title: 'Blocks',
        icon: Blocks,
        path: '/lessons/blocks',
        description: 'Learn how Bitcoin blocks package transactions and extend the chain.',
        keywords: ['blocks', 'block', 'block header', 'merkle tree', 'confirmations', 'blockchain'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['block basics', 'blockchain basics'] },
          { id: 'structure', title: 'Block Structure', keywords: ['block header', 'transactions', 'timestamp'] },
          { id: 'merkle', title: 'Merkle Trees', keywords: ['merkle tree', 'merkle root', 'proofs'] },
          { id: 'immutability', title: 'Immutability', keywords: ['immutability', 'tamper evident', 'hash links'] },
        ]),
      },
      {
        id: 'network',
        title: 'Network',
        icon: Network,
        path: '/lessons/network',
        description: 'Understand how nodes communicate and maintain Bitcoin consensus.',
        keywords: ['network', 'nodes', 'peer-to-peer', 'consensus', 'forks', 'propagation', 'validation'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['network basics', 'peer to peer'] },
          { id: 'nodes', title: 'Node Types', keywords: ['full node', 'light client', 'node types'] },
          { id: 'propagation', title: 'Network Propagation', keywords: ['transaction propagation', 'block propagation', 'relay'] },
          { id: 'consensus', title: 'Consensus', keywords: ['consensus', 'validation rules', 'agreement'] },
          { id: 'forks', title: 'Hard & Soft Forks', keywords: ['hard fork', 'soft fork', 'upgrade path'] },
        ]),
      },
      {
        id: 'running-a-node',
        title: 'Running a Node',
        icon: Server,
        path: '/lessons/running-a-node',
        description: 'Learn what changes when you verify Bitcoin for yourself.',
        keywords: ['running a node', 'full node', 'self verification', 'bitcoin core', 'wallet connection', 'electrum server'],
        sections: buildSections([
          { id: 'why', title: 'Why Run a Node?', keywords: ['why run a node', 'self verification', 'verify bitcoin'] },
          { id: 'setup', title: 'Node Setup Options', keywords: ['node setup', 'bitcoin core setup', 'umbrel', 'start9'] },
          { id: 'wallet', title: 'Connecting Your Wallet', keywords: ['wallet connection', 'electrum server', 'backend'] },
          { id: 'lightning', title: 'Lightning Node', keywords: ['lightning node', 'routing node', 'ln tools'] },
          { id: 'maintenance', title: 'Maintenance & Tradeoffs', keywords: ['maintenance', 'tradeoffs', 'disk space', 'bandwidth'] },
        ]),
      },
    ],
  },
  {
    id: 'layer2',
    title: 'Scaling',
    lessons: [
      {
        id: 'lightning',
        title: 'Lightning',
        icon: Zap,
        path: '/lessons/lightning',
        description: 'Explore fast Bitcoin payments with the Lightning Network.',
        keywords: ['lightning', 'lightning network', 'payment channels', 'routing', 'liquidity', 'instant payments'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['lightning basics', 'layer 2'] },
          { id: 'channels', title: 'Payment Channels', keywords: ['payment channel', 'channel open', 'channel close'] },
          { id: 'routing', title: 'Routing Payments', keywords: ['routing', 'multi-hop', 'payment path'] },
          { id: 'htlc', title: 'HTLCs', keywords: ['htlc', 'hash time locked contract', 'preimage'] },
          { id: 'invoices', title: 'Using Lightning', keywords: ['invoice', 'bolt11', 'payment request'] },
          { id: 'privacy', title: 'Privacy Benefits', keywords: ['lightning privacy', 'onion routing', 'payment privacy'] },
        ]),
      },
      {
        id: 'liquid',
        title: 'Liquid',
        icon: Droplets,
        path: '/lessons/liquid',
        description: 'Understand the Liquid sidechain and its tradeoffs.',
        keywords: ['liquid', 'sidechain', 'federation', 'confidential transactions', 'peg-in', 'peg-out'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['liquid basics', 'sidechain basics'] },
          { id: 'peg', title: 'Peg-In / Peg-Out', keywords: ['peg in', 'peg out', 'two way peg'] },
          { id: 'confidential', title: 'Confidential TX', keywords: ['confidential tx', 'confidential transactions', 'hidden amounts'] },
          { id: 'assets', title: 'Issued Assets', keywords: ['issued assets', 'asset issuance', 'tokens on liquid'] },
          { id: 'comparison', title: 'Trade-offs', keywords: ['tradeoffs', 'federation tradeoffs', 'liquid vs lightning'] },
        ]),
      },
      {
        id: 'ecash',
        title: 'eCash',
        icon: CircleDollarSign,
        path: '/lessons/ecash',
        description: 'See how Chaumian ecash and mints enable private digital cash.',
        keywords: ['ecash', 'chaumian ecash', 'mint', 'blind signatures', 'fedimint', 'cashu', 'privacy'],
        sections: buildSections([
          { id: 'intro', title: 'Introduction', keywords: ['ecash basics', 'chaumian ecash'] },
          { id: 'cashu', title: 'How Cashu Works', keywords: ['cashu', 'blind signatures', 'mint model'] },
          { id: 'privacy', title: 'Privacy & Trade-offs', keywords: ['privacy tradeoffs', 'custodial risk', 'unlinkability'] },
          { id: 'fedimint', title: 'Fedimint', keywords: ['fedimint', 'federated mint', 'community custody'] },
          { id: 'usecases', title: 'When to Use eCash', keywords: ['use cases', 'small payments', 'private spending'] },
        ]),
      },
    ],
  },
];

export const allLessons = lessonSections.flatMap((section) =>
  section.lessons.map((lesson) => ({
    ...lesson,
    sectionId: section.id,
    sectionTitle: section.title,
  }))
);

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const scoreLesson = (lesson, normalizedQuery, queryWords) => {
  const title = normalize(lesson.title);
  const description = normalize(lesson.description);
  const keywords = lesson.keywords.map(normalize);

  let score = 0;

  if (title === normalizedQuery) score += 120;
  if (title.startsWith(normalizedQuery)) score += 90;
  if (title.includes(normalizedQuery)) score += 60;
  if (keywords.some((keyword) => keyword === normalizedQuery)) score += 55;
  if (keywords.some((keyword) => keyword.includes(normalizedQuery))) score += 35;
  if (description.includes(normalizedQuery)) score += 20;

  const haystacks = [title, description, ...keywords];
  score += queryWords.filter((word) => haystacks.some((field) => field.includes(word))).length * 10;

  return score;
};

const scoreSection = (lesson, section, normalizedQuery, queryWords) => {
  const sectionTitle = normalize(section.title);
  const sectionKeywords = section.keywords.map(normalize);
  const lessonTitle = normalize(lesson.title);
  const haystacks = [lessonTitle, sectionTitle, ...sectionKeywords];

  let score = 0;

  if (sectionTitle === normalizedQuery) score += 130;
  if (sectionTitle.startsWith(normalizedQuery)) score += 100;
  if (sectionTitle.includes(normalizedQuery)) score += 70;
  if (sectionKeywords.some((keyword) => keyword === normalizedQuery)) score += 65;
  if (sectionKeywords.some((keyword) => keyword.includes(normalizedQuery))) score += 45;
  if (lessonTitle.includes(normalizedQuery)) score += 15;

  score += queryWords.filter((word) => haystacks.some((field) => field.includes(word))).length * 12;

  return score;
};

export function searchLessons(query) {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length < 2) {
    return [];
  }

  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);
  const results = [];

  allLessons.forEach((lesson) => {
    const lessonScore = scoreLesson(lesson, normalizedQuery, queryWords);

    if (lessonScore > 0) {
      results.push({
        type: 'lesson',
        id: lesson.id,
        title: lesson.title,
        subtitle: lesson.sectionTitle,
        description: lesson.description,
        path: lesson.path,
        score: lessonScore,
      });
    }

    lesson.sections.forEach((section) => {
      const sectionScore = scoreSection(lesson, section, normalizedQuery, queryWords);

      if (sectionScore > 0) {
        results.push({
          type: 'section',
          id: `${lesson.id}:${section.id}`,
          title: section.title,
          subtitle: lesson.title,
          description: lesson.sectionTitle,
          path: `${lesson.path}?section=${section.id}`,
          score: sectionScore,
        });
      }
    });
  });

  return results
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, 8);
}
