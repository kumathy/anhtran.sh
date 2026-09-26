import { TechList } from "@/components/tech-list";
import type { Project } from "@/content/projects";

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="border-t border-border py-6 first:border-t-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium">{project.title}</h3>
        <span className="shrink-0 font-mono text-xs text-muted">
          {project.year}
        </span>
      </div>

      <p className="mt-2 text-muted">{project.blurb}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <TechList items={project.stack} />

        <div className="flex shrink-0 items-center gap-x-4 font-mono text-xs text-muted">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Demo ↗
            </a>
          ) : null}
          {project.source ? (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Source ↗
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </ul>
  );
}
