import type { Icon } from 'lucide-react';
import {
  LayoutDashboard,
  Building,
  FlaskConical,
  Lightbulb,
  Info,
  BrainCircuit,
  Bell,
  TestTube,
  Dna,
  Microscope,
} from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: Icon;
  match?: (pathname: string) => boolean;
};

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/companies', label: 'Company Methods', icon: Building },
  { href: '/alternatives', label: 'Alternative Methods', icon: Lightbulb },
  { href: '/analysis', label: 'Drawback Analysis', icon: FlaskConical },
  { href: '/info', label: 'Info Hub', icon: Info },
  { href: '/predict', label: 'Predict Risk', icon: BrainCircuit },
  { href: '/alerts', label: 'Alerts', icon: Bell },
];

export type Company = {
  id: string;
  name: string;
  logoUrl: string;
  methods: {
    title: string;
    icon: Icon;
    description: string;
    drawbacks: string[];
  }[];
};

export const companies: Company[] = [
  {
    id: 'mdh',
    name: 'MDH (Mahashian Di Hatti)',
    logoUrl: '/placeholder.svg',
    methods: [
      {
        title: 'Physical Purity Testing',
        icon: Microscope,
        description:
          'Visual inspection and microscopic analysis to detect foreign matter such as dust, stones, and other plant parts. Samples are sieved to separate impurities based on size.',
        drawbacks: [
          'Does not detect chemical adulterants or artificial colors.',
          'Labor-intensive and subject to human error.',
          'Ineffective against finely powdered adulterants of similar color and texture.',
        ],
      },
      {
        title: 'Chemical Spot Tests',
        icon: TestTube,
        description:
          'Use of chemical reagents to perform spot tests for common adulterants like Sudan dyes. For example, adding specific solvents can cause a color change if illegal dyes are present.',
        drawbacks: [
          'Only detects specific, known adulterants for which tests exist.',
          'Can produce false positives/negatives.',
          'Not a quantitative method; fails to determine the concentration of the adulterant.',
        ],
      },
    ],
  },
  {
    id: 'everest',
    name: 'Everest Food Products',
    logoUrl: '/placeholder.svg',
    methods: [
      {
        title: 'Microscopic Examination',
        icon: Microscope,
        description:
          'Detailed examination under a microscope to identify the cellular structure of chili powder versus common adulterants like sawdust or brick powder, which have distinct structures.',
        drawbacks: [
          'Requires skilled technicians to accurately identify structures.',
          'Not effective for soluble adulterants like artificial coloring agents.',
          'Time-consuming process for large batch testing.',
        ],
      },
      {
        title: 'Aflatoxin Level Testing',
        icon: TestTube,
        description:
          'Employing techniques like ELISA (Enzyme-Linked Immunosorbent Assay) to detect and quantify aflatoxin levels, ensuring they are within the limits set by FSSAI.',
        drawbacks: [
          'Specific to mycotoxins and does not detect other forms of adulteration.',
          'ELISA kits have a limited shelf life and require careful storage.',
        ],
      },
    ],
  },
  {
    id: 'catch',
    name: 'Catch Spices',
    logoUrl: '/placeholder.svg',
    methods: [
      {
        title: 'Moisture Content Analysis',
        icon: TestTube,
        description:
          'Using moisture analyzers to ensure the moisture content is below the regulatory threshold (typically <10%). High moisture can promote microbial growth.',
        drawbacks: [
          'Does not directly detect adulteration, but is a key quality parameter.',
          'Some adulterants may have similar moisture content to pure chili powder.',
        ],
      },
      {
        title: 'Ash Value Determination',
        icon: FlaskConical,
        description:
          'Measuring the total and acid-insoluble ash content. A high acid-insoluble ash value suggests the presence of mineral adulterants like sand, dirt, or brick powder.',
        drawbacks: [
          'Indirect method; high ash value can have other causes.',
          'Less effective for organic adulterants like sawdust or artificial dyes.',
          'Requires laboratory setup and several hours to complete.',
        ],
      },
    ],
  },
];

export type AlternativeMethod = {
  id: string;
  name: string;
  icon: Icon;
  description: string;
  advantages: string[];
  paperUrl: string;
};

export const alternativeMethods: AlternativeMethod[] = [
  {
    id: 'nir',
    name: 'Near-Infrared (NIR) Spectroscopy',
    icon: FlaskConical,
    description:
      'A rapid and non-destructive technique that uses the near-infrared region of the electromagnetic spectrum. It measures the absorption of light by the sample to create a unique "fingerprint" that can be compared against a library of pure samples to detect deviations caused by adulterants.',
    advantages: [
      'Extremely fast, providing results in seconds.',
      'Non-destructive, so the sample can be used after testing.',
      'Can detect multiple adulterants simultaneously.',
      'Requires minimal sample preparation.',
    ],
    paperUrl: 'https://doi.org/10.1016/j.foodcont.2018.06.015',
  },
  {
    id: 'hplc',
    name: 'High-Performance Liquid Chromatography (HPLC)',
    icon: TestTube,
    description:
      'A powerful analytical chemistry technique used to separate, identify, and quantify each component in a mixture. It is highly effective for detecting and quantifying specific chemical adulterants like illegal dyes (e.g., Sudan I-IV) with very high sensitivity and accuracy.',
    advantages: [
      'Highly sensitive and specific, able to detect trace amounts.',
      'Provides quantitative results (how much adulterant is present).',
      'Considered a "gold standard" for dye detection.',
    ],
    paperUrl: 'https://doi.org/10.1021/jf901032g',
  },
  {
    id: 'dna',
    name: 'DNA Barcoding',
    icon: Dna,
    description:
      'A molecular technique that uses a short, standardized genetic marker in an organism\'s DNA to identify it. In chili powder, it can detect the presence of plant-based adulterants (e.g., papaya seeds, other vegetable powders) by identifying DNA that does not belong to Capsicum annuum.',
    advantages: [
      'Extremely specific for identifying biological adulterants.',
      'Can detect adulterants even when they are finely powdered and visually indistinguishable.',
      'Can identify the exact species of the adulterant plant.',
    ],
    paperUrl: 'https://doi.org/10.1371/journal.pone.0123553',
  },
];

export const analysisData = {
  summary: 'Current industry methods, while foundational, often fall short in detecting sophisticated adulteration. They are frequently slow, labor-intensive, and lack the sensitivity to identify a wide range of chemical and biological contaminants at low concentrations. This creates a significant gap in food safety assurance.',
  recommendations: [
    {
      title: 'Adopt Rapid Screening Technologies',
      description: 'Integrate methods like NIR Spectroscopy at the point of receiving raw materials for quick and broad-spectrum screening of incoming batches. This provides a first line of defense against a wide array of potential adulterants.'
    },
    {
      title: 'Implement Confirmatory Testing',
      description: 'Use highly sensitive methods like HPLC and DNA Barcoding as confirmatory tests for batches flagged during screening. This "gold standard" approach ensures precise identification and quantification of contaminants.'
    },
    {
      title: 'Build a Centralized Spectral Library',
      description: 'Develop a national or industry-wide spectral library for pure chili varieties and known adulterants. This would greatly enhance the accuracy and reliability of spectroscopic methods across the industry.'
    }
  ]
};

export type InfoItem = {
  title: string;
  icon: Icon;
  content: string;
};

export const infoHubData: InfoItem[] = [
  {
    title: 'Common Adulterants',
    icon: FlaskConical,
    content: 'Adulterants include brick powder, sawdust, salt powder, talcum powder, and artificial colors like Sudan dyes. These are added to increase weight and enhance color, reducing costs for fraudulent producers.',
  },
  {
    title: 'Health Impacts',
    icon: FlaskConical,
    content: 'Consumption of adulterated chili powder can lead to severe health issues. Artificial dyes are carcinogenic (cancer-causing) and can damage the liver and kidneys. Mineral adulterants can cause gastrointestinal problems and long-term toxicity.',
  },
  {
    title: 'Regulatory Standards (FSSAI)',
    icon: Building,
    content: 'The Food Safety and Standards Authority of India (FSSAI) has set strict limits for quality parameters like moisture content, ash value, and the complete absence of artificial coloring agents in spices. Non-compliance can lead to severe penalties.',
  },
];

export const alertsData = [
    {
        id: '1',
        title: 'Import Batch from Guntur Flagged',
        description: 'A recent import batch from Guntur, Andhra Pradesh has been flagged for containing high levels of Sudan I dye. Authorities have seized the consignment.',
        timestamp: '2 hours ago',
        type: 'critical',
    },
    {
        id: '2',
        title: 'New FSSAI Guidelines Issued',
        description: 'FSSAI has issued new, stricter guidelines for aflatoxin limits in spices, effective from next quarter. All producers must update their testing protocols.',
        timestamp: '1 day ago',
        type: 'info',
    },
    {
        id: '3',
        title: 'Weather Patterns in Rajasthan May Affect Crop Quality',
        description: 'Unseasonal rains in major chili-growing regions of Rajasthan may lead to higher moisture content and fungal growth in the upcoming harvest.',
        timestamp: '3 days ago',
        type: 'warning',
    }
];


// Dashboard Data
export const dashboardData = {
  stats: [
    { name: 'High-Risk Batches', value: '12', change: '+5.2%' },
    { name: 'Common Adulterant', value: 'Sudan I Dye' },
    { name: 'Avg. Detection Rate', value: '92.5%', change: '-1.8%' },
    { name: 'Alerts This Week', value: '3' },
  ],
  adulterationByRegion: [
    { region: 'Guntur (AP)', risk: 85 },
    { region: 'Khammam (TS)', risk: 70 },
    { region: 'Byadgi (KA)', risk: 45 },
    { region: 'Ramnad (TN)', risk: 30 },
    { region: 'Jodhpur (RJ)', risk: 65 },
  ],
  incidentsOverTime: [
    { month: 'Jan', incidents: 5 },
    { month: 'Feb', incidents: 8 },
    { month: 'Mar', incidents: 6 },
    { month: 'Apr', incidents: 10 },
    { month: 'May', incidents: 12 },
    { month: 'Jun', incidents: 9 },
  ],
  riskLevelDistribution: [
    { level: 'Low', value: 45, fill: 'var(--color-chart-2)' },
    { level: 'Medium', value: 35, fill: 'var(--color-chart-3)' },
    { level: 'High', value: 20, fill: 'var(--color-chart-1)' },
  ],
};
