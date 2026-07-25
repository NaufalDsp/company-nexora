import { Container } from "../../components/common/Container";
import { Reveal } from "../../components/motion/Reveal";
import type { LandingPageContent } from "../../data/contracts/public-content";

type AboutSectionProps = {
  content: LandingPageContent["about"];
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="about-section" id="tentang">
      <Reveal>
        <Container>
          <div className="section-heading">
            <p className="eyebrow eyebrow--dark">02 / {content.label}</p>
            <h2>{content.title}</h2>
            <div className="about-section__copy">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <ol className="about-section__principles">
            {content.principles.map((principle, index) => (
              <li key={principle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {principle}
              </li>
            ))}
          </ol>
        </Container>
      </Reveal>
    </section>
  );
}
