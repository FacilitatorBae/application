import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import FavItem from "./Item/FavItem";
import { useContext } from "react";
import { Context } from "../../context/AppContext";
import { BiX } from "react-icons/bi";

const Favorites = () => {
  const { favorites, setFavorites } = useContext(Context);

  const favItems = favorites?.items?.map((item) => (
    <div key={item.id} className="mt-5 flex h-20 w-full flex-grow-0 flex-row	">
      <FavItem item={item} />
    </div>
  ));

  const onCloseClick = () => {
    setFavorites((prev: any) => ({ ...prev, isOpen: false }));
  };

  return (
    <Drawer
      placement="right"
      open={favorites.isOpen}
      overlay={false}
      onClose={onCloseClick}
      className="fixed top-0"
    >
      <div className="flex-start flex flex-col pl-6">
        <Button
          className="flex-start mt-[10px] flex flex-col pl-0 text-3xl"
          variant="text"
          onClick={onCloseClick}
        >
          <BiX />
        </Button>
        <Typography
          className="mt-[8px] font-bold"
          variant="h5"
          color="blue-gray"
        >
          Favorites
        </Typography>
        <div className="flex-start flex flex-grow flex-col overflow-hidden">
          {favorites?.items?.length ? (
            favItems
          ) : (
            <span className="flex h-[50vh] items-center justify-center">
              Add some items to Favorites
            </span>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default Favorites;
