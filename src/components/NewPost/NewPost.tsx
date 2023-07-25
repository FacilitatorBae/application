import { useNewPost } from "~/hooks/useNewPost";
import { First, Second, Third, Fourth } from "./contentTypes";
import { useEffect } from "react";
import { api } from "~/utils/api";

const Account = () => {
  const { activeStep: activeStep, resetNewPostData: resetNewPostData } =
    useNewPost();

  useEffect(() => {
    return () => {
      resetNewPostData();
    };
  }, []);

  api.categories.getAllCategories.useQuery();

  const contentMapping = () => {
    switch (activeStep) {
      case 1:
        return <First />;
      case 2:
        return <Second />;
      case 3:
        return <Third />;
      case 4:
        return <Fourth />;
      default:
        break;
    }
  };

  return (
    <section className="container mx-auto mt-16 px-4 sm:px-0">
      <div className="pb-16 font-poppins text-5xl font-bold">
        What do you want to sell?
      </div>
      {activeStep >= 1 && activeStep <= 3 ? (
        <div className="pb-5 font-poppins text-sm font-thin">
          Step {activeStep} / 3
        </div>
      ) : null}
      {contentMapping()}
    </section>
  );
};

export default Account;
