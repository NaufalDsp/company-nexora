type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <img
      className={className}
      src={compact ? "/brand/nexora-mark.svg" : "/brand/nexora-lockup.svg"}
      alt="Nexora Space — Renovation & Interior"
      width={compact ? 240 : 920}
      height={compact ? 240 : 220}
    />
  );
}
