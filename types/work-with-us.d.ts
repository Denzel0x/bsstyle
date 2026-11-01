type JobOpening = {
  id: string;
  category: string;
  categoryColor: string;
  details: string;
  title: string;
  description: string;
};

type JourneyStep = {
  step: string;
  title: string;
  description: string;
};

type BenefitIcon = "stethoscope" | "graduationCap" | "coffee" | "chartBar";

type BenefitItem = {
  icon: BenefitIcon;
  title: string;
  description: string;
};

type OpeningDetailContent = {
  qualifications: string[];
  responsibilities: string[];
  applicationSteps: string[];
};

type WorkWithUsData = {
  workWithUs: {
    openings: JobOpening[];
    openingDetails: Record<string, OpeningDetailContent>;
    journey: JourneyStep[];
    benefits: BenefitItem[];
  };
};
