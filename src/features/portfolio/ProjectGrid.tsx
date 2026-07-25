import type { Project } from "../../data/contracts/portfolio";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="portfolio-empty">
        Proyek sedang disiapkan untuk ditampilkan.
      </p>
    );
  }

  return (
    <motion.div className="project-grid" layout>
      {projects.map((project, index) => (
        <ProjectCard
          index={index}
          key={project.id}
          priority={index === 0}
          project={project}
        />
      ))}
    </motion.div>
  );
}
import { motion } from "motion/react";
