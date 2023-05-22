import { BLOG_NAME, BLOG_SUBTITLE } from "@/constants";
import { Lora } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const lora = Lora({ subsets: ["latin"] });

function NavItem(props: { href: string; text: string; active: boolean }) {
  return (
    <Link href={props.href} className="mx-2 sm:mx-3">
      <div
        className={`text-xs sm:text-sm font-bold rounded hover:underline ${
          props.active ? "text-primary " : "opacity-70"
        }`}
      >
        {props.text}
      </div>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="border-b border-border w-full flex flex-col justify-center items-center sticky -top-16 sm:-top-24 bg-bgPrimary z-10">
      <Link href="/">
        <div
          className={`font-bold text-lg sm:text-3xl mt-4 sm:mt-7 ${lora.className}`}
        >
          {BLOG_NAME}
        </div>
      </Link>
      <div className="text-secondary text-xs sm:text-sm font-light mt-0 sm:mt-2">
        {BLOG_SUBTITLE}
      </div>

      <div className="mt-4 sm:mt-6 mb-4 sm:mb-7 flex flex-row">
        <NavItem href="/" text="Posts" active={pathname === "/"} />
        <NavItem href="/about" text="About" active={pathname === "/about"} />
      </div>
    </div>
  );
}
