"use client";

import Container from "../components/commons/layouts/Container";
import MotionSlide from "../components/commons/motion/MotionSlide";
import PageShell from "../components/page-shell/PageShell";

export default function About() {
  return (
    <PageShell>
      <Container>
        <MotionSlide right>
          <p>
            This blog is built with{" "}
            <a
              href="https://github.com/uzura89/theblog"
              className="text-link hover:underline"
            >
              THE BLOG
            </a>
            .
          </p>
        </MotionSlide>
      </Container>
    </PageShell>
  );
}
