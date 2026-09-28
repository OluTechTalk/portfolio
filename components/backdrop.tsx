// Soft violet/rose glow and a fading dot grid behind the top of every page.
// Purely decorative: hidden from assistive tech and never intercepts clicks.
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] overflow-hidden"
    >
      <div className="absolute inset-0 bg-glow" />
      <div className="absolute inset-0 bg-dots" />
    </div>
  );
}
