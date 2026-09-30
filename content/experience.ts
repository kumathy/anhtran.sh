export type Role = {
  company: string;
  title: string;
  period: string;
  technologies: string[];
  href?: string;
  notes?: Note[];
};

export type Note = string | { text: string; items: string[] };

export const experience: Role[] = [
  {
    company: "Sonrai Security",
    title: "Junior SDET (Co-op)",
    period: "Sep 2025 - Apr 2026",
    technologies: [
      "Python",
      "Test Automation",
      "Regression Testing",
      "AWS",
      "GCP",
    ],
    href: "https://sonraisecurity.com/",
    notes: [
      "Automated 3 manual regression workflows in Python covering environment setup, CloudFormation deploys, and AWS Organizations policy validation, eliminating 20+ recurring test cases",
      "Executed 60–70% of the regression suite each sprint, validating releases across AWS and GCP",
      "Reworked automation scripts to auto-discover their configuration, removing manual setup entirely",
      "Documented setup, authentication, and command references for 6 test categories in Confluence",
    ],
  },
  {
    company: "Sonrai Security",
    title: "Junior Software Engineer (Co-op)",
    period: "Jan - Apr 2024",
    href: "https://sonraisecurity.com/",
    technologies: ["Python", "Slack API", "Grafana", "AWS", "GCP"],
    notes: [
      "Resolved 100+ vulnerability tickets and 20 product defects spanning back-end services and dashboard functionality",
      "Automated production alerting with an AWS Lambda function querying Prometheus and routing failures to Slack, cutting detection of stalled or failed jobs from up to a day to minutes",
    ],
  },
  {
    company: "SpryPoint",
    title: "Software Developer (Co-op)",
    period: "Sep - Dec 2022",
    href: "https://sprypoint.com/",
    technologies: ["JavaScript", "KnockoutJS", "Bootstrap", "PostgreSQL"],
    notes: [
      "Built data-driven UI components from a designer’s Figma mockups, including multi-option selectors and date pickers populated from PostgreSQL",
      "Fixed front-end and back-end defects, going directly to the maintainer of an open-source date picker library for implementation guidance",
    ],
  },
  {
    company: "University of New Brunswick",
    title: "Teaching Assistant",
    period: "Fall 2023, Winter 2025",
    href: "https://www.unb.ca/",
    technologies: ["Java", "JavaScript", "Python", "Octave", "Racket"],
    notes: [
      {
        text: "Supported 40+ students per term across two terms, grading weekly assignments and running lab sessions for:",
        items: [
          "CS2043 (Introduction to Software Engineering)",
          "CS2613 (Programming Languages Laboratory)",
        ],
      },
      "Debugged student code in Python, JavaScript, Octave, and Racket (CS2613) and Java (CS2043) during supervised lab sessions",
    ],
  },
];
