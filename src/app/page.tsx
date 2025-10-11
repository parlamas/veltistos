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
                <div
                  key={s.href}
                  style={{ border: "1px solid brown", padding: "8px" }}
                >
                  <LeftStory item={s} />
                </div>
              ))}
            </aside>
          }
          right={
            <aside className="space-y-2 lg:sticky lg:top-16">
              {homeSlots.right.map((s) => (
                <div
                  key={s.href}
                  style={{ border: "1px solid brown", padding: "8px" }}
                >
                  <RightStory item={s} />
                </div>
              ))}
            </aside>
          }
        >
          {/* Middle column (lead stories) */}
          <section className="space-y-3">
            {homeSlots.middle.map((s) => (
              <div
                key={s.href}
                style={{ border: "1px solid brown", padding: "8px" }}
              >
                <LeadCard item={s} />
              </div>
            ))}
          </section>
        </SiteGrid>
      </div>
    </main>
  );
}


