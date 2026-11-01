type Leader = {
  name: string;
  slug: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: string;
  badges: string[];
  profileDetails?: TeamProfileDetails;
};

type Specialist = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  tags: Array<{
    label: string;
    bgTextClassName: string;
  }>;
  slug?: string;
  profileDetails?: TeamProfileDetails;
};

type TeamData = {
  team: {
    leaders: Leader[];
    specialists: Specialist[];
  };
};

type TeamProfileDetails = {
  heroChip: string;
  heroTitle: string;
  heroSubtitle: string;
  shortBio: string;
  socialLinks: { linkedinHref: string; twitterHref: string };
  scheduleHref: string;
  scheduleLabel: string;

  biography: string[];
  expertise: { title: string; percent: number }[];
  careerJourney: {
    period: string;
    title: string;
    role: string;
    description: string;
  }[];

  academicFoundations: { title: string; subtitle: string; icon: AcademicIcon }[];
  notableImpact: {
    category: string;
    title: string;
    description: string;
  }[];

  directContact: { email: string; phone: string; location: string };

  clientVoice: { quote: string; name: string; role: string; imageSrc: string }[];

  bottomCta: { title: string; description: string; href: string; buttonLabel: string };
};

type AcademicIcon = "graduation-cap" | "book-open" | "landmark";
