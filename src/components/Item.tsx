import Image from "next/image";
import { Button, Spinner } from "@material-tailwind/react";
import { BiShareAlt } from "react-icons/bi";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useFavorites } from "~/hooks/useFavorites";
import { useEffect, useMemo, useState } from "react";
import { type Product } from "@prisma/client";
import { api } from "~/utils/api";
import FacilitateModal from "./Modals/FacilitateModal";
import BuyModal from "./Modals/BuyModal";
import { withAuthentication } from "~/hocs/withAuthentication";
import AuthDialog from "./AuthDialog";

interface ProductListProps {
  product: Product;
}
type ItemIdCooke = string | null;

const AuthBuyModal = withAuthentication(BuyModal, AuthDialog);
const AuthFacilitateModal = withAuthentication(FacilitateModal, AuthDialog);

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

const Item: React.FC<ProductListProps> = ({ product }) => {
  const {
    items: favorites,
    add: addFavorite,
    remove: removeFavorite,
  } = useFavorites();

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
  const { data: categoryNest, isLoading } =
    api.categories.getCategoryNestById.useQuery({
      id: product.categoryId?.toString(),
    });

  const [isFacilitateModalOpen, setIsFacilitateModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [itemIdCookie, setItemIdCookie] = useState<ItemIdCooke>();

  const handleBuyModalOpen = () => setIsBuyModalOpen((cur) => !cur);

  const handleFacilitateModalOpen = () =>
    setIsFacilitateModalOpen((cur) => !cur);

  useEffect(() => {
    if (id) {
      setItemIdCookie(getCookie(`vendr-itemId[${id}]`));
    }
  }, [id]);

  const categoriesComponent = categoryNest?.map((item) => {
    const isLastItem = categoryNest.length === categoryNest.indexOf(item) + 1;
    return isLastItem ? item : `${item} > `;
  });

  const isItemFaved = useMemo(
    () => favorites.find((item) => item.id === id),
    [favorites, id]
  );

  const onFavClick = () => {
    if (!isItemFaved) {
      addFavorite(product);
    } else {
      removeFavorite(product);
    }
  };

  const condition = isNew ? "Brand New" : "Used";
  const sellerCategory = isBusiness ? "Business" : "Individual";

  return isLoading ? (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
      <Spinner className="absolute h-16 w-16 p-0" />
    </div>
  ) : (
    <section className="container mx-auto my-16 px-4 font-poppins sm:px-0">
      <div className="mb-6 h-[20px] w-full">{categoriesComponent}</div>
      <div className="flex w-full justify-between">
        <div className="relative flex aspect-[2/1] w-[45%] flex-col">
          <div className="relative h-[80%]">
            <Image
              className="h-full w-full object-cover object-center"
              src={JSON.parse(pictures)[0]}
              alt={title}
              fill
              unoptimized
            />
          </div>
          <div className="mt-[20px] flex max-h-[200px] w-full flex-row justify-between">
            <div className="relative aspect-[1] w-[22.5%]">
              <Image
                className="h-full w-full object-cover object-center"
                src={JSON.parse(pictures)[1]}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative aspect-[1] w-[22.5%]">
              <Image
                className="h-full w-full object-cover object-center"
                src={JSON.parse(pictures)[2]}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative aspect-[1] w-[22.5%]">
              <Image
                className="h-full w-full object-cover object-center"
                src={JSON.parse(pictures)[0]}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative aspect-[1] w-[22.5%]">
              <div className="absolute z-10 flex h-full w-full cursor-pointer items-center justify-center bg-white/70 backdrop-blur-[2px]">
                <span className="	text-xl font-bold">View All</span>
              </div>
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

        <div className="flex aspect-[1/1] w-[45%] flex-col">
          <div className="flex w-full justify-between pb-5">
            <div className="flex w-[50%] items-center">
              <span className="mr-5 pb-0 font-medium">{condition}</span>
              <span className="pb-0 font-medium">{sellerCategory}</span>
            </div>
            <div className="flex w-[50%] justify-end">
              <button className="mr-5 text-3xl">
                {isItemFaved ? (
                  <IoHeart onClick={onFavClick} color="red" />
                ) : (
                  <IoHeartOutline onClick={onFavClick} color="black" />
                )}
              </button>
              <Button className=" ml-[10px] rounded-md bg-blue-brand">
                <BiShareAlt size={18} />
              </Button>
            </div>
          </div>
          <span className="pb-[16px] text-3xl font-thin">{title}</span>
          <span className="pb-2 text-2xl font-medium">Price: ${price}</span>
          <span className="text-2xl font-medium text-green-800">
            Fee: ${fee}
          </span>
          {isSold ? (
            <div className="pt-5 text-red-800">Sold</div>
          ) : (
            <div className="pt-5">
              <Button
                onClick={handleBuyModalOpen}
                className="rounded-md bg-blue-brand"
              >
                BUY
              </Button>
              <Button
                onClick={handleFacilitateModalOpen}
                className="ml-5 rounded-md bg-blue-100 text-blue-brand"
              >
                FACILITATE
              </Button>
            </div>
          )}
          <div className="break-all pt-10">
            <span>{description}</span>
          </div>
        </div>
      </div>
      <AuthBuyModal
        open={isBuyModalOpen}
        itemIdCookie={itemIdCookie}
        handleOpen={handleBuyModalOpen}
      />
      <AuthFacilitateModal
        open={isFacilitateModalOpen}
        productId={id}
        handleOpen={handleFacilitateModalOpen}
      />
    </section>
  );
};

export default Item;
