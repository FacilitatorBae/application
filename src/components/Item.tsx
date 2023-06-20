import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { BiShareAlt } from "react-icons/bi";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useFavorites } from "~/hooks/useFavorites";
import { useMemo } from "react";
import { type Product } from "@prisma/client";

interface ProductListProps {
  product: Product;
}

const Item: React.FC<ProductListProps> = ({ product }) => {
  const {
    items: favorites,
    add: addFavorite,
    remove: removeFavorite,
  } = useFavorites();

  const { id, title, url, price, fee, isBusiness, isNew } = product;

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

  return (
    <section className="container mx-auto my-16 px-4 font-poppins sm:px-0">
      <div className="mb-6 h-[20px] w-full">
        Category {`>`} Category {`>`} Category
      </div>
      <div className="flex w-full justify-between">
        <div className="relative flex aspect-[2/1] w-[45%] flex-col">
          <div className="relative h-[80%]">
            <Image
              className="h-full w-full object-cover object-center"
              src={url}
              alt={title}
              fill
              unoptimized
            />
          </div>
          <div className="mt-[20px] flex h-[200px] w-full flex-row justify-between">
            <div className="relative h-full w-[22.5%] ">
              <Image
                className="h-full w-full object-cover object-center"
                src={url}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative h-full w-[22.5%] ">
              <Image
                className="h-full w-full object-cover object-center"
                src={url}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative h-full w-[22.5%] ">
              <Image
                className="h-full w-full object-cover object-center"
                src={url}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative h-full w-[22.5%] ">
              <div className="absolute z-10 flex h-full w-full cursor-pointer items-center justify-center bg-white/70 backdrop-blur-[2px]">
                <span className="	text-xl font-bold">View All</span>
              </div>
              <Image
                className="h-full w-full object-cover object-center"
                src={url}
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
          <div className="pt-5">
            <Button className="rounded-md bg-blue-brand">BUY</Button>
            <Button className="ml-5 rounded-md bg-blue-100 text-blue-brand">
              FACILITATE
            </Button>
          </div>
          <span className="pt-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Item;
