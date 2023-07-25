import { Checkbox, Input, Button } from "@material-tailwind/react";
import { type Category } from "@prisma/client";
import { useState } from "react";

interface PriceFilters {
  from?: number;
  to?: number;
}

interface FeesFilters {
  from?: number;
  to?: number;
}

interface ProductFilters {
  isNew?: boolean;
  isBusiness?: boolean;
  categoryId?: number;
  price?: PriceFilters;
  fee?: FeesFilters;
}

interface CategoryListProps {
  categories?: Category[];
  searchTerm: string;
  productFiltersCount?: {
    isNew?: { true?: number; false?: number };
    isBusiness?: { true?: number; false?: number };
    categoryId?: number;
  }[];
  setFilters: (productFilters?: ProductFilters) => void;
}

const valueFormatter = (key: string, value: string) => {
  switch (key) {
    case "isNew":
      return Boolean(value);
    case "isBusiness":
      return Boolean(value);
    case "categoryId":
      return Number(value);
    default:
      break;
  }
};

const CategoryList: React.FC<CategoryListProps> = ({
  searchTerm,
  categories,
  productFiltersCount,
  setFilters,
}) => {
  const subtitleMapper = (title: string, subTitle: string) => {
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

  const titleMapper = (title: string) => {
    switch (title) {
      case "isNew":
        return "Condition";
      case "isBusiness":
        return "Seller Type";
      case "categoryId":
        return "Category";
      default:
        break;
    }
  };

  const [priceFilter, setPriceFilter] = useState<PriceFilters>({
    from: undefined,
    to: undefined,
  });
  const [feeFilter, setFeeFilter] = useState<FeesFilters>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="flex h-full w-[25%] flex-col font-poppins">
      <div className="flex w-full flex-col">
        <div className="mb-5 w-full text-2xl">{searchTerm}</div>
        {productFiltersCount?.map((categ) => {
          const categoryTitle = Object.keys(categ)[0];
          const subcategoriesTitlesAndValues = Object.values(categ)[0];
          const subcategoriesTitles =
            subcategoriesTitlesAndValues &&
            Object.keys(subcategoriesTitlesAndValues);
          return (
            <div key={categoryTitle} className="flex flex-col pb-3">
              <span className="text-lg font-medium">
                {Object.keys(
                  productFiltersCount.find((item) => item?.[categoryTitle])?.[
                    categoryTitle
                  ]
                ).length
                  ? titleMapper(categoryTitle)
                  : null}
              </span>
              {subcategoriesTitles?.map((child: string) => {
                return (
                  <div
                    key={Object.keys(child)[0]}
                    className="flex flex-row items-baseline font-light"
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setFilters((prev: ProductFilters) => ({
                          ...prev,
                          [categoryTitle]: valueFormatter(categoryTitle, child),
                        }));
                      }}
                    >
                      {categoryTitle && subtitleMapper(categoryTitle, child)}
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
                setPriceFilter((prev: PriceFilters) => ({
                  ...prev,
                  from: Number(e.target.value),
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setFilters((prev: ProductFilters) => ({
                    ...prev,
                    price: priceFilter,
                  }));
                }
              }}
            />
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="To"
              onChange={(e) => {
                setPriceFilter((prev: PriceFilters) => ({
                  ...prev,
                  to: Number(e.target.value),
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setFilters((prev: ProductFilters) => ({
                    ...prev,
                    price: priceFilter,
                  }));
                }
              }}
            />
            <Button
              className="ml-2 h-[30px] w-[30px] p-0"
              onClick={() => {
                setFilters((prev: ProductFilters) => ({
                  ...prev,
                  price: priceFilter,
                }));
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
                setFeeFilter((prev: FeesFilters) => ({
                  ...prev,
                  from: Number(e.target.value),
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setFilters((prev: ProductFilters) => ({
                    ...prev,
                    fee: feeFilter,
                  }));
                }
              }}
            />
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="To"
              onChange={(e) => {
                setFeeFilter((prev: FeesFilters) => ({
                  ...prev,
                  to: Number(e.target.value),
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setFilters((prev: ProductFilters) => ({
                    ...prev,
                    fee: feeFilter,
                  }));
                }
              }}
            />
            <Button
              onClick={() => {
                setFilters((prev: ProductFilters) => ({
                  ...prev,
                  fee: feeFilter,
                }));
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
