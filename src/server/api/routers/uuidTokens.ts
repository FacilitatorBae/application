import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { v4 } from "uuid";

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
});
