import type { Metadata } from "next";
import { PageMain } from "@/components/page-main";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  description: "Things I've built.",
};

export default function ProjectsPage() {
  return (
    <PageMain>
      <h1 className="border-b-2 border-border pb-10 text-lg font-medium">Projects</h1>

      <ProjectList projects={projects} />
    </PageMain>
  );
}
