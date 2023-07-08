import { useNewPost } from "~/hooks/useNewPost";
import { First, Second, Third } from "./contentTypes";

const Account = () => {
  const {
    activeStep: activeStep,
    next: nextStep,
    prev: prevStep,
  } = useNewPost();

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
