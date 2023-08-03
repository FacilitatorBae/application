import { Input, IconButton } from "@material-tailwind/react";
import { BiChevronRight } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";

const First = () => {
  const { next: nextStep, updateNewPostDetails, newPostDetails } = useNewPost();

  return (
    <div className="flex w-full flex-col justify-center bg-white  py-16">
      <div className="text-center font-poppins">Pick a title for your item</div>
      <div className="flex w-full justify-center bg-white">
        <div className="flex w-[450px] flex-row items-center">
          <Input
            containerProps={{ className: "w-[400px] pr-[10px]" }}
            variant="standard"
            onChange={(e) => {
              updateNewPostDetails("title", e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newPostDetails.title) {
                e.preventDefault();
                nextStep();
              }
            }}
            value={newPostDetails.title}
          />
          <IconButton
            disabled={!newPostDetails.title}
            onClick={() => {
              if (newPostDetails.title) {
                nextStep();
              }
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
