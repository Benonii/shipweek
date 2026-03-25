import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteAllProjects = internalMutation({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    for (const project of projects) {
      await ctx.db.delete(project._id);
    }
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects.sort((a, b) => b.upvotes - a.upvotes);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    telegram_channel_name: v.string(),
    project_url: v.string(),
    repository: v.optional(v.string()),
    developer: v.string(),
    open_source: v.boolean(),
    tags: v.string(),
    stars: v.optional(v.number()),
    storageId: v.optional(v.id("_storage")),
    developerId: v.optional(v.string()), // Added developerId
  },
  handler: async (ctx, args) => {
    let telegram_channel_image = "";
    if (args.storageId) {
      telegram_channel_image = (await ctx.storage.getUrl(args.storageId)) || "";
    }

    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      telegram_channel_name: args.telegram_channel_name,
      project_url: args.project_url,
      repository: args.repository,
      developer: args.developer,
      developerId: args.developerId,
      open_source: args.open_source,
      tags: args.tags,
      telegram_channel_image,
      stars: args.stars ?? 0,
      upvotes: 0,
      upvoters: [], // Initializes upvoters
    });
    return projectId;
  },
});

export const upvote = mutation({
  args: {
    id: v.id("projects"),
    userId: v.string(), // Added userId
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) throw new Error("Project not found");
    
    const currentUpvoters = project.upvoters || [];

    // Check if the user has already upvoted
    if (currentUpvoters.includes(args.userId)) {
      throw new Error("You have already upvoted this contender.");
    }

    await ctx.db.patch(args.id, {
      upvotes: project.upvotes + 1,
      upvoters: [...currentUpvoters, args.userId],
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("projects"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) throw new Error("Project not found");
    if (project.developerId !== args.userId) {
      throw new Error("Unauthorized: Only the creator can delete this project.");
    }
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
