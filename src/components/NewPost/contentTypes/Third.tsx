import { Input, IconButton } from "@material-tailwind/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";

const Second = () => {
  const { next: nextStep, prev: prevStep } = useNewPost();

  return (
    <>
      <div className="flex w-full flex-col justify-center bg-white">
        <div
          onClick={() => {
            prevStep();
          }}
          className="my-2 ml-2 flex cursor-pointer flex-row font-poppins text-xs"
        >
          <BiChevronLeft size={24} />
          <span className="flex items-center">Prev Step</span>
        </div>
        <div className="flex w-full justify-center py-20">
          <div className="flex w-[450px] flex-row items-center">
            <Input
              containerProps={{ className: "w-[400px] pr-[10px]" }}
              label="Item title"
              variant="standard"
            />
            <IconButton
              onClick={() => {
                nextStep();
              }}
              className="rounded-full"
            >
              <BiChevronRight size={24} />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
