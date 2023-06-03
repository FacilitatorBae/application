// import { api } from "~/utils/api";
import { useContext } from "react";
import { Context } from "./../context/AppContext";
import { ProductList } from "../components";
import type { FakeProduct } from "../types";
import { signIn, signOut, useSession } from "next-auth/react";

const fakeProducts: FakeProduct[] = [
  {
    id: "aaabbbccc1",
    title: "Bike",
    image: "https://source.unsplash.com/random/?motorcycle",
    isHot: true,
    isNew: true,
    isBusiness: true,
    price: 4999,
    fee: 499,
  },
  {
    id: "aaabbbccc2",
    title: "Hammers set",
    image: "https://source.unsplash.com/random/?hammers",
    isHot: true,
    isNew: true,
    isBusiness: true,
    price: 14999,
    fee: 799,
  },
  {
    id: "aaabbbccc3",
    title: "iPhone 11",
    image: "https://source.unsplash.com/random/?iphone11",
    isHot: false,
    isNew: true,
    isBusiness: true,
    price: 74999,
    fee: 1499,
  },
  {
    id: "aaabbbccc5",
    title: "Headphones",
    image: "https://source.unsplash.com/random/?headphones",
    isHot: false,
    isNew: true,
    isBusiness: true,
    price: 8999,
    fee: 99,
  },
  {
    id: "aaabbbccc6",
    title: "iPad",
    image: "https://source.unsplash.com/random/?ipad",
    isHot: true,
    isNew: true,
    isBusiness: false,
    price: 8999,
    fee: 99,
  },
  {
    id: "aaabbbccc7",
    title: "Nike Air",
    image: "https://source.unsplash.com/random/?nike,air",
    isHot: false,
    isNew: false,
    isBusiness: true,
    price: 8999,
    fee: 99,
  },
  {
    id: "aaabbbccc8",
    title: "Macbook Pro M1",
    image: "https://source.unsplash.com/random/?macbook,pro,m1",
    isHot: false,
    isNew: true,
    isBusiness: false,
    price: 8999,
    fee: 99,
  },
];
const Home = () => {
  // const { data: products } = api.products.getAllProducts.useQuery();
  // console.log({ products: products });
  const { data: sessionData, status } = useSession();
  console.log({ sessionData });

  return (
    <section className="container mx-auto mt-16 px-4 sm:px-0">
      <ProductList products={fakeProducts} />
      {status === "unauthenticated" && (
        <button
          onClick={() => void signIn()}
          className="flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Login
        </button>
      )}
      {status === "authenticated" && (
        <button
          onClick={() => void signOut()}
          className="flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Logout
        </button>
      )}
    </section>
  );
};

export default Home;
