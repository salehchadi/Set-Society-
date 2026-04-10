import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "../../assets/constants";

export default function Footer() {
  return (
    <footer className="bg-surface-dim py-24 px-8 md:px-16">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="space-y-12">
          <Link to="/">
            <h2 className="font-script text-5xl text-primary">Set Society</h2>
          </Link>
          <nav className="flex flex-col space-y-4">
            {FOOTER_LINKS.map((link) =>
              link.path.startsWith("/") ? (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors hover:underline underline-offset-8"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.path}
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors hover:underline underline-offset-8"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="space-y-12 md:text-right w-full md:w-auto">
          <div className="flex gap-8 md:justify-end">
            {["Instagram", "Pinterest"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:underline underline-offset-8"
              >
                {social}
              </a>
            ))}
          </div>
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-primary/40">
            © 2024 DIGITAL ATELIER. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
