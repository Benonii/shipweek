import { type GenericCtx } from "@convex-dev/better-auth";
import { type BetterAuthOptions } from "better-auth/minimal";
import type { DataModel } from "./_generated/dataModel";
export declare const authComponent: {
    adapter: (ctx: GenericCtx<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>) => import("better-auth/adapters").AdapterFactory<import("better-auth").BetterAuthOptions>;
    getAuth: <T extends import("@convex-dev/better-auth").CreateAuth<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>>(createAuth: T, ctx: GenericCtx<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>) => Promise<{
        auth: ReturnType<T>;
        headers: Headers;
    }>;
    getHeaders: (ctx: GenericCtx<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>) => Promise<Headers>;
    safeGetAuthUser: (ctx: GenericCtx<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>) => Promise<{
        _id: import("convex/values").GenericId<"user">;
        _creationTime: number;
        image?: string | null | undefined | undefined;
        userId?: string | null | undefined | undefined;
        twoFactorEnabled?: boolean | null | undefined | undefined;
        isAnonymous?: boolean | null | undefined | undefined;
        username?: string | null | undefined | undefined;
        displayUsername?: string | null | undefined | undefined;
        phoneNumber?: string | null | undefined | undefined;
        phoneNumberVerified?: boolean | null | undefined | undefined;
        createdAt: number;
        updatedAt: number;
        email: string;
        emailVerified: boolean;
        name: string;
    } | undefined>;
    getAuthUser: (ctx: GenericCtx<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>) => Promise<{
        _id: import("convex/values").GenericId<"user">;
        _creationTime: number;
        image?: string | null | undefined | undefined;
        userId?: string | null | undefined | undefined;
        twoFactorEnabled?: boolean | null | undefined | undefined;
        isAnonymous?: boolean | null | undefined | undefined;
        username?: string | null | undefined | undefined;
        displayUsername?: string | null | undefined | undefined;
        phoneNumber?: string | null | undefined | undefined;
        phoneNumberVerified?: boolean | null | undefined | undefined;
        createdAt: number;
        updatedAt: number;
        email: string;
        emailVerified: boolean;
        name: string;
    }>;
    getAnyUserById: (ctx: GenericCtx<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>, id: string) => Promise<{
        _id: import("convex/values").GenericId<"user">;
        _creationTime: number;
        image?: string | null | undefined | undefined;
        userId?: string | null | undefined | undefined;
        twoFactorEnabled?: boolean | null | undefined | undefined;
        isAnonymous?: boolean | null | undefined | undefined;
        username?: string | null | undefined | undefined;
        displayUsername?: string | null | undefined | undefined;
        phoneNumber?: string | null | undefined | undefined;
        phoneNumberVerified?: boolean | null | undefined | undefined;
        createdAt: number;
        updatedAt: number;
        email: string;
        emailVerified: boolean;
        name: string;
    } | null>;
    setUserId: (ctx: import("convex/server").GenericMutationCtx<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>, authId: string, userId: string) => Promise<void>;
    clientApi: () => {
        getAuthUser: import("convex/server").RegisteredQuery<"public", {}, Promise<{
            _id: import("convex/values").GenericId<"user">;
            _creationTime: number;
            image?: string | null | undefined | undefined;
            userId?: string | null | undefined | undefined;
            twoFactorEnabled?: boolean | null | undefined | undefined;
            isAnonymous?: boolean | null | undefined | undefined;
            username?: string | null | undefined | undefined;
            displayUsername?: string | null | undefined | undefined;
            phoneNumber?: string | null | undefined | undefined;
            phoneNumberVerified?: boolean | null | undefined | undefined;
            createdAt: number;
            updatedAt: number;
            email: string;
            emailVerified: boolean;
            name: string;
        }>>;
    };
    triggersApi: () => {
        onCreate: import("convex/server").RegisteredMutation<"internal", {
            model: string;
            doc: any;
        }, Promise<void>>;
        onUpdate: import("convex/server").RegisteredMutation<"internal", {
            model: string;
            oldDoc: any;
            newDoc: any;
        }, Promise<void>>;
        onDelete: import("convex/server").RegisteredMutation<"internal", {
            model: string;
            doc: any;
        }, Promise<void>>;
    };
    registerRoutes: (http: import("convex/server").HttpRouter, createAuth: import("@convex-dev/better-auth").CreateAuth<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>, opts?: {
        cors?: boolean | {
            allowedOrigins?: string[];
            allowedHeaders?: string[];
            exposedHeaders?: string[];
        };
    }) => void;
    registerRoutesLazy: <T extends import("@convex-dev/better-auth").CreateAuth<{
        projects: {
            document: {
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
            };
            fieldPaths: "_id" | ("_creationTime" | "name" | "telegram_channel_image" | "telegram_channel_name" | "project_url" | "repository" | "developer" | "developerId" | "open_source" | "stars" | "upvotes" | "upvoters" | "tags");
            indexes: {
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>>(http: import("convex/server").HttpRouter, createAuth: T, opts?: {
        basePath?: string;
        trustedOrigins?: import("@convex-dev/better-auth/utils").TrustedOriginsOption;
        cors?: boolean | {
            allowedOrigins?: string[];
            allowedHeaders?: string[];
            exposedHeaders?: string[];
        };
    }) => void;
};
export declare const createAuthOptions: (ctx: GenericCtx<DataModel>) => {
    database: import("better-auth/adapters").AdapterFactory<BetterAuthOptions>;
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
        };
    };
    trustedOrigins: string[];
};
export declare const createAuth: (ctx: GenericCtx<DataModel>) => import("better-auth").Auth<{
    database: import("better-auth/adapters").AdapterFactory<BetterAuthOptions>;
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
        };
    };
    trustedOrigins: string[];
}>;
export declare const getCurrentUser: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"user">;
    _creationTime: number;
    image?: string | null | undefined | undefined;
    userId?: string | null | undefined | undefined;
    twoFactorEnabled?: boolean | null | undefined | undefined;
    isAnonymous?: boolean | null | undefined | undefined;
    username?: string | null | undefined | undefined;
    displayUsername?: string | null | undefined | undefined;
    phoneNumber?: string | null | undefined | undefined;
    phoneNumberVerified?: boolean | null | undefined | undefined;
    createdAt: number;
    updatedAt: number;
    email: string;
    emailVerified: boolean;
    name: string;
} | null>>;
