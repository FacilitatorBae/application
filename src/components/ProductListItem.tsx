import { Badge } from "~/components";
import { type FakeProduct } from "~/types";
import { BiHeart } from "react-icons/bi";
import { useContext, useMemo, useState } from "react";
import { Context } from "./../context/AppContext";

interface ProductListItemProps {
  product: FakeProduct;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { favorites, setFavorites } = useContext(Context);
  const [isHovered, setIsHovered] = useState(false);

  const isItemFaved = useMemo(
    () => favorites.items.find((item) => item.id === product.id),
    [favorites, product]
  );

  const onFavClick = () => {
    const newFavArray = favorites.items;
    if (Array.isArray(newFavArray)) {
      if (!isItemFaved) {
        newFavArray.push(product);
        setFavorites((prev: any) => ({
          ...prev,
          items: newFavArray,
        }));
      } else {
        const newFavArrayRemove: any = [];
        newFavArray.forEach((item) => {
          if (item.id !== product.id) {
            newFavArrayRemove.push(item);
          }
        });
        setFavorites((prev: any) => ({ ...prev, items: newFavArrayRemove }));
      }
    }
  };

  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      className="group relative mb-8 w-full cursor-pointer shadow-md transition duration-300 hover:shadow-xl"
    >
      <div className="aspect-h-1 aspect-w-1  overflow-hidden rounded-lg md:aspect-h-16 md:aspect-w-15">
        <picture className="relative">
          {isHovered && (
            <button
              onClick={onFavClick}
              className="absolute right-0 mr-5 mt-5 text-xl"
            >
              <BiHeart color={`${isItemFaved ? "pink" : "black"}`} />
            </button>
          )}
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </picture>
      </div>
      <div className="min-h-24 absolute bottom-[-25px] left-1/2 w-[90%] -translate-x-1/2 space-y-4 rounded-lg bg-white/40 p-4 backdrop-blur-md transition duration-300 group-hover:bg-white/50">
        <div className="flex items-start justify-between">
          <div className="flex justify-center gap-2">
            <Badge size="small" variant="success">
              {product.isBusiness ? "Business" : "Individual"}
            </Badge>
            <Badge size="small"> {product.isNew ? "New" : "Used"}</Badge>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold">Price: ${product.price}</span>
          <span className="text-xl font-semibold text-green-800 ">
            Fee: ${product.fee}
          </span>
        </div>
        {isHovered && (
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {product.title}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductListItem;
