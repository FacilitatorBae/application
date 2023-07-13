import {
  createTRPCRouter,
  publicProcedure,
  authenticatedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Define and use a default selection of fields to get type inference correctly
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  privacyAccepted: true,
  image: true,
  addressId: true,
  address: true,
  paymentMethodId: true,
  paymentMethod: true,
  createdAt: true,
  deletedAt: true,
  displayName: true,
  firstName: true,
  lastName: true,
  password: true,
  updatedAt: true,
});

export const userDetailsRouter = createTRPCRouter({
  getUserDetailsById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const account = await ctx.prisma.user.findUnique({
        select: defaultUserSelect,
        where: { id: input.id },
      });
      return account;
    }),
  updateUserDetailsById: authenticatedProcedure
    .input(
      z.object({
        address: z.string(),
        addressDetails: z.string(),
        zipCode: z.string(),
        country: z.string(),
        state: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUserId = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          address: {
            update: {
              address: input.address,
              addressDetails: input.addressDetails,
              zipCode: input.zipCode,
              state: input.state,
              country: input.country,
            },
          },
        },
      });
      return updatedUserId;
    }),
});
