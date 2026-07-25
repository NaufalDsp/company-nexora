import { ButtonLink } from "../../components/common/ButtonLink";
import { Container } from "../../components/common/Container";
import { Reveal } from "../../components/motion/Reveal";
import type { LandingPageContent } from "../../data/contracts/public-content";

type ConsultationSectionProps = {
  content: LandingPageContent["consultation"];
};

export function ConsultationSection({ content }: ConsultationSectionProps) {
  return (
    <section className="consultation-section" id="konsultasi">
      <Reveal>
        <Container className="consultation-section__layout">
          <p className="eyebrow">{content.eyebrow}</p>
          <div>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </div>
          <ButtonLink href={content.ctaHref} variant="secondary">
            {content.ctaLabel}
          </ButtonLink>
        </Container>
      </Reveal>
    </section>
  );
}
