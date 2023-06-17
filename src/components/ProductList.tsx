import { type Maybe } from "@trpc/server";
import Link from "next/link";
import ProductListItem from "./ProductListItem";
import type { FakeProduct } from "~/types";

interface ProductListProps {
  products: Maybe<FakeProduct[]>;
  classes: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, classes }) => {
  return (
    <div className={`grid grid-cols-1 justify-center gap-4 ${classes}`}>
      {products && products.length > 0
        ? products.map((product) => {
            const url = `/items/${product?.id}`;
            return (
              <Link key={product.id} href={url}>
                <ProductListItem product={product} />
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default ProductList;
