export declare const deleteAllProjects: import("convex/server").RegisteredMutation<"internal", {}, Promise<void>>;
export declare const get: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"projects">;
    _creationTime: number;
    telegram_channel_image?: string | undefined;
    repository?: string | undefined;
    developerId?: string | undefined;
    upvoters?: string[] | undefined;
    name: string;
    telegram_channel_name: string;
    project_url: string;
    developer: string;
    open_source: boolean;
    stars: number;
    upvotes: number;
    tags: string;
}[]>>;
export declare const create: import("convex/server").RegisteredMutation<"public", {
    repository?: string | undefined;
    developerId?: string | undefined;
    stars?: number | undefined;
    storageId?: import("convex/values").GenericId<"_storage"> | undefined;
    name: string;
    telegram_channel_name: string;
    project_url: string;
    developer: string;
    open_source: boolean;
    tags: string;
}, Promise<import("convex/values").GenericId<"projects">>>;
export declare const upvote: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"projects">;
    userId: string;
}, Promise<void>>;
export declare const remove: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"projects">;
    userId: string;
}, Promise<void>>;
export declare const generateUploadUrl: import("convex/server").RegisteredMutation<"public", import("node_modules/convex/dist/esm-types/server/registration").EmptyObject, Promise<string>>;
