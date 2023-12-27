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
import { useCallback, useEffect, useState } from "react";
import { BiChevronLeft, BiCamera, BiXCircle } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";
import { useRef } from "react";
import { api } from "~/utils/api";
import { useToast } from "~/hooks/useToast";
import Image from "next/image";
import axios from "axios";

const Third = () => {
  const {
    updateNewPostDetails,
    newPostDetails,
    prev: prevStep,
    pickedCategories,
    next: nextStep,
    activeStep,
  } = useNewPost();
  const toast = useToast();

  const [pics, setPics] = useState([]);

  const {
    mutate,
    isLoading,
    isSuccess,
    isError,
    data: postedData,
  } = api.products.newProduct.useMutation();

  const { data: preSignedImgPostUrl } =
    api.products.getPreSignedImgPostUrl.useQuery();

  useEffect(() => {
    if (activeStep === 3 && isSuccess && postedData.id) {
      updateNewPostDetails("id", postedData.id.toString());
      toast.success(`Item posted successfully with ID ${postedData.id}`);
      nextStep();
    }
  }, [isSuccess, postedData, activeStep]);

  useEffect(() => {
    if (isError) {
      toast.error(
        `There was an error while trying to post the item. Try again later.`
      );
    }
  }, [isError]);

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const handleChange = (event) => {
    const filesUploaded = event.target.files;
    const qtyOfPicsAfterUpload = [...pics, ...filesUploaded];

    if (qtyOfPicsAfterUpload.length > 4) {
      toast.error(`Imgs are limited to 4`);
    } else {
      Object.values(filesUploaded).forEach((item) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imageBlob = event.target.result;
          setPics((prev) => [...prev, imageBlob]);
        };
        reader.readAsDataURL(item);
      });
    }
  };

  const onRemovePictureClick = (pictureUrl: string) => {
    const newPics = pics.filter(
      (item) => pics.indexOf(item) !== pics.indexOf(pictureUrl)
    );
    setPics(newPics);
  };

  useEffect(() => {
    updateNewPostDetails("pictures", pics);
  }, [pics]);

  const postTest = () => {
    // CLOUDINARY ONLY ALLOWS SINGLE FILE TO BE UPLOADED AT A TIME. WHEN MOVING TO AWS S3 WILL TRY TO MAKE SINGLE HTTP REQUEST
    const imgUrls = [];
    if (preSignedImgPostUrl) {
      pics.forEach((pic) => {
        axios
          .post(preSignedImgPostUrl, {
            file: pic,
            upload_preset: "zsffzfbc",
          })
          .then((res) => {
            imgUrls.push(res.data.secure_url);
            if (imgUrls.length === pics.length) {
              mutate({
                title: newPostDetails.title || "",
                description: newPostDetails.description || "",
                isNew: newPostDetails.condition === "New",
                isBusiness: false,
                isHot: false,
                pictures: JSON.stringify(imgUrls),
                price: newPostDetails.price || "",
                fee: newPostDetails.fees || "",
                categoryId:
                  pickedCategories[pickedCategories.length - 1]?.id || 0,
              });
            }
          })
          .catch((err) => {
            console.log("error in request", err);
          });
      });
    }
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

            <div className="mb-5 flex w-full justify-center rounded-md border-[1px] border-solid border-gray-400">
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
            {pics && (
              <div className="mb-5 flex w-full flex-row">
                {pics.map((item) => {
                  const customClass =
                    pics.indexOf(item) !== 3 ? "mr-[6.67%]" : "mr-[0%]";
                  return (
                    <div
                      className={`relative aspect-[1] w-[20%] ${customClass}`}
                    >
                      <button
                        onClick={() => {
                          onRemovePictureClick(item);
                        }}
                        className="absolute right-0 z-[999] mr-2 mt-2 text-xl"
                      >
                        {<BiXCircle className="text-gray-800" />}
                      </button>
                      <Image
                        className="mr-1 object-cover object-center"
                        src={item}
                        alt="visa"
                        unoptimized
                        fill
                      />
                    </div>
                  );
                })}
              </div>
            )}
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
                postTest();
                /*  mutate({
                  title: newPostDetails.title || "",
                  description: newPostDetails.description || "",
                  isNew: newPostDetails.condition === "New",
                  isBusiness: false,
                  isHot: false,
                  pictures: JSON.stringify(pics),
                  price: newPostDetails.price || "",
                  fee: newPostDetails.fees || "",
                  categoryId:
                    pickedCategories[pickedCategories.length - 1]?.id || 0,
                }); */
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
