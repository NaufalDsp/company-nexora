import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";

import type { Project } from "../../data/contracts/portfolio";

type ProjectCardProps = {
  index: number;
  project: Project;
  priority?: boolean;
};

export function ProjectCard({
  index,
  project,
  priority = false,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card"
      layout
      transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/portfolio/${project.slug}`}>
        <div className="project-card__image">
          <img
            alt={project.coverImage.alt}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            loading={priority ? "eager" : "lazy"}
            src={project.coverImage.src}
            width="1200"
            height="800"
          />
          <span>{project.contentLabel}</span>
        </div>
        <div className="project-card__content">
          <p>
            {String(index + 1).padStart(2, "0")} / {project.category.name}
          </p>
          <div>
            <h2>{project.title}</h2>
            <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.5} />
          </div>
          <span>
            {project.location} · {project.completionYear}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
