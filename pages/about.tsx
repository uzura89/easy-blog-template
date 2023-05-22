"use client";

import Container from "../components/commons/layouts/Container";
import MotionSlide from "../components/commons/motion/MotionSlide";
import PageShell from "../components/page-shell/PageShell";

export default function About() {
  return (
    <PageShell>
      <Container>
        <MotionSlide right>
          <div>about page</div>
        </MotionSlide>
      </Container>
    </PageShell>
  );
}
