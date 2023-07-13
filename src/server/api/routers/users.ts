import { createTRPCRouter, authenticatedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  privacyAccepted: true,
  image: true,
  address: true,
  paymentMethod: true,
  createdAt: true,
  deletedAt: true,
  displayName: true,
  firstName: true,
  lastName: true,
  password: true,
  updatedAt: true,
});

export const usersRouter = createTRPCRouter({
  getUserDetails: authenticatedProcedure.query(async ({ ctx }) => {
    const account = await ctx.prisma.user.findUnique({
      select: defaultUserSelect,
      where: { id: ctx.session.user.id },
    });
    return account;
  }),
  updateUserAddress: authenticatedProcedure
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
      const updatedAddress = await ctx.prisma.address.upsert({
        where: {
          userId: ctx.session.user.id,
        },
        create: {
          address: input.address,
          addressDetails: input.addressDetails,
          zipCode: input.zipCode,
          state: input.state,
          country: input.country,
          userId: ctx.session.user.id,
        },
        update: {
          address: input.address,
          addressDetails: input.addressDetails,
          zipCode: input.zipCode,
          state: input.state,
          country: input.country,
        },
      });
      return updatedAddress;
    }),
});
