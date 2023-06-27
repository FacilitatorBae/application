import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Define and use a default selection of fields to get type inference correctly
const defaultCategorySelect = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  name: true,
  parentId: true,
  createdAt: true,
  deletedAt: true,
});

export const categoriesRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      select: defaultCategorySelect,
    });
    return categories;
  }),
  getCategoryNestById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let nestedCategories = [];

      const categories = await ctx.prisma.category.findMany({
        select: defaultCategorySelect,
      });
      const product = await ctx.prisma.category.findUnique({
        select: defaultCategorySelect,
        where: { id: Number(input.id) },
      });

      const hasParentCategory = (id) => {
        const categoryItem = categories.find((item) => item.id === id);
        const categoryName = categories.find(
          (item) => item.id === categoryItem.id
        ).name;
        nestedCategories.push(categoryName);
        if (categoryItem?.parentId) {
          hasParentCategory(categoryItem?.parentId);
        }
      };
      hasParentCategory(product?.id);

      nestedCategories = nestedCategories.reverse();
      return nestedCategories;
    }),
});
