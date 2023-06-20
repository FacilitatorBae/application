import { CategoryList, ProductList } from "~/components";
import { Select, Option } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";

const Search = () => {
  const searchParms = useSearchParams();
  const searchText = searchParms.get("q");

  const { data: searchProducts } = api.products.getSearchProducts.useQuery({
    text: searchText,
  });

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
          products={searchProducts || []}
          classes="md:grid-cols-[repeat(4,minmax(250px,_1fr))]"
        />
      </div>
    </section>
  );
};

export default Search;
