// src/app/page.tsx
import SiteGrid from "@/components/SiteGrid";
import LeftStory from "@/components/LeftStory";
import LeadCard from "@/components/LeadCard"; // if you’re using center leads

export default function HomePage() {
  return (
    <SiteGrid
      left={
        <aside className="space-y-2 lg:sticky lg:top-16">
          <LeftStory
            href="/stories/sidewalk"
            title="Νέα για τα πεζοδρόμια"
            img="/sidewalk.jpeg"
            kicker="Ελλάδα"
          />
          <LeftStory
            href="/story/ellada-2"
            title="Σύντομη είδηση χωρίς εικόνα για εξοικονόμηση χώρου"
          />
          <LeftStory
            href="/story/ellada-3"
            title="Παράδειγμα ιστορίας με μικρή εικόνα"
            img="/placeholder.jpg"
          />
        </aside>
      }
    >
      {/* center (main stories) */}
      <div className="space-y-6">
        <LeadCard
          href="/story/lead-1"
          title="Κεντρικό θέμα 1"
          img="/placeholder.jpg"
          excerpt="Σύντομη περιγραφή του κύριου θέματος."
        />
        <LeadCard
          href="/story/lead-2"
          title="Κεντρικό θέμα 2"
          img="/placeholder.jpg"
        />
      </div>
    </SiteGrid>
  );
}

