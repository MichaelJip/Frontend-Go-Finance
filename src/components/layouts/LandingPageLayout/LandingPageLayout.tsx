import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavBar from "./LandingPageLayoutNavbar";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavBar />
      <div className="max-w-screen-3xl:container py-10 md:p-6">{children}</div>
    </Fragment>
  );
};

export default LandingPageLayout;
