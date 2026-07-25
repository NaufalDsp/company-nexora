import { BrandLogo } from "../../components/brand/BrandLogo";
import { ButtonLink } from "../../components/common/ButtonLink";
import { Container } from "../../components/common/Container";
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
          <div className="hero__coordinates" aria-hidden="true">
            <span>X / 06.214</span>
            <span>Y / 11.210</span>
          </div>
          <div className="hero__frame" aria-hidden="true">
            <div className="hero__plane hero__plane--back" />
            <div className="hero__plane hero__plane--floor" />
            <div className="hero__plane hero__plane--accent" />
            <BrandLogo className="hero__mark" compact />
          </div>
          <p className="hero__visual-label" aria-hidden="true">
            MODULAR ROOM / STATIC FALLBACK
          </p>
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
