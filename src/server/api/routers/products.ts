import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Define and use a default selection of fields to get type inference correctly
const defaultProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  title: true,
  description: true,
  isNew: true,
  isBusiness: true,
  isHot: true,
  pictures: true,
  price: true,
  fee: true,
  owner: true,
  categoryId: true,
  category: true,
});

// Define and use a default selection of fields to get type inference correctly
const defaultCategorySelect = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  name: true,
  parentId: true,
  createdAt: true,
  deletedAt: true,
});

const findParentMost = (categArray, categoryData) => {
  if (categoryData?.parentId) {
    return findParentMost(
      categArray,
      categArray.find((item) => item.id === categoryData?.parentId)
    );
  } else return categoryData;
};

const findAllChildrenIds = (categArray, resultArray = [], id) => {
  categArray.sort((a, b) => {
    if (a.parentId === undefined || a.parentId < b.parentId) {
      return -1;
    }
    if (a.parentId > b.parentId) {
      return 1;
    }
    return 0;
  });

  console.log(resultArray);

  categArray.forEach((item) => {
    if (item.parentId && !resultArray.includes(item.parentId)) {
      if (item.parentId === id) {
        resultArray.push(item.id);
      } else {
        findAllChildrenIds(categArray, resultArray, item.id);
      }
    } else return;
  });
  return resultArray;
};

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
        filters: z
          .object({
            isNew: z.boolean().optional(),
            isBusiness: z.boolean().optional(),
            categoryId: z.number().optional(),
            price: z
              .object({
                from: z.number().optional(),
                to: z.number().optional(),
              })
              .optional(),
            fee: z
              .object({
                from: z.number().optional(),
                to: z.number().optional(),
              })
              .optional(),
          })
          .optional(),
        field: z.enum(["price", "fee"]),
        criteria: z.enum(["asc", "desc"]),
      })
    )
    .query(async ({ ctx, input }) => {
      const allCategories = await ctx.prisma.category.findMany({
        select: defaultCategorySelect,
      });

      let queryParams = {};
      input?.filters &&
        Object.keys(input.filters).forEach((key) => {
          if (key === "price" || key === "fee") {
            queryParams = {
              ...queryParams,
              [key]: {
                gte: input.filters?.[key].from,
                lte: input.filters?.[key].to,
              },
            };
          } else if (key === "categoryId") {
            console.log(
              findAllChildrenIds(allCategories, [], 3).map((item) => ({
                categoryId: item,
              }))
            );
            queryParams = {
              ...queryParams,
              OR: findAllChildrenIds(
                allCategories,
                [],
                input.filters?.[key]
              ).map((item) => ({ categoryId: item })),
            };
          } else {
            queryParams = { ...queryParams, [key]: input.filters?.[key] };
          }
        });

      const products = await ctx.prisma.product.findMany({
        select: defaultProductSelect,
        where: {
          title: {
            contains: input.text,
          },
          ...queryParams,
        },
        orderBy: [
          {
            [input.field]: input.criteria,
          },
        ],
      });

      const filterFields = ["isNew", "isBusiness", "categoryId"];

      const productFilters = filterFields.map((key) => {
        let keyCount = {};
        if (key === "isNew") {
          const unique = [...new Set(products.map((item) => item.isNew))];
          unique.forEach((item) => {
            keyCount = {
              ...keyCount,
              [item]: products.filter((value) => value?.[key] === item).length,
            };
          });
        }
        if (key === "isBusiness") {
          const unique = [...new Set(products.map((item) => item.isBusiness))];
          unique.forEach((item) => {
            keyCount = {
              ...keyCount,
              [item]: products.filter((value) => value?.[key] === item).length,
            };
          });
        }
        if (key === "categoryId") {
          const productsWithParentMostCategories = products.map((item) =>
            findParentMost(allCategories, item.category)
          );

          const unique = [...new Set(productsWithParentMostCategories)];

          unique.forEach((item) => {
            keyCount = {
              ...keyCount,
              [item.id]: productsWithParentMostCategories.filter(
                (value) => value?.id === item.id
              ).length,
            };
          });
        }
        return { [key]: keyCount };
      });

      return { products: products, productFilters: productFilters };
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
  newProduct: authenticatedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        isNew: z.boolean(),
        isBusiness: z.boolean(),
        isHot: z.boolean(),
        pictures: z.string(),
        price: z.string(),
        fee: z.string(),
        owner: z.string(),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProduct = await ctx.prisma.product.create({
        data: {
          title: input.title,
          description: input.description,
          isNew: input.isNew,
          isBusiness: input.isBusiness,
          isHot: input.isHot,
          pictures: input.pictures,
          price: Number(input.price),
          fee: Number(input.fee),
          owner: input.owner,
          categoryId: input.categoryId,
        },
      });
      return newProduct;
    }),
});
