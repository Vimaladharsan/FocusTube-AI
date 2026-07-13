import type { ReactNode } from "react";

interface SettingCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingCard({
  title,
  description,
  children,
}: SettingCardProps) {
  return (
    <section className="setting-card">
      <div className="setting-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="setting-card-action">
        {children}
      </div>
    </section>
  );
}