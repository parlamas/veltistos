// src/app/stories/[slug]/page.tsx

// Optional: dynamic metadata per slug
export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Story: ${params.slug}`,
    description: `Άρθρο: ${params.slug}`,
  };
}

// REQUIRED: default export so the file is a real module
export default function StoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // TEMP content; swap for real data source later
  return (
    <article className="prose prose-zinc max-w-none">
      <h1 className="font-serif text-3xl font-bold">Άρθρο: {slug}</h1>
      <p>Περιεχόμενο για τό “{slug}”.</p>
    </article>
  );
}
