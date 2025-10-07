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
            <div style={{ border: "1px solid brown", padding: "8px" }}>
              <aside className="space-y-2 lg:sticky lg:top-16">
                {homeSlots.left.map((s) => (
                  <LeftStory key={s.href} item={s} />
                ))}
              </aside>
            </div>
          }
          right={
            <div style={{ border: "1px solid brown", padding: "8px" }}>
              <aside className="space-y-2 lg:sticky lg:top-16">
                {homeSlots.right.map((s) => (
                  <RightStory key={s.href} item={s} />
                ))}
              </aside>
            </div>
          }
        >
          {/* Middle column (lead stories) */}
          <div style={{ border: "1px solid brown", padding: "8px" }}>
            <section className="space-y-3">
              {homeSlots.middle.map((s) => (
                <LeadCard key={s.href} item={s} />
              ))}
            </section>
          </div>
        </SiteGrid>
      </div>
    </main>
  );
}
