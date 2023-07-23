import { CategoryList, ProductList } from "~/components";
import { Select, Option } from "@material-tailwind/react";
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

const Search = () => {
  const router = useRouter<"/search/[q]">();
  const [sort, setSort] = useState<{
    field: SortField;
    criteria: SortCriteria;
  }>({ field: "price", criteria: "asc" });
  const [filters, setFilters] = useState<{
    isNew?: Boolean;
    isBusiness?: Boolean;
    categoryId?: Number;
    price?: { from: Number; to: Number };
    fee?: { from: Number; to: Number };
  }>();

  const { data: data } = api.products.getSearchProducts.useQuery(
    {
      text: router.query.q as string,
      field: sort.field,
      criteria: sort.criteria,
      filters: filters,
    },
    { enabled: !!router.query.q }
  );

  console.log(filters);
  console.log(data?.products);

  const onOptionClick = (item: SortMenuItem) => {
    setSort({ field: item.field, criteria: item.criteria });
  };

  const sortOptions = sortMenuItems.map((item) => (
    <Option key={item.label} onClick={() => onOptionClick(item)}>
      {item.label}
    </Option>
  ));

  return (
    <section className="container mx-auto mt-16 flex px-4 sm:px-0">
      <CategoryList
        searchTerm={firstCharToCaps(router.query.q || "")}
        setFilters={setFilters}
        productFilters={data?.productFilters}
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
    </section>
  );
};

export default Search;
