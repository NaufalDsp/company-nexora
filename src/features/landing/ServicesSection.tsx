import {
  Armchair,
  Building2,
  House,
  Layers3,
  PenTool,
  Store,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "../../components/common/Container";
import { Reveal } from "../../components/motion/Reveal";
import type {
  Service,
  ServiceIconName,
} from "../../data/contracts/public-content";

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  armchair: Armchair,
  building: Building2,
  house: House,
  layers: Layers3,
  "pen-tool": PenTool,
  store: Store,
  workflow: Workflow,
};

type ServicesSectionProps = {
  services: Service[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="services-section" id="layanan">
      <Reveal>
        <Container>
          <div className="services-section__heading">
            <p className="eyebrow">03 / LAYANAN</p>
            <h2>Satu sistem untuk merancang dan membangun ruang.</h2>
            <p>
              Lingkup layanan disusun agar keputusan desain, teknis, dan
              pelaksanaan tetap saling terhubung.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];

              return (
                <article className="service-card" key={service.id}>
                  <div className="service-card__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" size={30} strokeWidth={1.35} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
