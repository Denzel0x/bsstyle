type CaseStudy = {
  industry: string;
  slug: string;
  outcomeLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  details?: CaseStudyDetails;
};

type CaseStudyDetails = {
  breadcrumbLabel: string;
  categoryLabel: string;
  pageTitle: string;
  engagementBadges: { text: string }[]; // 3 items (duration, geography, award)
  challenge: {
    title: string;
    description: string;
    bullets: string[];
  };
  solution: {
    title: string;
    description: string;
    features: { title: string; description: string }[];
  };
  metrics: { value: string; label: string }[];
  timeline: { step: string; title: string; description: string }[];
  teamInvolved: {
    name: string;
    role: string;
    imageSrc: string;
    imageAlt: string;
    href?: string;
  }[];
  testimonial: { quote: string; name: string; role: string };
  gallery: { label: string; imageSrc: string; imageAlt: string }[];
  keyLearnings: { title: string; description: string }[];
  bottomCta: {
    title: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
};

type PortfolioData = {
  portfolio: {
    caseStudies: CaseStudy[];
  };
};
