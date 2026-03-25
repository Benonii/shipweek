import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    telegram_channel_image: v.optional(v.string()),
    telegram_channel_name: v.string(),
    project_url: v.string(),
    repository: v.optional(v.string()),
    developer: v.string(),
    developerId: v.optional(v.string()),
    open_source: v.boolean(),
    stars: v.number(),
    upvotes: v.number(),
    upvoters: v.optional(v.array(v.string())),
    tags: v.string(),
  }),
});
