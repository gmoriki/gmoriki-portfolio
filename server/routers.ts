import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  works: router({
    list: publicProcedure.query(async () => {
      const works = await db.getAllWorks();
      // Parse tags from JSON string to array
      return works.map(work => ({
        ...work,
        tags: JSON.parse(work.tags) as string[],
      }));
    }),
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const work = await db.getWorkById(input.id);
        if (!work) return null;
        return {
          ...work,
          tags: JSON.parse(work.tags) as string[],
        };
      }),
    create: protectedProcedure
      .input(
        z.object({
          year: z.string(),
          date: z.string(),
          title: z.string(),
          description: z.string(),
          organization: z.string().optional(),
          link: z.string().optional(),
          image: z.string().optional(),
          tags: z.array(z.string()),
        })
      )
      .mutation(async ({ input }) => {
        const work = await db.createWork({
          ...input,
          tags: JSON.stringify(input.tags),
        });
        return {
          ...work,
          tags: JSON.parse(work.tags) as string[],
        };
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          year: z.string().optional(),
          date: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          organization: z.string().optional(),
          link: z.string().optional(),
          image: z.string().optional(),
          tags: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, tags, ...rest } = input;
        const work = await db.updateWork(id, {
          ...rest,
          ...(tags ? { tags: JSON.stringify(tags) } : {}),
        });
        return {
          ...work,
          tags: JSON.parse(work.tags) as string[],
        };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteWork(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
