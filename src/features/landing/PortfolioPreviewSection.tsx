import { ArrowUpRight } from "lucide-react";

import { Container } from "../../components/common/Container";
import { Reveal } from "../../components/motion/Reveal";
import type { Project } from "../../data/contracts/portfolio";
import { ProjectCard } from "../portfolio/ProjectCard";

type PortfolioPreviewSectionProps = {
  projects: Project[];
};

export function PortfolioPreviewSection({
  projects,
}: PortfolioPreviewSectionProps) {
  return (
    <section className="portfolio-preview" id="portofolio">
      <Reveal>
        <Container>
          <div className="portfolio-preview__heading">
            <div>
              <p className="eyebrow eyebrow--dark">04 / PORTOFOLIO KONSEP</p>
              <h2>Ruang yang menjelaskan cara kami berpikir.</h2>
            </div>
            <a href="/portfolio">
              Lihat seluruh portofolio
              <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.5} />
            </a>
          </div>

          <div className="portfolio-preview__grid">
            {projects.map((project, index) => (
              <ProjectCard index={index} key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
