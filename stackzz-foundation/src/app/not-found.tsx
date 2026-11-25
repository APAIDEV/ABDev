import { ButtonLink } from "@/components/ui/Button";
import { RoofMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-text text-center">
        <RoofMark className="mx-auto mb-10 w-28" />
        <p className="eyebrow mb-5">Page Not Found</p>
        <h1 className="text-5xl sm:text-6xl">This page could not be found.</h1>
        <p className="mt-6 text-lg text-muted">The link may be outdated, or the page may have moved.</p>
        <div className="mt-10">
          <ButtonLink href="/">Return Home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
