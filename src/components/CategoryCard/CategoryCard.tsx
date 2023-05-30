import Image from "next/image";
import CardItems from "./Items/CardItems";

interface CategoryCardProps {
  categoryTitle: string;
  categoryImg: string;
  products?: Array<{ label: string; url: string; price: number; fee: number }>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryTitle,
  categoryImg,
  products,
}) => {
  const productItems = products?.map((item) => (
    <div key={item.label} className="relative aspect-[1/1] h-1/2">
      <CardItems
        label={item.label}
        url={item.url}
        price={item.price}
        fee={item.fee}
      />
    </div>
  ));

  return (
    <div className="relative mb-8 aspect-[10/1] h-full font-poppins">
      <div className="mb-[10px]">{categoryTitle.toUpperCase()}</div>
      <hr className="mb-[15px] border-gray-500" />
      <div className="flex aspect-[5/1] w-full flex-row ">
        <div className="relative flex aspect-[1/1] h-full items-center justify-center">
          <Image
            alt={categoryTitle.toUpperCase()}
            className="absolute h-full w-full object-cover object-center"
            src={categoryImg}
            fill
            unoptimized
          />
          <div className="absolute h-full w-full backdrop-blur-[2px]" />
          <div className="absolute h-full w-full bg-white/70" />
          <div className="absolute text-2xl	font-bold">
            {categoryTitle.toUpperCase()}
          </div>
          <div className="absolute bottom-[5%] right-[5%] text-sm">
            View All
          </div>
        </div>
        <div className="flex w-full flex-row flex-wrap">{productItems}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
