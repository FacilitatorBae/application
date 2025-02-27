import { Badge } from "~/components";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useMemo } from "react";
import { useFavorites } from "~/hooks/useFavorites";
import { Tooltip } from "@material-tailwind/react";
import { type Product } from "@prisma/client";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const {
    items: favorites,
    add: addFavorite,
    remove: removeFavorite,
  } = useFavorites();

  const isItemFaved = useMemo(
    () => favorites.find((item) => item.id === product.id),
    [favorites, product]
  );

  const onFavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isItemFaved) {
      addFavorite(product);
    } else {
      removeFavorite(product);
    }
  };

  return (
    <div className="group relative mb-8 w-full cursor-pointer font-poppins shadow-md transition duration-300 hover:shadow-xl">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg md:aspect-h-16 md:aspect-w-15">
        <picture className="relative">
          <button
            onClick={onFavClick}
            className="absolute right-0 mr-5 mt-5 hidden text-xl group-hover:block"
          >
            {isItemFaved ? (
              <IoHeart color="red" />
            ) : (
              <IoHeartOutline color="black" />
            )}
          </button>
          <img
            src={JSON.parse(product.pictures)[0]}
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
          <span className="text-xl font-medium">Price: ${product.price}</span>
          <span className="text-xl font-medium text-green-800 ">
            Fee: ${product.fee}
          </span>
        </div>

        <span className="hidden overflow-hidden text-ellipsis whitespace-nowrap text-sm font-thin group-hover:block">
          <Tooltip placement="bottom" content={product.title}>
            {product.title}
          </Tooltip>
        </span>
      </div>
    </div>
  );
};

export default ProductListItem;
