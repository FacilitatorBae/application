import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineExpandMore } from "react-icons/md";

const Header = () => {
  return (
    <>
      <div className="bg-blue-brand flex justify-center p-2 font-inter text-white text-xs">
        Get the offer of 50% on your first 3 orders
      </div>
      <header className="px-4 shadow-lg bg-white">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex justify-start w-1/4">
            <a href="#">
              <span className="text-2xl font-comfortaa">tOUHU</span>
            </a>
          </div>
          <div className="flex-1 px-7">
            <form className="flex items-center max-w-lg mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  className="focus:outline-none bg-gray-50 border border-gray-300 focus:ring-blue-brand focus:border-blue-brand text-sm block w-full pr-10 p-2 "
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
          <div className="flex items-center justify-end space-x-8 w-1/4">
            <button className="group/cart relative flex justify-center items-center w-[38px] aspect-square text-2xl hover:bg-blue-brand hover:text-white">
              <BiShoppingBag />
              <div className="absolute right-2 bottom-2 w-2.5 aspect-square rounded-full bg-blue-brand group-hover/cart:bg-white" />
            </button>
            <Menu placement="bottom-end">
              <MenuHandler>
                {/* <Button variant="gradient">Bottom End</Button> */}
                <button className="flex justify-center items-center">
                  <span className="font-poppins text-sm">My Account</span>
                  <span className="text-2xl">
                    <MdOutlineExpandMore />
                  </span>
                </button>
              </MenuHandler>
              <MenuList className="rounded-none">
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
