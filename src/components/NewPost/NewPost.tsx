import { useNewPost } from "~/hooks/useNewPost";
import { useCategories } from "~/hooks/useCategories";
import { First, Second, Third } from "./contentTypes";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Account = () => {
  const { data: categories } = api.categories.getAllCategories.useQuery();

  const { activeStep: activeStep, resetNewPostData: resetNewPostData } =
    useNewPost();

  const { allCategories, setCategories } = useCategories();

  useEffect(() => {
    if (!allCategories?.length) {
      categories && setCategories(categories);
    }
  }, [categories, allCategories]);

  useEffect(() => {
    return () => {
      resetNewPostData();
    };
  }, []);

  const contentMapping = () => {
    switch (activeStep) {
      case 1:
        return <First />;
      case 2:
        return <Second />;
      case 3:
        return <Third />;
      default:
        break;
    }
  };

  return (
    <section className="container mx-auto mt-16 px-4 sm:px-0">
      <div className="pb-16 font-poppins text-5xl font-bold">
        What do you want to sell?
      </div>
      <div className="pb-5 font-poppins text-sm font-thin">
        Step {activeStep} / 3
      </div>
      {contentMapping()}
    </section>
  );
};

export default Account;
