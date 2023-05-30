import { type Maybe } from "@trpc/server";
import Link from "next/link";
import ProductListItem from "./ProductListItem";
import type { FakeProduct } from "~/types";

interface ProductListProps {
  products: Maybe<FakeProduct[]>;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-[repeat(auto-fit,minmax(300px,_1fr))]">
      {products && products.length > 0
        ? products.map((product) => (
            <Link key={product.id} href="/">
              <ProductListItem product={product} />
            </Link>
          ))
        : null}
    </div>
  );
};

export default ProductList;
