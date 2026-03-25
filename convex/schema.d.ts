declare const _default: import("convex/server").SchemaDefinition<{
    projects: import("convex/server").TableDefinition<import("convex/values").VObject<{
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
    }, {
        name: import("convex/values").VString<string, "required">;
        telegram_channel_image: import("convex/values").VString<string | undefined, "optional">;
        telegram_channel_name: import("convex/values").VString<string, "required">;
        project_url: import("convex/values").VString<string, "required">;
        repository: import("convex/values").VString<string | undefined, "optional">;
        developer: import("convex/values").VString<string, "required">;
        developerId: import("convex/values").VString<string | undefined, "optional">;
        open_source: import("convex/values").VBoolean<boolean, "required">;
        stars: import("convex/values").VFloat64<number, "required">;
        upvotes: import("convex/values").VFloat64<number, "required">;
        upvoters: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
        tags: import("convex/values").VString<string, "required">;
    }, "required", "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags">, {}, {}, {}>;
}, true>;
export default _default;
