import Link from "next/link";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import { IoHeartOutline, IoSearch } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import { useFavorites } from "~/hooks/useFavorites";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const { status } = useSession();
  const router = useRouter<"/search/[q]">();
  const searchParams = router.query.q as string;
  const [searchValue, setSearchValue] = useState("");
  const { items, togglePanel } = useFavorites();

  useEffect(() => {
    searchParams && setSearchValue(searchParams);
  }, [searchParams]);

  const onSearchClick = () => {
    if (searchValue) {
      // TODO: Fix eslint to not yell @typescript-eslint/no-floating-promises
      void router.push({ pathname: "/search/[q]", query: { q: searchValue } });
    }
  };

  const onMyAccountClick = () => {
    void router.push({ pathname: "/myAccount" });
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
              <span className="font-comfortaa text-2xl">VENDio</span>
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
                  value={searchValue}
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
              <div className="relative inline-flex">
                <IoHeartOutline />
                {Boolean(items.length) && (
                  <span className="absolute right-[2%] top-[4%] grid min-h-[24px] min-w-[24px] -translate-y-2/4 translate-x-2/4 place-items-center rounded-full bg-red-500 px-1 py-1 text-xs font-medium leading-none text-white content-['']">
                    {items.length}
                  </span>
                )}
              </div>
              <div className="aspect-square absolute bottom-2 right-2 w-2.5 rounded-full bg-blue-brand group-hover/cart:bg-white" />
            </button>
            <Menu placement="bottom-end">
              <MenuHandler>
                {/* <Button variant="gradient">Bottom End</Button> */}
                <button className="flex items-center justify-center">
                  <span className="font-poppins text-sm">Options</span>
                  <span className="text-2xl">
                    <MdOutlineExpandMore />
                  </span>
                </button>
              </MenuHandler>
              {status === "authenticated" ? (
                <MenuList className="rounded-none">
                  <MenuItem
                    onClick={onMyAccountClick}
                    className="flex justify-start rounded-none hover:bg-blue-brand hover:text-white"
                  >
                    My Account
                  </MenuItem>
                  <MenuItem className="flex justify-start rounded-none  hover:bg-blue-brand hover:text-white">
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => void signOut()}
                    className="flex justify-start rounded-none hover:bg-blue-brand hover:text-white"
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              ) : (
                <MenuList className="w-[100px] rounded-none">
                  <MenuItem
                    onClick={() => void signIn()}
                    className="flex  justify-start rounded-none hover:bg-blue-brand hover:text-white"
                  >
                    Log in
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
