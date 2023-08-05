import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { v4 } from "uuid";
import { Prisma } from "@prisma/client";

const defaultUuidTokenSelect = Prisma.validator<Prisma.UuidTokenSelect>()({
  id: true,
  token: true,
  product: true,
  user: true,
});

export const uuidTokensRouter = createTRPCRouter({
  newUuiToken: authenticatedProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const newUuiToken = await ctx.prisma.uuidToken.create({
        data: {
          userId: ctx.session.user.id,
          productId: input.productId,
          token: v4(),
        },
      });
      return newUuiToken;
    }),
  getDetailsByToken: authenticatedProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const detailsByToken = await ctx.prisma.uuidToken.findMany({
        select: defaultUuidTokenSelect,
        where: { token: input.token },
      });
      return detailsByToken;
    }),
});
