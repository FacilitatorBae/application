import React, { useState, useEffect } from "react";
import { Button, Dialog, Input, Spinner } from "@material-tailwind/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useToast } from "~/hooks/useToast";
import { type Product } from "@prisma/client";

interface ConfirmBuyModalProps {
  open: boolean;
  itemIdCookie: string;
  handleOpen: () => void;
  productData: {
    id: number;
    title: string;
    description: string;
    isNew: boolean;
    isBusiness: boolean;
    isHot: boolean;
    isSold: boolean;
    pictures: string;
    price: number;
    fee: number;
    owner: string;
    categoryId: number;
    shippingMethod: string;
  };
}

const ConfirmBuyModal: React.FC<ConfirmBuyModalProps> = ({
  open,
  itemIdCookie,
  handleOpen,
  productData,
}) => {
  const router = useRouter<"/items/[id]">();
  const toast = useToast();

  const {
    mutate: buyOrder,
    isSuccess,
    isLoading,
  } = api.placedOrders.buyOrder.useMutation();

  const handleConfirmPurchase = () => {
    buyOrder(
      {
        productData: {
          productId: productData?.id,
          owner: productData?.owner,
          shippingMethod: productData?.shippingMethod,
        },
      },
      itemIdCookie
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item purchased successfully");
      handleOpen();
    }
  }, [isSuccess]);

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
            <h3 className="text-2xl leading-6 text-gray-900">
              Confirm Purchase
            </h3>
          </div>

          <div className="mt-4 text-center text-xl">
            <p>This is the last step</p>
            <p className="text-sm">Do you want to proceed with payment?</p>
          </div>

          <div className="flex h-[40px] max-h-max w-[100%] flex-row items-center justify-center pt-5">
            <Button
              onClick={() => {
                productData ? handleConfirmPurchase() : null;
              }}
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

export default ConfirmBuyModal;
