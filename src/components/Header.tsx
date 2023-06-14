import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";
import { BiHeart } from "react-icons/bi";
import { useContext } from "react";
import { Context } from "./../context/AppContext";
import { MdOutlineExpandMore } from "react-icons/md";
import { menuItemsLabel, menuItemsFields } from "./models";
import { signIn, signOut, useSession } from "next-auth/react";

const { MY_PROFILE, MY_ORDERS, LOGOUT, LOGIN } = menuItemsFields;

const Header = () => {
  const { data: sessionData, status } = useSession();
  const { setFavorites } = useContext(Context);

  const onFavsClick = () => {
    setFavorites((prev: any) => ({ ...prev, isOpen: true }));
  };

  console.log({ sessionData });

  const onMenuItemClick = (item: string) => {
    switch (item) {
      case MY_PROFILE:
        break;
      case MY_ORDERS:
        break;
      case LOGOUT:
        signOut();
        break;
      case LOGIN:
        signIn();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="bg-blue-brand p-2 font-inter text-xs text-white">
        <div className="container mx-auto flex justify-end">
          <span>Become a Partner</span>
          <span className="pl-4">Sell your Products</span>
        </div>
      </div>
      <header className="bg-white px-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex w-1/4 justify-start">
            <a href="../">
              <span className="font-comfortaa text-2xl">tOUHU</span>
            </a>
          </div>
          <div className="flex-1 px-7">
            <form className="mx-auto flex max-w-lg items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  className="block w-full border border-gray-300 bg-gray-50 p-2 pr-10 text-sm focus:border-blue-brand focus:outline-none focus:ring-blue-brand "
                  placeholder="Search"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                >
                  <IoSearch />
                </button>
              </div>
            </form>
          </div>
          <div className="flex w-1/4 items-center justify-end space-x-8">
            <button
              onClick={onFavsClick}
              className="group/cart aspect-square relative flex w-[38px] items-center justify-center text-2xl hover:bg-blue-brand hover:text-white"
            >
              <BiHeart />
              <div className="aspect-square absolute bottom-2 right-2 w-2.5 rounded-full bg-blue-brand group-hover/cart:bg-white" />
            </button>
            <Menu placement="bottom-end">
              <MenuHandler>
                {/* <Button variant="gradient">Bottom End</Button> */}
                <button className="flex items-center justify-center">
                  <span className="font-poppins text-sm">My Account</span>
                  <span className="text-2xl">
                    <MdOutlineExpandMore />
                  </span>
                </button>
              </MenuHandler>
              {status === "authenticated" ? (
                <MenuList className="rounded-none">
                  <MenuItem
                    onClick={onMenuItemClick.bind(null, MY_PROFILE)}
                    className="flex justify-start rounded-none hover:bg-blue-brand hover:text-white"
                  >
                    {menuItemsLabel[MY_PROFILE]?.label}
                  </MenuItem>
                  <MenuItem
                    onClick={onMenuItemClick.bind(null, MY_ORDERS)}
                    className="flex justify-start rounded-none  hover:bg-blue-brand hover:text-white"
                  >
                    {menuItemsLabel[MY_ORDERS]?.label}
                  </MenuItem>
                  <MenuItem
                    onClick={onMenuItemClick.bind(null, LOGOUT)}
                    className="flex justify-start rounded-none hover:bg-blue-brand hover:text-white"
                  >
                    {menuItemsLabel[LOGOUT]?.label}
                  </MenuItem>
                </MenuList>
              ) : (
                <MenuList className="w-[100px] rounded-none">
                  <MenuItem
                    onClick={onMenuItemClick.bind(null, LOGIN)}
                    className="flex  justify-start rounded-none hover:bg-blue-brand hover:text-white"
                  >
                    {menuItemsLabel[LOGIN]?.label}
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
