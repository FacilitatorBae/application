import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { productsRouter } from "./routers/products";
import { categoriesRouter } from "./routers/categories";
import { uuidTokensRouter } from "./routers/uuidTokens";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  products: productsRouter,
  categories: categoriesRouter,
  users: usersRouter,
  uuidTokens: uuidTokensRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
