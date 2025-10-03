// src/app/page.tsx
import SiteGrid from "@/components/SiteGrid";
import LeftStory from "@/components/LeftStory";
import LeadCard from "@/components/LeadCard";
import { homeSlots } from "@/content/home";

export default function HomePage() {
  return (
    <SiteGrid
      left={
        <aside className="space-y-2 lg:sticky lg:top-16">
          {homeSlots.left.map((s) => (
            <LeftStory
              key={s.href}
              href={s.href}
              title={s.title}
              img={s.img}
              kicker={s.kicker}
            />
          ))}
        </aside>
      }
      right={
        <aside className="space-y-2 lg:sticky lg:top-16">
          {homeSlots.right.map((s) => (
            <div key={s.href} className="p-2 border-b">
              <a href={s.href} className="font-medium hover:underline">
                {s.title}
              </a>
            </div>
          ))}
        </aside>
      }
    >
      {/* center (main stories) */}
      <div className="space-y-6">
        {homeSlots.middle.map((s) => (
          <LeadCard
            key={s.href}
            href={s.href}
            title={s.title}
            img={s.img}
            excerpt={s.excerpt}
          />
        ))}
      </div>
    </SiteGrid>
  );
}
