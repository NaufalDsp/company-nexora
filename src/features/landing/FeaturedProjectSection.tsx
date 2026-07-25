import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";

import { Container } from "../../components/common/Container";
import { ExplodedProjectScene } from "../../components/three/ExplodedProjectScene";
import type { Project } from "../../data/contracts/portfolio";
import "../../styles/featured-project.css";

type FeaturedProjectSectionProps = {
  project: Project;
};

const assemblyStages = [
  {
    label: "01 / STRUKTUR",
    title: "Batas ruang yang tegas.",
    description:
      "Bidang lantai dan dinding membentuk kerangka utama tanpa menutup aliran visual.",
  },
  {
    label: "02 / MATERIAL",
    title: "Kontras yang tetap tenang.",
    description:
      "Beton, metal gelap, dan aksen tembaga dirakit sebagai palet industrial yang hangat.",
  },
  {
    label: "03 / FURNITUR",
    title: "Objek mengikuti sirkulasi.",
    description:
      "Setiap volume ditempatkan untuk menjaga gerak, fungsi, dan proporsi ruang.",
  },
  {
    label: "04 / PENCAHAYAAN",
    title: "Atmosfer menyatukan komposisi.",
    description:
      "Cahaya berlapis mengunci material dan objek menjadi satu pengalaman ruang.",
  },
] as const;

export function FeaturedProjectSection({
  project,
}: FeaturedProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="featured-project" id="proyek-unggulan" ref={sectionRef}>
      <Container className="featured-project__header">
        <p className="eyebrow">04 / PROYEK UNGGULAN</p>
        <div>
          <span>{project.contentLabel}</span>
          <h2>{project.title}</h2>
        </div>
        <dl>
          <div>
            <dt>Lokasi</dt>
            <dd>{project.location}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>{project.areaSize} m²</dd>
          </div>
          <div>
            <dt>Tahun</dt>
            <dd>{project.completionYear}</dd>
          </div>
        </dl>
      </Container>

      <Container className="featured-project__experience">
        <div className="featured-project__visual">
          <ExplodedProjectScene
            project={project}
            scrollTargetRef={sectionRef}
          />
        </div>

        <div className="featured-project__narrative">
          <p className="featured-project__summary">{project.summary}</p>
          <ol>
            {assemblyStages.map((stage) => (
              <li key={stage.label}>
                <span>{stage.label}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
          <Link to={`/portfolio/${project.slug}`}>
            Lihat studi proyek
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
