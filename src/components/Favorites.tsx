import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Context } from "./../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Favorites = () => {
  const { favorites, setFavorites } = useContext(Context);

  const onCloseClick = () => {
    setFavorites((prev: any) => ({ ...prev, isOpen: false }));
  };

  console.log(favorites.isOpen);

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
          className="flex-start mt-[10px] flex flex-col pl-0"
          variant="text"
          onClick={onCloseClick}
        >
          <FontAwesomeIcon
            icon={faClose}
            style={{ color: "black", fontSize: 20 }}
          />
        </Button>
        <Typography
          className="mt-[8px] font-bold"
          variant="h5"
          color="blue-gray"
        >
          Favorites
        </Typography>
        <div className="text-align: center">
          <span>No hay una mierda</span>
        </div>
      </div>
    </Drawer>
  );
};

export default Favorites;
