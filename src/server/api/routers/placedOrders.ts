import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultPlacedOrderSelect = Prisma.validator<Prisma.PlacedOrderSelect>()({
  id: true,
  status: true,
  sellerUser: true,
  buyerUser: true,
  facilitatorUser: true,
  product: true,
  createdAt: true,
  updatedAt: true,
});
const defaultUuidTokenSelect = Prisma.validator<Prisma.UuidTokenSelect>()({
  token: true,
  userId: true,
});
const defaultProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  isSold: true,
});

export const placedOrdersRouter = createTRPCRouter({
  getSaleOrdersByUserId: authenticatedProcedure.query(async ({ ctx }) => {
    const saleOrdersByUserId = await ctx.prisma.placedOrder.findMany({
      select: defaultPlacedOrderSelect,
      where: { sellerUserId: ctx.session.user.id },
    });

    const mappedData = saleOrdersByUserId.map((item) => {
      const body = {
        id: item.id,
        status: item.status,
        amount: item.product?.price,
        fees: item.product?.fee,
        item: item.product?.title,
        buyer: item.buyerUser?.name,
        creationDate: item.createdAt.toLocaleDateString("es-AR"),
        updateDate: item.updatedAt.toLocaleDateString("es-AR"),
      };

      if (item.facilitatorUser) {
        body.facilitator = item.facilitatorUser.name;
      }
      return body;
    });

    return mappedData;
  }),
  getPurchaseOrdersByUserId: authenticatedProcedure.query(async ({ ctx }) => {
    const purchaseOrdersByUserId = await ctx.prisma.placedOrder.findMany({
      select: defaultPlacedOrderSelect,
      where: { buyerUserId: ctx.session.user.id },
    });

    const mappedData = purchaseOrdersByUserId.map((item) => {
      const body = {
        id: item.id,
        status: item.status,
        amount: item.product?.price,
        fees: item.product?.fee,
        item: item.product?.title,
        seller: item.sellerUser?.name,
        creationDate: item.createdAt.toLocaleDateString("es-AR"),
        updateDate: item.updatedAt.toLocaleDateString("es-AR"),
      };

      if (item.facilitatorUser) {
        body.facilitator = item.facilitatorUser.name;
      }
      return body;
    });

    return mappedData;
  }),
  getCommOrdersByUserId: authenticatedProcedure.query(async ({ ctx }) => {
    const commOrdersByUserId = await ctx.prisma.placedOrder.findMany({
      select: defaultPlacedOrderSelect,
      where: { facilitatorUserId: ctx.session.user.id },
    });

    const mappedData = commOrdersByUserId.map((item) => {
      const body = {
        id: item.id,
        status: item.status,
        amount: item.product?.price,
        fees: item.product?.fee,
        item: item.product?.title,
        seller: item.sellerUser?.name,
        buyer: item.buyerUser?.name,
        creationDate: item.createdAt.toLocaleDateString("es-AR"),
        updateDate: item.updatedAt.toLocaleDateString("es-AR"),
      };
      return body;
    });

    return mappedData;
  }),
  buyOrder: authenticatedProcedure
    .input(
      z.object({
        productData: z.object({
          productId: z.number(),
          owner: z.string(),
          shippingMethod: z.string(),
        }),
        token: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let facilitatorData = null;

      if (input.token) {
        facilitatorData = await ctx.prisma.uuidToken.findMany({
          select: defaultUuidTokenSelect,
          where: { token: input.token },
        });
      }

      const isProductSold = await ctx.prisma.product.findUnique({
        select: defaultProductSelect,
        where: { id: input.productData.productId },
      });

      if (!isProductSold?.isSold) {
        const newOrder = await ctx.prisma.placedOrder.create({
          data: {
            status: "Sold",
            sellerUserId: input.productData.owner,
            buyerUserId: ctx.session.user.id,
            productId: input.productData.productId,
            shippingMethod: input.productData.shippingMethod,
            ...(facilitatorData?.[0]?.userId
              ? { facilitatorUserId: facilitatorData[0].userId }
              : {}),
          },
        });

        if (newOrder) {
          const updatedProduct = await ctx.prisma.product.update({
            where: {
              id: input.productData.productId,
            },
            data: {
              isSold: true,
            },
          });
          return updatedProduct;
        }

        return newOrder;
      }
    }),
});
