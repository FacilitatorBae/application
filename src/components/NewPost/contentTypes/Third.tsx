import {
  Input,
  IconButton,
  Breadcrumbs,
  Select,
  Option,
  Textarea,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { BiChevronLeft, BiCamera } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";
import { useRef } from "react";
import { api } from "~/utils/api";

const Third = () => {
  const {
    updateNewPostDetails,
    newPostDetails,
    prev: prevStep,
    pickedCategories,
    next: nextStep,
    activeStep,
  } = useNewPost();

  const {
    mutate,
    isLoading,
    isSuccess,
    data: postedData,
  } = api.products.newProduct.useMutation();

  useEffect(() => {
    if (activeStep === 3 && isSuccess && postedData.id) {
      updateNewPostDetails("id", postedData.id.toString());
      nextStep();
    }
  }, [isSuccess, postedData, activeStep]);

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };
  const handleChange = (event) => {
    const filesUploaded = event.target.files;

    // Hardcoding images
    updateNewPostDetails("pictures", [
      "https://randomwordgenerator.com/img/picture-generator/g2ebc46d651de9da6b29d2194b428cb741ebe008e6f87e5e93bef0c089a2a652b1ba76f5fb0d2af1b25d9df34f0adab86_640.jpg",
      "https://randomwordgenerator.com/img/picture-generator/idea-3085367_640.jpg",
      "https://randomwordgenerator.com/img/picture-generator/54e4dd4b4a5ba514f1dc8460962e33791c3ad6e04e507440742a7ed1954cc7_640.jpg",
    ]);
  };

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
        <div className="text-center font-poppins">Fill last details</div>
        <div className="pl-5">
          <Breadcrumbs separator=">">
            {pickedCategories.map((item) => (
              <a className="font-poppins font-thin">{item.name}</a>
            ))}
          </Breadcrumbs>
        </div>
        <div className="flex w-full justify-center py-20">
          <div className="flex w-[450px] flex-col items-center justify-center">
            <div className="flex w-20 justify-center pb-10">
              <Select label="Condition*">
                <Option
                  onClick={() => {
                    updateNewPostDetails("condition", "New");
                  }}
                >
                  New
                </Option>
                <Option
                  onClick={() => {
                    updateNewPostDetails("condition", "Used");
                  }}
                >
                  Used
                </Option>
              </Select>
            </div>

            <div className="flex w-20 justify-center pb-10">
              <Input
                onChange={(e) => {
                  updateNewPostDetails("price", e.target.value);
                }}
                label="Price*"
                variant="static"
              />
            </div>

            <div className="flex w-20 justify-center pb-10">
              <Input
                onChange={(e) => {
                  updateNewPostDetails("fees", e.target.value);
                }}
                color="teal"
                label="Fees*"
                variant="static"
              />
            </div>

            <div className="flex w-full justify-center pb-10">
              <Textarea
                onChange={(e) => {
                  updateNewPostDetails("description", e.target.value);
                }}
                label="Description"
              />
            </div>

            <div className="mb-10 flex w-full justify-center rounded-md border-[1px] border-solid border-gray-400">
              <div
                className="flex h-20 w-full cursor-pointer flex-col items-center justify-center"
                onClick={handleClick}
              >
                <input
                  type="file"
                  multiple
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <BiCamera />
                <span className="font-poppins text-xs">
                  Pick pictures for your post
                </span>
              </div>
            </div>
            <Button
              className="flex items-center justify-center"
              disabled={
                !newPostDetails?.description ||
                !newPostDetails?.pictures ||
                !newPostDetails?.fees ||
                !newPostDetails?.price ||
                !newPostDetails?.title ||
                !newPostDetails?.condition ||
                isLoading
              }
              onClick={() => {
                mutate({
                  title: newPostDetails.title || "",
                  description: newPostDetails.description || "",
                  isNew: newPostDetails.condition === "New",
                  isBusiness: false,
                  isHot: false,
                  pictures:
                    '["https://randomwordgenerator.com/img/picture-generator/57e4d5464f51a814f1dc8460962e33791c3ad6e04e5074417c2d78d1924fcd_640.jpg","https://randomwordgenerator.com/img/picture-generator/idea-3085367_640.jpg","https://randomwordgenerator.com/img/picture-generator/5fe1dd454d50b10ff3d8992cc12c30771037dbf852547848702e7dd4954b_640.jpg", "https://randomwordgenerator.com/img/picture-generator/55e1d6444e5aae14f1dc8460962e33791c3ad6e04e50744172297bd4944fcc_640.jpg"]',
                  price: newPostDetails.price || "",
                  fee: newPostDetails.fees || "",
                  owner: "owner",
                  categoryId:
                    pickedCategories[pickedCategories.length - 1]?.id || 0,
                });
              }}
            >
              Publish
              {isLoading && <Spinner className="absolute h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Third;
