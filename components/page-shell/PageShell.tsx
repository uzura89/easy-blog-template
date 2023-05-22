import { Fragment } from "react";
import Header from "../commons/header/Header";
import Footer from "../footer/Footer";
import Container from "../commons/layouts/Container";

interface Props {
  children: React.ReactNode;
}

export default function PageShell(props: Props) {
  return (
    <Fragment>
      <Header />
      <div className="flex-grow py-8 sm:py-10">{props.children}</div>
      <Footer />
    </Fragment>
  );
}
