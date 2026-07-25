import { BrandLogo } from "../brand/BrandLogo";

export function HeroSceneFallback() {
  return (
    <div className="hero-scene__fallback" aria-hidden="true">
      <div className="hero__coordinates">
        <span>X / 06.214</span>
        <span>Y / 11.210</span>
      </div>
      <div className="hero__frame">
        <div className="hero__plane hero__plane--back" />
        <div className="hero__plane hero__plane--floor" />
        <div className="hero__plane hero__plane--accent" />
        <BrandLogo className="hero__mark" compact />
      </div>
      <p className="hero__visual-label">MODULAR ROOM / STATIC FALLBACK</p>
    </div>
  );
}
