type HomeAboutHighlightIcon = "target" | "zap";

type HomeServiceIcon =
  | "trendingUp"
  | "barChart"
  | "monitor"
  | "users"
  | "globe"
  | "briefcase";

type HomeAboutHighlight = {
  icon: HomeAboutHighlightIcon;
  title: string;
  description: string;
};

type HomeService = {
  icon: HomeServiceIcon;
  title: string;
  description: string;
  features: string[];
};

type ServiceDetailsProcessStep = {
  step: string;
  title: string;
  description: string;
};

type HomePageData = {
  homePage: {
    home: {
      badge: string;
      title: string;
      description: string;
      primaryCta: {
        label: string;
        href: string;
      };
      secondaryCta: {
        label: string;
        href: string;
      };
      stats: Array<{
        value: string;
        label: string;
      }>;
      heroImage: {
        src: string;
        alt: string;
      };
      trustedBy: {
        avatars: string[];
        text: string;
      };
    };
    about: {
      badge: string;
      title: string;
      description: string;
      highlights: HomeAboutHighlight[];
      retention: {
        value: string;
        description: string;
      };
      images: Array<{
        src: string;
        alt: string;
        className: string;
      }>;
    };
    services: {
      badge: string;
      title: string;
      description: string;
      detailsDefaults: {
        description: string;
        features: string[];
        deliverables: string[];
        process: ServiceDetailsProcessStep[];
        outcomes: string[];
      };
      items: HomeService[];
    };
    portfolio: {
      badge: string;
      title: string;
      description: string;
      items: Array<{
        tag: string;
        title: string;
        description: string;
        imageSrc: string;
        imageAlt: string;
      }>;
    };
    team: {
      badge: string;
      title: string;
      joinLabel: string;
      members: Array<{
        linkedinUrl: string;
        name: string;
        role: string;
        imageSrc: string;
        imageAlt: string;
      }>;
    };
  };
};
