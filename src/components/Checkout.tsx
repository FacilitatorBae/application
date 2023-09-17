import Image from "next/image";
import { Button, Option, Select, Spinner } from "@material-tailwind/react";
import { BiShareAlt } from "react-icons/bi";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useFavorites } from "~/hooks/useFavorites";
import { useEffect, useMemo, useState } from "react";
import { type Product } from "@prisma/client";
import { api } from "~/utils/api";
import FacilitateModal from "./Modals/FacilitateModal";
import ConfirmBuyModal from "./Modals/ConfirmBuyModal";
import { withAuthentication } from "~/hocs/withAuthentication";
import AuthDialog from "./AuthDialog";

interface ProductListWithShippingMethodProps {
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
  shippingMethod?: string;
}
interface ProductListProps {
  product: Product;
}

type ItemIdCooke = string | null;

const AuthConfirmBuyModal = withAuthentication(ConfirmBuyModal, AuthDialog);

const getCookie = (name: string) => {
  const cookieStr = document.cookie;
  const cookies = cookieStr.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
};

const Checkout: React.FC<ProductListProps> = ({ product }) => {
  const {
    id,
    title,
    description,
    pictures,
    price,
    fee,
    isBusiness,
    isNew,
    isSold,
  } = product;

  const [itemIdCookie, setItemIdCookie] = useState<ItemIdCooke>();
  const [isConfirmBuyModalOpen, setIsConfirmBuyModalOpen] = useState(false);

  const [productData, setProductData] =
    useState<ProductListWithShippingMethodProps>(product);

  const handleConfirmBuyModalOpen = () =>
    setIsConfirmBuyModalOpen((cur) => !cur);

  useEffect(() => {
    if (id) {
      setItemIdCookie(getCookie(`vendr-itemId[${id}]`));
    }
  }, [id]);

  const condition = isNew ? "Brand New" : "Used";
  const sellerCategory = isBusiness ? "Business" : "Individual";

  return (
    <section className="container mx-auto my-16 flex justify-center px-4 font-poppins sm:px-0">
      <div className="flex h-full w-[60%] flex-col justify-between bg-gray-300 p-5">
        <div className="pb-5 font-poppins text-3xl font-bold">Checkout</div>

        <div className="flex w-full flex-col justify-between pb-5">
          <div className="flex h-40 justify-between bg-gray-100 p-2">
            <div className="flex h-full w-[100%] flex-row justify-center font-poppins">
              <div className="flex h-full w-[50%] flex-col justify-center pl-2 font-poppins">
                <div className="text-xl">Item: {title}</div>
                <div className="text-xl">Price: {price}</div>
                <div className="text-xl">Fees: {fee}</div>
                <div className="text-xl">Condition: {condition}</div>
                <div className="text-xl">Seller Type: {sellerCategory}</div>
              </div>
              <div className="flex h-full w-[50%] justify-end">
                <div className="relative flex aspect-[1] h-[100%] justify-center">
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={JSON.parse(pictures)[0]}
                    alt={title}
                    fill
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-5">
          <div className="flex h-28 flex-row justify-between bg-gray-100  p-2">
            <div className="flex w-[50%] flex-col justify-center text-center font-poppins text-sm font-thin">
              SHIPPING
            </div>
            <div className="flex w-[50%] flex-col items-center justify-center">
              <div className="max-w-max">
                <Select label="Shipping Method">
                  <Option
                    onClick={() => {
                      setProductData((prev) => ({
                        ...prev,
                        shippingMethod: "Coordinate with seller",
                      }));
                    }}
                    className="text-left"
                  >
                    Coordinate with seller
                  </Option>
                  <Option className="text-left" disabled>
                    Shipped By Vendr
                  </Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-5">
          <div className="flex h-28 flex-row justify-between bg-gray-100  p-2">
            <div className="flex w-[50%] flex-col justify-center text-center font-poppins text-sm font-thin">
              MERCADOPAGO
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          {isSold ? (
            <div className="pt-5 text-red-800">Sold</div>
          ) : (
            <Button
              onClick={handleConfirmBuyModalOpen}
              disabled={!productData.shippingMethod}
              className="rounded-md bg-blue-brand"
            >
              CONFIRM PURCHASE
            </Button>
          )}
        </div>
      </div>
      <AuthConfirmBuyModal
        open={isConfirmBuyModalOpen}
        itemIdCookie={itemIdCookie}
        handleOpen={handleConfirmBuyModalOpen}
        productData={productData}
      />
    </section>
  );
};

export default Checkout;
