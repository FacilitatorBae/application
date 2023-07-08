import { Input, IconButton } from "@material-tailwind/react";
import { BiChevronRight } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";

const First = () => {
  const { next: nextStep } = useNewPost();

  return (
    <div className="flex w-full flex-col justify-center bg-white  py-16">
      <div className="text-center font-poppins">Pick a title for your item</div>
      <div className="flex w-full justify-center bg-white">
        <div className="flex w-[450px] flex-row items-center">
          <Input
            containerProps={{ className: "w-[400px] pr-[10px]" }}
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
  );
};

export default First;
