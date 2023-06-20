import { type Maybe } from "@trpc/server";
import Link from "next/link";
import ProductListItem from "./ProductListItem";
import { type Product } from "@prisma/client";

interface ProductListProps {
  products: Maybe<Product[]>;
  classes: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, classes }) => {
  return (
    <div className={`grid grid-cols-1 justify-center gap-4 ${classes}`}>
      {products && products.length > 0
        ? products.map((product) => {
            return (
              <Link
                key={product.id}
                href={{
                  pathname: "/items/[id]",
                  query: { id: String(product.id) },
                }}
              >
                <ProductListItem product={product} />
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default ProductList;
