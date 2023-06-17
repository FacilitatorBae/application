import { CategoryList, ProductList } from "~/components";
import { Select, Option } from "@material-tailwind/react";

const fakeProducts: FakeProduct[] = [
  {
    id: "aaabbbccc1",
    title: "Mountain Bike Scot 26' Wheels - Excellent for young people",
    image: "https://source.unsplash.com/random/?motorcycle",
    isHot: true,
    isNew: false,
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

const Search = () => {
  return (
    <section className="container mx-auto mt-16 flex px-4 sm:px-0">
      <CategoryList />
      <div className="w-full">
        <div className="flex justify-end">
          <div className="mb-4 max-w-max">
            <Select label="Sort By">
              <Option>Price (low to high)</Option>
              <Option>Price (high to low)</Option>
              <Option>Fees (low to high)</Option>
              <Option>Fees (high to low)</Option>
              <Option>Relevance</Option>
            </Select>
          </div>
        </div>
        <ProductList
          products={fakeProducts}
          classes="md:grid-cols-[repeat(auto-fit,minmax(250px,_1fr))]"
        />
      </div>
    </section>
  );
};

export default Search;
