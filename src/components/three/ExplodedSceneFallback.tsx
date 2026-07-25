import type { Project } from "../../data/contracts/portfolio";

type ExplodedSceneFallbackProps = {
  project: Project;
};

export function ExplodedSceneFallback({ project }: ExplodedSceneFallbackProps) {
  return (
    <div className="exploded-scene__fallback" aria-hidden="true">
      <img alt="" src={project.coverImage.src} />
      <div className="exploded-scene__fallback-grid" />
      <span>EXPLODED ROOM / STATIC FALLBACK</span>
    </div>
  );
}
