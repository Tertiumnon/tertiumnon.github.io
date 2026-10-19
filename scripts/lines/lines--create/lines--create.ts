#!/usr/bin/env bun
// Writes src/assets/lines.json: the latest posts of a Bluesky account, from the public API (no key needed).
import * as fs from "node:fs/promises";
import * as path from "node:path";

const HANDLE = "tertiumnon.bsky.social";
const API = "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed";
const OUT_FILE = path.join("src/assets", "lines.json");
const LIMIT = 50;

export interface Line {
	uri: string;
	url: string;
	text: string;
	createdAt: string;
	author: { handle: string; displayName: string; avatar: string };
}

interface FeedItem {
	reason?: { $type: string };
	post: {
		uri: string;
		author: { handle: string; displayName?: string; avatar?: string };
		record: { text: string; createdAt: string };
	};
}

// The web address of a post: https://bsky.app/profile/<handle>/post/<record key>.
export function postUrl(handle: string, uri: string): string {
	const key = uri.split("/").pop() ?? "";
	return `https://bsky.app/profile/${handle}/post/${key}`;
}

export function toLines(feed: FeedItem[]): Line[] {
	return feed
		.filter((item) => !item.reason)
		.map(({ post }) => ({
			uri: post.uri,
			url: postUrl(post.author.handle, post.uri),
			text: post.record.text,
			createdAt: post.record.createdAt,
			author: {
				handle: post.author.handle,
				displayName: post.author.displayName ?? "",
				avatar: post.author.avatar ?? "",
			},
		}))
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

if (import.meta.main) {
	const url = `${API}?actor=${encodeURIComponent(HANDLE)}&limit=${LIMIT}&filter=posts_no_replies`;
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Bluesky feed request failed: HTTP ${response.status}`);
	const body = (await response.json()) as { feed: FeedItem[] };
	const lines = toLines(body.feed);
	await fs.writeFile(OUT_FILE, `${JSON.stringify(lines, null, 2)}\n`);
	console.log(`Lines: ${lines.length} posts from ${HANDLE}.`);
}
