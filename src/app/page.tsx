// src/app/page.tsx
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <TopBar />
      <main className="min-h-screen grid place-items-center">
        <section className="max-w-3xl text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-serif">Βέλτιστος</h1>
          <p className="text-lg text-zinc-600">
            Καλώς ήρθατε. Το site αποδίδει ελληνικά σωστά και είναι έτοιμο για σχεδιασμό.
          </p>
        </section>
      </main>
    </>
  );
}


