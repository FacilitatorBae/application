import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Checkout from "../../../../components/Checkout";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

export default function Post() {
  const router = useRouter<"/items/[id]">();

  const { data } = api.products.getProductById.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id, trpc: { ssr: true } }
  );
  if (!data) {
    return null;
  }

  return <Checkout product={data} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  /*
   * Prefetching the `products.getProductById` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   * @link https://trpc.io/docs/client/nextjs/server-side-helpers
   */
  await helpers.products.getProductById.prefetch({ id });

  // Make sure to return { props: { trpcState: helpers.dehydrate() } }
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}
