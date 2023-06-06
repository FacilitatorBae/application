import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { BiTrash } from "react-icons/bi";
import { useContext } from "react";
import { Context } from "../../../context/AppContext";

interface FavItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    fee: number;
    isHot: boolean;
    isBusiness: boolean;
    isNew: boolean;
  };
}

const FavItem: React.FC<FavItemProps> = ({
  item: { id, title, image, price, fee, isHot, isBusiness, isNew },
}) => {
  const { favorites, setFavorites } = useContext(Context);
  const onRemoveClick = () => {
    let newFavArray: any = [];
    favorites.items.forEach((item) => {
      if (item.id !== id) {
        newFavArray.push(item);
      }
    });

    setFavorites((prev: any) => ({ ...prev, items: newFavArray }));
  };

  return (
    <>
      <div className="relative aspect-[1/1] h-full object-cover object-center">
        <Image
          className="h-full w-full object-cover object-center"
          src={image}
          alt={title}
          fill
          unoptimized
        />
      </div>
      <div className="ml-8 flex h-full w-full max-w-[45%] flex-col justify-center">
        <span className="pb-[16px] font-medium">{title}</span>
        <span>Price: ${price}</span>
        <span className="text-green-800">Fee: ${fee}</span>
      </div>
      <Button
        className="flex-start mt-0 flex h-6 flex-col p-0 text-xl"
        variant="text"
        onClick={onRemoveClick}
      >
        <BiTrash />
      </Button>
    </>
  );
};

export default FavItem;
