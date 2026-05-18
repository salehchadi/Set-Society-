import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-dim py-24 px-8 md:px-16">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="space-y-12">
          <Link to="/">
            <h2 className="font-logo text-5xl text-primary">Set Society</h2>
          </Link>
        </div>

        <div className="space-y-12 md:text-right w-full md:w-auto">
          <div className="flex gap-8 md:justify-end">
            <a
              href="https://www.facebook.com/share/14jR78eSVMy/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:underline underline-offset-8"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/set__society?igsh=b2E1NW9yYndsOTFo&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:underline underline-offset-8"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@set_society"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:underline underline-offset-8"
            >
              TikTok
            </a>
          </div>
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-primary/40">
            © 2026 SET SOCIETY ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
