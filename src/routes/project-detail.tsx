import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ButtonLink } from "../components/common/ButtonLink";
import { Container } from "../components/common/Container";
import { getPublicContentRepository } from "../data/public-content-repository";
import type { Route } from "./+types/project-detail";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${loaderData.project.title} | Nexora Space` },
    {
      name: "description",
      content: loaderData.project.summary,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const repository = getPublicContentRepository();
  const project = await repository.getProjectBySlug(params.slug);

  if (!project) {
    // React Router uses thrown responses to preserve the HTTP 404 status.
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Proyek tidak ditemukan.", { status: 404 });
  }

  return { project };
}

export default function ProjectDetailPage({
  loaderData,
}: Route.ComponentProps) {
  const { project } = loaderData;

  return (
    <main className="project-detail" id="main-content" tabIndex={-1}>
      <Container className="project-detail__hero">
        <a className="project-detail__back" href="/portfolio">
          <ArrowLeft aria-hidden="true" size={18} />
          Kembali ke portofolio
        </a>
        <div className="project-detail__title">
          <div>
            <p className="eyebrow">
              {project.category.name} / {project.contentLabel}
            </p>
            <h1>{project.title}</h1>
          </div>
          <dl>
            <div>
              <dt>Lokasi</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Tahun</dt>
              <dd>{project.completionYear}</dd>
            </div>
            <div>
              <dt>Luas proyek</dt>
              <dd>{project.areaSize} m²</dd>
            </div>
          </dl>
        </div>
        <img
          alt={project.coverImage.alt}
          className="project-detail__cover"
          decoding="async"
          fetchPriority="high"
          height="800"
          src={project.coverImage.src}
          width="1200"
        />
      </Container>

      <section className="project-story">
        <Container className="project-story__layout">
          <p className="eyebrow eyebrow--dark">PENDEKATAN DESAIN</p>
          <div className="project-story__lead">
            <h2>{project.summary}</h2>
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="project-story__decisions">
            <div>
              <dt>Tantangan</dt>
              <dd>{project.challenge}</dd>
            </div>
            <div>
              <dt>Solusi</dt>
              <dd>{project.solution}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="project-gallery">
        <Container>
          <div className="project-gallery__heading">
            <p className="eyebrow">GALERI PROYEK</p>
            <h2>Bidang, proporsi, dan detail material.</h2>
          </div>
          <div className="project-gallery__grid">
            {project.gallery.map((image) => (
              <figure key={image.id}>
                <img
                  alt={image.alt}
                  decoding="async"
                  height="800"
                  loading="lazy"
                  src={image.src}
                  width="1200"
                />
                {image.caption ? (
                  <figcaption>{image.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="project-detail__cta">
        <Container>
          <p className="eyebrow">LANJUTKAN PERCAKAPAN</p>
          <div>
            <h2>Punya kebutuhan ruang dengan tantangan serupa?</h2>
            <ButtonLink href="/#konsultasi">
              Mulai dari kebutuhan Anda
            </ButtonLink>
          </div>
          <a href="/portfolio">
            Lihat proyek lainnya
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </Container>
      </section>
    </main>
  );
}
