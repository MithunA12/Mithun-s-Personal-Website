import {
  accomplishments,
  contactLinks,
  coreValues,
  experiences,
  hero,
  profile,
  projects,
  research,
} from "@/src/data/profile";

export function buildPortfolioContext() {
  return JSON.stringify(
    {
      profile,
      hero,
      projects,
      research,
      accomplishments,
      experiences,
      coreValues,
      contactLinks,
      routes: {
        home: "/",
        projects: "/#projects",
        research: "/#research",
        experience: "/#experience",
        accomplishments: "/#accomplishments",
        values: "/#values",
        contact: "/#contact",
      },
    },
    null,
    2,
  );
}
