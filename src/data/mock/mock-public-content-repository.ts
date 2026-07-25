import type {
  LandingPageContent,
  PublicContentRepository,
} from "../contracts/public-content";
import { landingPageFixture } from "./fixtures/landing-page";

export class MockPublicContentRepository implements PublicContentRepository {
  async getLandingPageContent(): Promise<LandingPageContent> {
    return Promise.resolve(structuredClone(landingPageFixture));
  }
}
