import { type Maybe } from "@trpc/server";
import Link from "next/link";
import ProductListItem from "./ProductListItem";
import { type Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";

interface ProductListProps {
  products: Maybe<Product[]>;
  classes: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, classes }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = (url) =>
      url === router.asPath && setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return isLoading ? (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
      <Spinner className="absolute h-16 w-16 p-0" />
    </div>
  ) : (
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
