// src/app/page.tsx
import SiteGrid from "@/components/SiteGrid";
import LeftStory from "@/components/LeftStory";
import LeadCard from "@/components/LeadCard";
import RightStory from "@/components/RightStory";
import { homeSlots } from "@/content/home";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <SiteGrid
          left={
            <aside className="space-y-2 lg:sticky lg:top-16">
              {homeSlots.left.map((s) => (
                <LeftStory key={s.href} item={s} />
              ))}
            </aside>
          }
          right={
            <aside className="space-y-2 lg:sticky lg:top-16">
              {homeSlots.right.map((s) => (
                <RightStory key={s.href} item={s} />
              ))}
            </aside>
          }
        >
          {/* Middle column (lead stories) */}
          <section className="space-y-3">
            {homeSlots.middle.map((s) => (
              <LeadCard key={s.href} item={s} />
            ))}
          </section>
        </SiteGrid>
      </div>
    </main>
  );
}
