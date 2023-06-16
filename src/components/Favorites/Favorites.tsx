import { Drawer, Button, Typography } from "@material-tailwind/react";
import FavItem from "./Item/FavItem";
import { BiX } from "react-icons/bi";
import { useFavorites } from "~/hooks/useFavorites";

const Favorites = () => {
  const { items, togglePanel, isOpen } = useFavorites();

  return (
    <Drawer
      placement="right"
      open={isOpen}
      overlay={false}
      onClose={togglePanel}
      className="fixed top-0"
    >
      <div className="flex-start flex flex-col pl-6">
        <Button
          className="flex-start mt-[10px] flex flex-col pl-0 text-3xl"
          variant="text"
          onClick={togglePanel}
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
          {items.length ? (
            items.map((item) => (
              <div
                key={item.id}
                className="mt-5 flex h-20 w-full flex-grow-0 flex-row	"
              >
                <FavItem item={item} />
              </div>
            ))
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
