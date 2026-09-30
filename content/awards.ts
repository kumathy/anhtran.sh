export type Award = {
  title: string;
  shortTitle?: string;
  period: string;
  link?: {
    label: string;
    href: string;
  };
  note?: string;
};

export const awards: Award[] = [
  {
    title: "Finalist @ Hack Atlantic 2026",
    period: "Sep 2026",
    link: { label: "Post", href: "https://lnkd.in/p/gbjBTQx9" },
  },
  {
    title: "1st @ UNB Research Expo Pitch Competition",
    shortTitle: "1st @ UNB Research Expo Pitch Comp",
    period: "Apr 2026",
    link: { label: "Post", href: "https://lnkd.in/p/gPPrPtF5" },
  },
  {
    title: "Impact Award @ RBC Student Pitch Competition",
    shortTitle: "Impact Award @ RBC Student Pitch Comp",
    period: "Mar 2026",
    link: { label: "Post", href: "https://lnkd.in/p/gxmdk_ah" },
  },
  {
    title: "AWS Certified Cloud Practitioner",
    period: "Jun 2025",
    link: {
      label: "Badge",
      href: "https://www.credly.com/badges/03af84e7-7f0c-47e8-9746-660b4ab09b66",
    },
  },
];
