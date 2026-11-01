type AboutValueIcon = "award" | "shield" | "zap" | "users";

type AboutValue = {
  icon: AboutValueIcon;
  title: string;
  description: string;
};

type JourneyItem = {
  year: string;
  title: string;
  description: string;
  offsetClassName: string;
};

type StatKey = "clients" | "offices" | "experts" | "revenue";

type AboutStat = {
  key: StatKey;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  isCurrency: boolean;
};

type PresenceOffice = {
  city: string;
  type: string;
  address: string;
  phone: string;
};

type RecognitionIcon = "award" | "shield" | "target" | "zap";

type Recognition = {
  icon: RecognitionIcon;
  label: string;
};

type AboutData = {
  about: {
    values: AboutValue[];
    journey: JourneyItem[];
    stats: AboutStat[];
    presence: {
      heading: string;
      offices: PresenceOffice[];
    };
    recognitions: Recognition[];
  };
};
