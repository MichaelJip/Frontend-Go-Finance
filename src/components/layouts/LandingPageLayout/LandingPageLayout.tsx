import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavBar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

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
      <div className="py-10">{children}</div>
      <LandingPageLayoutFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
