import { BLOG_NAME } from "@/constants";
import { Lora } from "next/font/google";
import Container from "../commons/layouts/Container";

const lora = Lora({ subsets: ["latin"] });

export default function Footer() {
  return (
    <div className="border-border text-xs sm:text-sm border-t w-full">
      <Container>
        <div className="flex items-center gap-2 justify-between py-3 sm:py-4">
          <div className={`${lora.className} font-bold text-third`}>
            &copy;{BLOG_NAME}
          </div>
        </div>
      </Container>
    </div>
  );
}
