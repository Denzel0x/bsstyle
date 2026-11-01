//============================== Schedule Page Types ==============================//
type OverviewHighlightIcon = "trendingUp" | "shield";

type OverviewHighlight = {
  icon: OverviewHighlightIcon;
  title: string;
  description: string;
};

type OverviewData = {
  paragraphs: string[];
  highlights: OverviewHighlight[];
  deliverables: string[];
};

type PackageFeature = {
  text: string;
  included: boolean;
};

type EngagementPackage = {
  id: string;
  name: string;
  description: string;
  priceMain: string;
  priceSuffix: string;
  isFeatured: boolean;
  badgeText: string;
  features: PackageFeature[];
  ctaLabel: string;
};

type ServicesData = {
  services: {
    overview: OverviewData;
    engagementPackages: {
      heading: string;
      items: EngagementPackage[];
    };
  };
};

//============================== Schedule Page Types ==============================//
type MeetingFormat = "virtual" | "in-person";

type ConfirmedQuery = {
  id: string;
  consultant: string;
  day: string;
  time: string;
  format: MeetingFormat;
};

type MeetingFormat = "virtual" | "in-person";

type ServiceScheduleState = {
  selectedConsultant?: string;
  setSelectedConsultant: (name: string) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  meetingFormat: MeetingFormat;
  setMeetingFormat: (format: MeetingFormat) => void;
  notes: string;
  setNotes: (notes: string) => void;
};

type BookingConfirmedViewModel = {
  service: ReturnType<typeof requireServiceBySlug>;
  teamData: TeamData["team"];
  confirmationId: string;
  consultantName: string;
  consultant?: TeamData["team"]["leaders"][number];
  dateLabel: string;
  timeRangeLabel: string;
  meetingFormat: MeetingFormat;
  meetingLink: string;
  rescheduleHref: string;
};
