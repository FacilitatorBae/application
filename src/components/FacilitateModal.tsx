import React, { useState, useEffect } from "react";
import { Button, Dialog, Input, Spinner } from "@material-tailwind/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface FacilitateModalProps {
  open: boolean;
  productId: number;
  handleOpen: () => void;
}
const FacilitateModal: React.FC<FacilitateModalProps> = ({
  open,
  productId,
  handleOpen,
}) => {
  const [baseUrl, setBaseUrl] = useState("");

  const {
    mutate,
    data: postedData,
    isSuccess,
    isLoading,
  } = api.uuidTokens.newUuiToken.useMutation();

  useEffect(() => {
    if (window?.location?.origin) {
      setBaseUrl(window?.location?.href);
      console.log(window.location);
    }
  }, []);

  const handleOnGenerate = () => {
    mutate({ productId: productId });
  };

  return (
    <Dialog
      open={open}
      size="xs"
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <div className="inline-block w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
        <div className="mb-4 text-center">
          <h3 className="text-2xl leading-6 text-gray-900">
            Read carefully following guidelines:
          </h3>
        </div>
        <div className="mt-4 text-[12px]">
          <p>
            1) Referral links will expire after 7 calendar days or when the item
            is sold
          </p>
          <p>
            2) Item may be sold by other person while you're trying to sell it
          </p>
          <p>
            3) Buyer will have to buy the item through your link to it earn the
            commission
          </p>
        </div>
        <div className="mflex-row flex h-[40px] max-h-max w-[100%] items-center justify-between pt-5">
          <Input
            containerProps={{
              className: "min-w-[72px] min-h-[40px] max-w-[65%]",
            }}
            label="Link"
            type="text"
            value={postedData?.token && `${baseUrl}?uuid=${postedData?.token}`}
          />

          <div className="h-full min-h-[40px] w-[40%]">
            <Button
              onClick={handleOnGenerate}
              className="ml-2 flex h-[40px] w-full items-center justify-center p-0"
            >
              {isLoading ? (
                <Spinner className="absolute h-5 w-5 p-0" />
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FacilitateModal;
