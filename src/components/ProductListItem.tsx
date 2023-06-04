import { Badge } from "~/components";
import { FcGlobe } from "react-icons/fc";
import { type FakeProduct } from "~/types";
import { BiHeart } from "react-icons/bi";
import { useContext } from "react";
import { Context } from "./../context/AppContext";

interface ProductListItemProps {
  product: FakeProduct;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { favorites, setFavorites } = useContext(Context);

  const onFavClick = () => {
    if (Array.isArray(favorites.items)) {
      console.log(favorites.items);
      const newFavArray = favorites.items;
      newFavArray.push(product);
      setFavorites((prev: any) => ({
        ...prev,
        items: newFavArray,
      }));
    }
  };

  return (
    <div className="group relative mb-8 w-full cursor-pointer shadow-md transition duration-300 hover:shadow-xl">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden md:aspect-h-16 md:aspect-w-15">
        <picture className="relative">
          <button
            onClick={onFavClick}
            className="absolute right-0 mr-5 mt-5 opacity-0 group-hover:opacity-[100%]"
          >
            <BiHeart />
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </picture>
      </div>
      <div className="min-h-24 absolute bottom-0 left-1/2 w-full -translate-x-1/2 space-y-4 bg-white/40 p-4 backdrop-blur-md transition duration-300 group-hover:bg-white/50">
        <div className="flex items-start justify-between">
          <span className="text-xl font-bold leading-4">{product.title}</span>
          <div className="flex justify-center gap-2">
            <Badge size="small" variant="success">
              {product.isBusiness ? "Business" : "Individual"}
            </Badge>
            <Badge size="small"> {product.isNew ? "New" : "Used"}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-1">
            <FcGlobe />
            <span>Buenos Aires, San Isidro</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
