import { type Maybe } from "@trpc/server";
import type { FakeProduct } from "~/types";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { BiShareAlt } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";

interface ProductListProps {
  products: Maybe<FakeProduct[]>;
}

const Item: React.FC<ProductListProps> = ({ products }) => {
  const { id, title, image, price, fee, isHot, isBusiness, isNew } = products;

  const condition = isNew ? "Brand New" : "Used";
  const sellerCategory = isBusiness ? "Business" : "Individual";

  return (
    <section className="container mx-auto my-16 px-4 sm:px-0">
      <div className="mb-6 h-[20px] w-full">
        Category {`>`} Category {`>`} Category
      </div>
      <div className="flex w-full justify-between">
        <div className="relative flex aspect-[2/1] w-[45%] flex-col">
          <div className="relative h-[80%]">
            <Image
              className="h-full w-full object-cover object-center"
              src={image}
              alt={title}
              fill
              unoptimized
            />
          </div>
          <div className="mt-[20px] flex h-[200px] w-full flex-row justify-between">
            <div className="relative h-full w-[22.5%] ">
              <Image
                className="h-full w-full object-cover object-center"
                src={image}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative h-full w-[22.5%] ">
              <Image
                className="h-full w-full object-cover object-center"
                src={image}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative h-full w-[22.5%] ">
              <Image
                className="h-full w-full object-cover object-center"
                src={image}
                alt={title}
                fill
                unoptimized
              />
            </div>
            <div className="relative h-full w-[22.5%] ">
              <div className="absolute z-10 flex h-full w-full cursor-pointer items-center justify-center bg-white/70 backdrop-blur-[2px]">
                <span className="	text-2xl font-bold">View All</span>
              </div>
              <Image
                className="h-full w-full object-cover object-center"
                src={image}
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
              <Button className="h-full rounded-md bg-blue-brand">
                <IoHeart size={18} />
              </Button>
              <Button className=" ml-[10px] rounded-md bg-blue-brand">
                <BiShareAlt size={18} />
              </Button>
            </div>
          </div>
          <span className="pb-[16px] text-3xl font-medium">{title}</span>
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
