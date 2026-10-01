import { ExperienceList } from "@/components/experience-list";
import { PageMain } from "@/components/page-main";

export default function ExperiencePage() {
  return (
    <PageMain>
      <h1 className="border-b-2 border-border pb-10 text-lg font-medium">Experience</h1>

      <ExperienceList />
    </PageMain>
  );
}
