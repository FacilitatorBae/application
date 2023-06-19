import Link from "next/link";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  Badge,
} from "@material-tailwind/react";
import { IoHeartOutline, IoSearch } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import { menuItemsLabel, menuItemsFields } from "./models";
import { useFavorites } from "~/hooks/useFavorites";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const { MY_PROFILE, MY_ORDERS, LOGOUT, LOGIN } = menuItemsFields;

const Header = () => {
  const { status } = useSession();
  const router = useRouter();
  const searchParms = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParms && searchParms.get("q")
  );
  const { items, togglePanel } = useFavorites();

  const onSearchClick = () => {
    searchValue && router.push(`search?q=${searchValue}`);
  };

  const onMenuItemClick = (item: string) => {
    switch (item) {
      case MY_PROFILE:
        break;
      case MY_ORDERS:
        break;
      case LOGOUT:
        void signOut();
        break;
      case LOGIN:
        void signIn();
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
            <Link href="/">
              <span className="font-comfortaa text-2xl">tOUHU</span>
            </Link>
          </div>
          <div className="flex-1 px-7">
            <form className="mx-auto flex max-w-lg items-center">
              <div className="relative w-full">
                <Input
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSearchClick();
                    }
                  }}
                  type="text"
                  label="Search"
                />
                <button
                  type="button"
                  onClick={onSearchClick}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                >
                  <IoSearch />
                </button>
              </div>
            </form>
          </div>
          <div className="flex w-1/4 items-center justify-end space-x-8">
            <button
              onClick={togglePanel}
              className="group/cart aspect-square relative flex w-[38px] items-center justify-center text-2xl hover:bg-blue-brand hover:text-white"
            >
              {/* TODO: Check why we are getting errors on console regarding prop type `placement` */}
              <Badge invisible={!items.length} content={items.length}>
                <IoHeartOutline />
              </Badge>
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
