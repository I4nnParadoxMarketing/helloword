import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import auditLog from "@emdash-cms/plugin-audit-log";
import { defineConfig, fontProviders, sessionDrivers } from "astro/config";
import emdash, { local, s3 } from "emdash/astro";
import { github } from "emdash/auth/providers/github";
import { libsql, sqlite } from "emdash/db";

const isProduction = import.meta.env.PROD;

const database = isProduction
	? libsql({
			// Turso Vercel integration sets TURSO_*; libSQL convention uses LIBSQL_*
			url: process.env.LIBSQL_DATABASE_URL ?? process.env.TURSO_DATABASE_URL,
			authToken:
				process.env.LIBSQL_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN,
		})
	: sqlite({ url: "file:./data.db" });

const storage = isProduction
	? s3({
			endpoint: process.env.S3_ENDPOINT,
			bucket: process.env.S3_BUCKET,
			accessKeyId: process.env.S3_ACCESS_KEY_ID,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
			region: process.env.S3_REGION ?? "auto",
			publicUrl: process.env.S3_PUBLIC_URL,
		})
	: local({
			directory: "./uploads",
			baseUrl: "/_emdash/api/media/file",
		});

export default defineConfig({
	output: "server",
	adapter: vercel(),
	site: process.env.SITE_URL,
	session: isProduction
		? {
				driver: sessionDrivers.upstash({
					url: process.env.UPSTASH_REDIS_REST_URL,
					token: process.env.UPSTASH_REDIS_REST_TOKEN,
				}),
			}
		: {
				driver: sessionDrivers.fs({ base: "./.astro/sessions" }),
			},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database,
			storage,
			plugins: [auditLog],
			authProviders: isProduction ? [github()] : [],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
