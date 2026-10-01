export const site = {
  name: "Anh Tran",
  role: "Software engineer",
  school: "University of New Brunswick",
  schoolUrl: "https://www.unb.ca/",
  grad: "BCS 2026",
  url: "https://kumathy.github.io/portfolio",
  email: "tranlamtuananh2003@gmail.com",
  resume: `${process.env.BASE_PATH}/static/Anh_Tran_resume.pdf`,
  socials: [
    { label: "GitHub", href: "https://github.com/kumathy" },
    { label: "LinkedIn", href: "https://linkedin.com/in/kumathy" },
  ],
} as const;
