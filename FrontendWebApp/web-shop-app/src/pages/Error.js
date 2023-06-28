import { Fragment } from "react";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const content = {
  title: "An error occured!",
  description: "Could not find this page!",
};
const ErrorPage = () => {
  return (<Fragment>
    <MainNavigation />
    <PageContent content={content} />
    </Fragment>);
};

export default ErrorPage;
