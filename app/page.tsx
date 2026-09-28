const LINKEDIN_URL = "https://www.linkedin.com/in/oluwaseye-akele/";
const EMAIL = "olu.akele@gmail.com";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-16 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Olu Akele
      </h1>
      <p className="mt-3 text-lg font-medium text-muted-foreground">
        Forward deployed product manager · AI product builder
      </p>
      <p className="mt-8 text-base leading-7 sm:text-lg sm:leading-8">
        I&apos;m a product manager who builds. I work inside messy real-world
        systems (catalogs, APIs, databases), figure out what the customer
        needs, ship the AI that does it, and prove it works with evals. Every
        step is documented in public.
      </p>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        Full site and build log coming soon: first project, ShelfReady, is in
        progress.
      </p>
      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-base font-medium">
        <li>
          <a
            href={LINKEDIN_URL}
            className="underline underline-offset-4 hover:text-muted-foreground"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={`mailto:${EMAIL}`}
            className="underline underline-offset-4 hover:text-muted-foreground"
          >
            {EMAIL}
          </a>
        </li>
      </ul>
    </main>
  );
}
