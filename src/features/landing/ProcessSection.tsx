import { Container } from "../../components/common/Container";
import { Reveal } from "../../components/motion/Reveal";
import type { LandingPageContent } from "../../data/contracts/public-content";

type ProcessSectionProps = {
  content: LandingPageContent["process"];
};

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section className="process-section" id="proses">
      <Reveal>
        <Container className="process-section__layout">
          <div className="process-section__intro">
            <p className="eyebrow">06 / PROSES</p>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </div>

          <ol className="process-list">
            {content.steps.map((step, index) => (
              <li key={step.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Reveal>
    </section>
  );
}
