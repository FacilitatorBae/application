import { Checkbox, Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { api } from "~/utils/api";

interface CategoryListProps {
  searchTerm: string;
  productFilters: {
    isNew?: { true?: Number; false?: Number };
    isBusiness?: { true?: Number; false?: Number };
    categoryId?: Number;
  };
  setFilters: () => void;
}

const examples = [
  {
    id: 1,
    name: "Home",
    parentId: null,
    createdAt: "2023-07-14T02:42:41.503Z",
    deletedAt: null,
  },
  {
    id: 2,
    name: "Sports",
    parentId: null,
    createdAt: "2023-07-14T02:42:45.013Z",
    deletedAt: null,
  },
  {
    id: 3,
    name: "Gaming",
    parentId: null,
    createdAt: "2023-07-14T02:42:47.762Z",
    deletedAt: null,
  },
  {
    id: 4,
    name: "Electronics",
    parentId: null,
    createdAt: "2023-07-14T02:42:51.521Z",
    deletedAt: null,
  },
  {
    id: 5,
    name: "Health",
    parentId: null,
    createdAt: "2023-07-14T02:42:55.544Z",
    deletedAt: null,
  },
  {
    id: 6,
    name: "Music",
    parentId: null,
    createdAt: "2023-07-14T02:43:00.019Z",
    deletedAt: null,
  },
  {
    id: 7,
    name: "Adults",
    parentId: null,
    createdAt: "2023-07-14T02:43:03.707Z",
    deletedAt: null,
  },
  {
    id: 8,
    name: "Chair",
    parentId: 1,
    createdAt: "2023-07-14T02:43:23.725Z",
    deletedAt: null,
  },
  {
    id: 9,
    name: "Table",
    parentId: 1,
    createdAt: "2023-07-14T02:43:26.625Z",
    deletedAt: null,
  },
  {
    id: 10,
    name: "Grass",
    parentId: 1,
    createdAt: "2023-07-14T02:43:36.419Z",
    deletedAt: null,
  },
  {
    id: 11,
    name: "Basket",
    parentId: 2,
    createdAt: "2023-07-14T02:43:45.013Z",
    deletedAt: null,
  },
  {
    id: 12,
    name: "Football",
    parentId: 2,
    createdAt: "2023-07-14T02:43:48.480Z",
    deletedAt: null,
  },
  {
    id: 13,
    name: "Golf",
    parentId: 2,
    createdAt: "2023-07-14T02:43:51.549Z",
    deletedAt: null,
  },
  {
    id: 14,
    name: "Phones",
    parentId: 3,
    createdAt: "2023-07-14T02:44:03.362Z",
    deletedAt: null,
  },
  {
    id: 15,
    name: "Tablet",
    parentId: 3,
    createdAt: "2023-07-14T02:44:10.428Z",
    deletedAt: null,
  },
];

const findAllChildrenIds = (
  example,
  id,
  resultArray = [],
  reviewedArray = []
) => {
  const newArray = resultArray;
  example.sort((a, b) => {
    if (a.parentId === undefined || a.parentId < b.parentId) {
      return -1;
    }
    if (a.parentId > b.parentId) {
      return 1;
    }
    return 0;
  });

  example.forEach((item) => {
    if (item.parentId && !resultArray.includes(item.parentId)) {
      if (item.parentId === id) {
        resultArray.push(item.id);
        Array.isArray(reviewedArray) && reviewedArray.push(id);
      } else if (
        Array.isArray(reviewedArray) &&
        !reviewedArray.includes(item.parentId)
      ) {
        findAllChildrenIds(example, item.parentId, resultArray, reviewedArray);
        Array.isArray(reviewedArray) && reviewedArray.push(item.parentId);
      }
    }
  });
  return newArray;
};

console.log(findAllChildrenIds(examples, 3, [], []));

const valueFormatter = (key, value) => {
  switch (key) {
    case "isNew":
      return Boolean(value);
    case "isBusiness":
      return Boolean(value);
    case "categoryId":
      return Number(value);
    case "price":
      return Number(value);
    case "fee":
      return Number(value);
    default:
      break;
  }
};

const CategoryList: React.FC<CategoryListProps> = ({
  searchTerm,
  productFilters,
  setFilters,
}) => {
  const { data: categories } = api.categories.getAllCategories.useQuery();

  const subtitleMapper = (title, subTitle) => {
    switch (title) {
      case "isNew":
        return subTitle === "true" ? "Brand New" : "Used";
      case "isBusiness":
        return subTitle === "true" ? "Business" : "Individual";
      case "categoryId":
        return categories?.find((item) => item.id === Number(subTitle))?.name;
      default:
        break;
    }
  };

  const [priceFilter, setPriceFilter] = useState({ from: null, to: null });
  const [feeFilter, setFeeFilter] = useState({ from: null, to: null });
  return (
    <div className="flex h-full w-[25%] flex-col font-poppins">
      <div className="flex w-full flex-col">
        <div className="mb-5 w-full text-2xl">{searchTerm}</div>
        {productFilters?.map((categ) => {
          const categoryTitle = Object.keys(categ)[0];
          const subcategoriesTitlesAndValues = Object.values(categ)[0];
          const subcategoriesTitles = Object.keys(subcategoriesTitlesAndValues);
          return (
            <div key={categ.title} className="flex flex-col pb-3">
              <span className="text-lg font-medium">{categoryTitle}</span>
              {subcategoriesTitles?.map((child) => {
                return (
                  <div
                    key={Object.keys(child)[0]}
                    className="flex flex-row items-baseline font-light"
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          [categoryTitle]: valueFormatter(categoryTitle, child),
                        }));
                      }}
                    >
                      {subtitleMapper(categoryTitle, child)}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      ({subcategoriesTitlesAndValues[child]})
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="flex w-full flex-col pb-3">
          <span className="text-lg font-medium">Price</span>
          <div className="flex w-[80%] flex-row items-center justify-between">
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="From"
              onChange={(e) => {
                setPriceFilter((prev) => ({
                  ...prev,
                  from: valueFormatter("price", e.target.value),
                }));
              }}
            />
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="To"
              onChange={(e) => {
                setPriceFilter((prev) => ({
                  ...prev,
                  to: valueFormatter("price", e.target.value),
                }));
              }}
            />
            <Button
              className="ml-2 h-[30px] w-[30px] p-0"
              onClick={() => {
                setFilters((prev) => ({ ...prev, price: priceFilter }));
              }}
            >
              GO
            </Button>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <span className="text-lg font-medium">Fees</span>
          <div className="flex w-[80%] flex-row items-center justify-between">
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="From"
              onChange={(e) => {
                setFeeFilter((prev) => ({
                  ...prev,
                  from: valueFormatter("fee", e.target.value),
                }));
              }}
            />
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="To"
              onChange={(e) => {
                setFeeFilter((prev) => ({
                  ...prev,
                  to: valueFormatter("fee", e.target.value),
                }));
              }}
            />
            <Button
              onClick={() => {
                setFilters((prev) => ({ ...prev, fee: feeFilter }));
              }}
              className="ml-2 h-[30px] w-[30px] p-0"
            >
              GO
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col pb-3">
          <span className="text-lg font-medium">Others</span>
          <div className="flex w-[60%] flex-row items-center justify-between">
            <span className="font-light">Free shipping</span>
            <Checkbox
              ripple={false}
              containerProps={{
                className: "p-0",
              }}
              className="hover:before:opacity-0"
            />
          </div>
          <div className="flex w-[60%] flex-row items-center justify-between">
            <span className="font-light">Certified Sellers</span>
            <Checkbox
              ripple={false}
              containerProps={{ className: "p-0" }}
              className="hover:before:opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
