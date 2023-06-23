import { api } from "~/utils/api";
import { CategoryCard } from "~/components";

const Home = () => {
  const { data: categoryCardData } = api.example.getCategoryCards.useQuery();

  if (!categoryCardData) return null;

  return (
    <section className="container mx-auto mt-16 px-4 sm:px-0">
      {categoryCardData?.map((category) => (
        <CategoryCard
          key={category.categoryTitle}
          categoryTitle={category.categoryTitle}
          categoryImg={category.categoryImg}
          products={category.products}
        />
      ))}
    </section>
  );
};

export default Home;
