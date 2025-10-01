// src/app/page.tsx
import SiteGrid from "@/components/SiteGrid";
import LeadCard from "@/components/LeadCard";
import StoryCard from "@/components/StoryCard";

export default function HomePage() {
  // Fake data for now
  const lead = [
    { href: "/story/lead-1", title: "Κύριο θέμα 1", img: "/placeholder.jpg", excerpt: "Σύντομη περιγραφή του κύριου θέματος." },
    { href: "/story/lead-2", title: "Κύριο θέμα 2", img: "/placeholder.jpg" },
  ];

  const leftCol = [
    { href: "/story/a1", title: "Αριστερά: Είδηση 1" },
    { href: "/story/a2", title: "Αριστερά: Είδηση 2" },
    { href: "/story/a3", title: "Αριστερά: Είδηση 3" },
  ];

  const rightCol = [
    { href: "/story/b1", title: "Δεξιά: Είδηση 1" },
    { href: "/story/b2", title: "Δεξιά: Είδηση 2" },
    { href: "/story/b3", title: "Δεξιά: Είδηση 3" },
  ];

  return (
    <SiteGrid
      left={
        <div className="space-y-2">
          {leftCol.map((s) => <StoryCard key={s.href} {...s} />)}
        </div>
      }
      right={
        <div className="space-y-2">
          {rightCol.map((s) => <StoryCard key={s.href} {...s} />)}
        </div>
      }
    >
      <div className="space-y-6">
        {lead.map((s) => <LeadCard key={s.href} {...s} />)}
      </div>
    </SiteGrid>
  );
}






