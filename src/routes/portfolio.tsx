import { Container } from "../components/common/Container";
import { Link } from "react-router";
import { getPublicContentRepository } from "../data/public-content-repository";
import { ProjectGrid } from "../features/portfolio/ProjectGrid";
import type { Route } from "./+types/portfolio";

export function meta() {
  return [
    { title: "Portofolio | Nexora Space" },
    {
      name: "description",
      content:
        "Jelajahi portofolio renovasi, interior hunian, ruang kerja, dan ruang komersial yang dikerjakan Nexora Space.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const repository = getPublicContentRepository();
  const portfolio = await repository.getPortfolio();
  const category = new URL(request.url).searchParams.get("category");
  const activeCategory = portfolio.categories.some(
    (item) => item.slug === category,
  )
    ? category
    : null;

  return {
    ...portfolio,
    activeCategory,
    filteredProjects: activeCategory
      ? portfolio.projects.filter(
          (project) => project.category.slug === activeCategory,
        )
      : portfolio.projects,
  };
}

export default function PortfolioPage({ loaderData }: Route.ComponentProps) {
  const { activeCategory, categories, filteredProjects } = loaderData;

  return (
    <main className="portfolio-page" id="main-content" tabIndex={-1}>
      <Container className="portfolio-page__hero">
        <p className="eyebrow">PORTOFOLIO / NEXORA SPACE</p>
        <h1>Ruang, material, dan sistem yang bekerja bersama.</h1>
        <p>
          Setiap proyek berangkat dari kebutuhan yang berbeda dan diselesaikan
          melalui perpaduan fungsi, material, serta detail yang terukur.
        </p>
      </Container>

      <Container>
        <nav className="portfolio-filter" aria-label="Filter kategori proyek">
          <Link
            aria-current={activeCategory === null ? "page" : undefined}
            preventScrollReset
            to="/portfolio"
          >
            Semua
          </Link>
          {categories.map((category) => (
            <Link
              aria-current={
                activeCategory === category.slug ? "page" : undefined
              }
              key={category.id}
              preventScrollReset
              to={`/portfolio?category=${category.slug}`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        <ProjectGrid projects={filteredProjects} />
      </Container>
    </main>
  );
}
