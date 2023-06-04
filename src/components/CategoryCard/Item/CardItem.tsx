import Image from "next/image";

interface CardItemProps {
  label: string;
  url: string;
  price: number;
  fee: number;
}

const CardItem: React.FC<CardItemProps> = ({ label, url, price, fee }) => {
  return (
    <div className="group">
      <Image
        className="absolute h-full w-full object-cover object-center"
        src={url}
        alt={label}
        fill
        unoptimized
      />
      <div className="group absolute h-full w-full bg-white opacity-0 group-hover:opacity-[70%]"></div>
      <div className="absolute flex h-full w-full flex-col items-center justify-center opacity-0 group-hover:opacity-[100%] group-hover:backdrop-blur-[2px]">
        <span className="pb-[16px] font-medium">{label}</span>
        <span>Price: ${price}</span>
        <span className="text-green-800">Fee: ${fee}</span>
      </div>
    </div>
  );
};

export default CardItem;
