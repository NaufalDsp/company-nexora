import type {
  LandingPageContent,
  PublicContentRepository,
} from "../contracts/public-content";
import type { Portfolio, Project } from "../contracts/portfolio";
import { landingPageFixture } from "./fixtures/landing-page";
import { portfolioFixture } from "./fixtures/portfolio";

export class MockPublicContentRepository implements PublicContentRepository {
  async getLandingPageContent(): Promise<LandingPageContent> {
    return Promise.resolve(structuredClone(landingPageFixture));
  }

  async getPortfolio(): Promise<Portfolio> {
    return Promise.resolve(structuredClone(portfolioFixture));
  }

  getProjectBySlug(slug: string): Promise<Project | null> {
    const project = portfolioFixture.projects.find(
      (candidate) => candidate.slug === slug,
    );

    return Promise.resolve(project ? structuredClone(project) : null);
  }
}
