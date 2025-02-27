import { CategoryList, ProductList } from "~/components";
import { Select, Option, Spinner } from "@material-tailwind/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import {
  sortMenuItems,
  firstCharToCaps,
  type SortField,
  type SortCriteria,
  type SortMenuItem,
} from "./utils";
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

const initialProductFilters = {
  isNew: undefined,
  isBusiness: undefined,
  categoryId: undefined,
  price: { from: undefined, to: undefined },
  fee: { from: undefined, to: undefined },
};

const Search = () => {
  const router = useRouter<"/search/[q]">();
  const [sort, setSort] = useState<{
    field: SortField;
    criteria: SortCriteria;
  }>({ field: "price", criteria: "asc" });
  const [filters, setFilters] = useState<ProductFilters>(initialProductFilters);

  const { data: data, isLoading: isLoadingProducts } =
    api.products.getSearchProducts.useQuery(
      {
        text: router.query.q as string,
        field: sort.field,
        criteria: sort.criteria,
        filters: filters,
      },
      {
        enabled: !!router.query.q,
      }
    );

  const { data: categories, isLoading: isLoadingCategories } =
    api.categories.getAllCategories.useQuery();

  const onOptionClick = (item: SortMenuItem) => {
    setSort({ field: item.field, criteria: item.criteria });
  };

  const sortOptions = sortMenuItems.map((item) => (
    <Option key={item.label} onClick={() => onOptionClick(item)}>
      {item.label}
    </Option>
  ));

  return (
    <section className="container mx-auto	mt-16 flex min-h-[60vh] px-4 sm:px-0">
      {isLoadingProducts || isLoadingCategories ? (
        <div className="flex h-full min-h-[60vh] w-full items-center justify-center ">
          <Spinner className="h-16 w-16" />
        </div>
      ) : (
        <>
          <CategoryList
            searchTerm={firstCharToCaps(router.query.q || "")}
            setFilters={setFilters}
            categories={categories}
            productFiltersCount={data?.productFiltersCount}
          />
          <div className="w-full">
            <div className="flex justify-end">
              <div className="mb-4 max-w-max">
                <Select label="Sort By">{sortOptions}</Select>
              </div>
            </div>

            <ProductList
              products={data?.products || []}
              classes="md:grid-cols-[repeat(4,minmax(250px,_1fr))]"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
