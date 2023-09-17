import React, { useState, useEffect } from "react";
import { Button, Dialog, Input, Spinner } from "@material-tailwind/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface BuyModalProps {
  open: boolean;
  itemIdCookie: string;
  handleOpen: () => void;
}
const BuyModal: React.FC<BuyModalProps> = ({
  open,
  itemIdCookie,
  handleOpen,
}) => {
  const router = useRouter<"/items/[id]">();

  const { data: detailsByToken, isLoading } = itemIdCookie
    ? api.uuidTokens.getDetailsByToken.useQuery({
        token: itemIdCookie,
      })
    : { data: null, isLoading: false };

  const handleOnClick = () => {
    router.push(`/items/${router.query.id}/checkout`);
  };

  return (
    <Dialog
      open={open}
      size="xs"
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <div className="inline-block w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 z-[999] flex items-center justify-center bg-white">
            <Spinner className="absolute h-10 w-10 p-0" />
          </div>
        )}
        <>
          <div className="mb-4 text-center">
            <h3 className="text-2xl leading-6 text-gray-900">Buy</h3>
          </div>
          {detailsByToken ? (
            <div className="mt-4 text-center text-xl">
              <p>You've been referred by {detailsByToken?.[0]?.user?.name}</p>
              <p className="text-sm">Is there an error? Click here</p>
            </div>
          ) : (
            <div className="mt-4 text-center text-xl">
              <p className="text-sm">
                Were you referred by someone? Click here
              </p>
            </div>
          )}
          <div className="flex h-[40px] max-h-max w-[100%] flex-row items-center justify-center pt-5">
            <Button
              onClick={handleOnClick}
              className="ml-2 flex h-[40px] w-[40%] items-center justify-center p-0"
            >
              Checkout
            </Button>
          </div>
        </>
      </div>
    </Dialog>
  );
};

export default BuyModal;
