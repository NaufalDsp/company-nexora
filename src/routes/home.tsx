import type { Route } from "./+types/home";
import {
  getPublicContentRepository,
  getPublicDataMode,
} from "../data/public-content-repository";
import { AboutSection } from "../features/landing/AboutSection";
import { ConsultationSection } from "../features/landing/ConsultationSection";
import { HeroSection } from "../features/landing/HeroSection";
import { PortfolioPreviewSection } from "../features/landing/PortfolioPreviewSection";
import { ProcessSection } from "../features/landing/ProcessSection";
import { ServicesSection } from "../features/landing/ServicesSection";

export function meta() {
  return [
    { title: "Nexora Space | Renovation & Interior" },
    {
      name: "description",
      content:
        "Nexora Space adalah konsep company profile renovasi dan interior dengan pendekatan arsitektural, premium, dan presisi.",
    },
  ];
}

export async function loader() {
  const repository = getPublicContentRepository();
  const [content, portfolio] = await Promise.all([
    repository.getLandingPageContent(),
    repository.getPortfolio(),
  ]);

  return {
    content,
    dataMode: getPublicDataMode(),
    featuredProjects: portfolio.projects.filter(
      (project) => project.isFeatured,
    ),
  };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { content, dataMode, featuredProjects } = loaderData;

  return (
    <main data-mode={dataMode} id="main-content" tabIndex={-1}>
      <HeroSection
        conceptNotice={content.conceptNotice}
        content={content.hero}
      />
      <AboutSection content={content.about} />
      <ServicesSection services={content.services} />
      <PortfolioPreviewSection projects={featuredProjects} />
      <ProcessSection content={content.process} />
      <ConsultationSection content={content.consultation} />
    </main>
  );
}
