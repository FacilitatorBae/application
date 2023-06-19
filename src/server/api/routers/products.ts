import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();
    return products;
  }),
  getSearchProducts: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany();
      const filteredArray = products.filter((item) =>
        item.title.includes(input.text)
      );
      return filteredArray;
    }),
});
