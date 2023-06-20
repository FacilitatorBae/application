import Image from "next/image";
import { Button, Tooltip } from "@material-tailwind/react";
import { BiTrash } from "react-icons/bi";
import { useFavorites } from "~/hooks/useFavorites";
import { type FakeProduct } from "~/types";

interface FavItemProps {
  item: FakeProduct;
}

const FavItem: React.FC<FavItemProps> = ({ item }) => {
  const { remove } = useFavorites();
  const onRemoveClick = () => {
    remove(item);
  };

  return (
    <>
      <div className="relative aspect-[1/1] h-full object-cover object-center">
        <Image
          className="h-full w-full object-cover object-center"
          src={item.url}
          alt={item.title}
          fill
          unoptimized
        />
      </div>
      <div className="ml-8 flex h-full w-full max-w-[45%] flex-col justify-center">
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap pb-[16px] font-medium ">
          <Tooltip className="z-[99999]" content={item.title}>
            {item.title}
          </Tooltip>
        </span>

        <span>Price: ${item.price}</span>
        <span className="text-green-800">Fee: ${item.fee}</span>
      </div>
      <Button
        className="flex-start ml-2 mt-0 flex h-6 flex-col p-0 text-xl"
        variant="text"
        onClick={onRemoveClick}
      >
        <BiTrash />
      </Button>
    </>
  );
};

export default FavItem;
