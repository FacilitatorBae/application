import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Define and use a default selection of fields to get type inference correctly
const defaultProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  title: true,
  isNew: true,
  isBusiness: true,
  isHot: true,
  url: true,
  price: true,
  fee: true,
  owner: true,
  categoryId: true,
});

export const productsRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      select: defaultProductSelect,
    });
    return products;
  }),
  getSearchProducts: publicProcedure
    .input(
      z.object({
        text: z.string(),
        field: z.enum(["price", "fee"]),
        criteria: z.enum(["asc", "desc"]),
      })
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        select: defaultProductSelect,
        where: {
          title: {
            contains: input.text,
          },
        },
        orderBy: [
          {
            [input.field]: input.criteria,
          },
        ],
      });
      return products;
    }),
  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        select: defaultProductSelect,
        where: { id: Number(input.id) },
      });
      return product;
    }),
});
