import { ExperienceList } from "@/components/experience-list";

export default function ExperiencePage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6">
      <h1 className="border-b-2 border-border pb-10 text-lg font-medium">Experience</h1>

      <ExperienceList />
    </main>
  );
}
