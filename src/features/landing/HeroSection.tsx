import { ButtonLink } from "../../components/common/ButtonLink";
import { Container } from "../../components/common/Container";
import { HeroScene } from "../../components/three/HeroScene";
import type { LandingPageContent } from "../../data/contracts/public-content";

type HeroSectionProps = {
  conceptNotice: string;
  content: LandingPageContent["hero"];
};

export function HeroSection({ conceptNotice, content }: HeroSectionProps) {
  return (
    <section className="hero" id="beranda">
      <div className="hero__blueprint" aria-hidden="true" />
      <Container className="hero__layout">
        <div className="hero__content">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>
            {content.title}
            <br />
            <span>{content.highlightedTitle}</span>
          </h1>
          <p className="hero__description">{content.description}</p>
          <div className="hero__actions">
            <ButtonLink href={content.primaryCtaHref}>
              {content.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink href={content.secondaryCtaHref} variant="secondary">
              {content.secondaryCtaLabel}
            </ButtonLink>
          </div>
          <p className="hero__disclaimer">{conceptNotice}</p>
        </div>

        <div
          className="hero__visual"
          role="img"
          aria-label="Ilustrasi abstrak ruang modular Nexora Space"
        >
          <HeroScene />
        </div>
      </Container>

      <div className="hero__status">
        <Container className="hero__status-grid">
          {content.capabilities.map((capability, index) => (
            <div key={capability.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>
                <small>{capability.label}</small>
                {capability.value}
              </p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
