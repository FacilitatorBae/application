import { api } from "~/utils/api";
import { ProductList } from "../components";
import { Spinner } from "@material-tailwind/react";

const Home = () => {
  const { data, isLoading } = api.products.getAllProducts.useQuery();

  return (
    <section className="container mx-auto mt-16 min-h-[60vh] px-4 sm:px-0">
      {isLoading ? (
        <div className="flex h-full min-h-[60vh] w-full items-center justify-center ">
          <Spinner className="h-16 w-16" />
        </div>
      ) : (
        <ProductList
          products={data}
          classes="md:grid-cols-[repeat(5,minmax(250px,_1fr))]"
        />
      )}
    </section>
  );
};

export default Home;
