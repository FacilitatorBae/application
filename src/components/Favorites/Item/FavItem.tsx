import Image from "next/image";

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
      <div className="ml-8 flex h-full w-full flex-col justify-center">
        <span className="pb-[16px] font-medium">{title}</span>
        <span>Price: ${price}</span>
        <span className="text-green-800">Fee: ${fee}</span>
      </div>
    </>
  );
};

export default FavItem;
