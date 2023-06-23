import { api } from "~/utils/api";
import { ProductList } from "../components";

const Home = () => {
  const { data } = api.products.getAllProducts.useQuery();

  return (
    <section className="container mx-auto mt-16 px-4 sm:px-0">
      {data ? (
        <ProductList
          products={data}
          classes="md:grid-cols-[repeat(auto-fit,minmax(300px,_1fr))]"
        />
      ) : (
        "NO DATA"
      )}
    </section>
  );
};

export default Home;
