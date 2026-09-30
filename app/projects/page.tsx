import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  description: "Things I've built.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6">
      <h1 className="border-b-2 border-border pb-10 text-lg font-medium">Projects</h1>

      <ProjectList projects={projects} />
    </main>
  );
}
