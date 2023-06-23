import { CategoryList, ProductList } from "~/components";
import { Select, Option } from "@material-tailwind/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { menuItemsLabel, firstCharToCaps } from "./models";
import { useState } from "react";

const Search = () => {
  const router = useRouter<"/search/[q]">();
  const [sortField, setSortField] = useState("price");
  const [sortCriteria, setSortCriteria] = useState("asc");

  const { data: searchProducts } = api.products.getSearchProducts.useQuery(
    {
      text: router.query.q as string,
      field: sortField as string,
      criteria: sortCriteria as string,
    },
    { enabled: !!router.query.q }
  );

  const onOptionClick = (item: string) => {
    setSortField(menuItemsLabel[item]?.field);
    setSortCriteria(menuItemsLabel[item].criteria);
  };

  const sortOptions = Object.keys(menuItemsLabel).map((item) => (
    <Option key={item} onClick={onOptionClick.bind(null, item)}>
      {menuItemsLabel[item]?.label}
    </Option>
  ));

  return (
    <section className="container mx-auto mt-16 flex px-4 sm:px-0">
      <CategoryList searchTerm={firstCharToCaps(router.query.q || "")} />
      <div className="w-full">
        <div className="flex justify-end">
          <div className="mb-4 max-w-max">
            <Select label="Sort By">{sortOptions}</Select>
          </div>
        </div>
        <ProductList
          products={searchProducts || []}
          classes="md:grid-cols-[repeat(4,minmax(250px,_1fr))]"
        />
      </div>
    </section>
  );
};

export default Search;
