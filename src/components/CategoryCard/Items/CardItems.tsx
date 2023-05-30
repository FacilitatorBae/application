import Image from "next/image";

interface CardItemsProps {
  label: string;
  url: string;
  price: number;
  fee: number;
}

const CardItems: React.FC<CardItemsProps> = ({ label, url, price, fee }) => {
  return (
    <div className="group">
      <Image
        className="h-full w-full object-cover object-center absolute"
        src={url}
        alt={label}
        fill
        unoptimized
      />
      <div className="group h-full w-full bg-white absolute opacity-0 group-hover:opacity-[70%]"></div>
      <div className="h-full w-full flex flex-col justify-center items-center absolute opacity-0 group-hover:backdrop-blur-[2px] group-hover:opacity-[100%]">
        <span className="pb-[16px] font-medium">{label}</span>
        <span>Price: ${price}</span>
        <span className="text-green-800">Fee: ${fee}</span>
      </div>
    </div>
  );
};

export default CardItems;
