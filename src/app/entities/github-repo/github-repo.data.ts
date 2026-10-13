import { ProjectStatus } from "../project/project.constants";

export interface IGithubRepo {
	name: string;
	title: string;
	type: string;
	description: string;
	status: ProjectStatus;
}

export const GITHUB_USER = "Tertiumnon";

export const GITHUB_REPOS: IGithubRepo[] = [
	{
		name: "tertium-hlpr",
		title: "Tertium Hlpr",
		type: "TypeScript",
		description: "Command-line helper for everyday tasks on Windows, macOS, and Linux, run as hlpr <domain> <command>.",
		status: ProjectStatus.Active,
	},
	{
		name: "intel-arc-b60-local-llm-cookbook",
		title: "Intel Arc LLM",
		type: "TypeScript",
		description: "Running local LLMs on a 24 GB Intel Arc B60 with Llama.cpp, Strata, and OpenVINO.",
		status: ProjectStatus.Active,
	},
	{
		name: "youtube-full-window-ext",
		title: "Full Window YT",
		type: "Firefox Extension",
		description: "Open source Firefox extension that adds a button to YouTube's control bar to fill the browser window with the player.",
		status: ProjectStatus.Active,
	},
	{
		name: "tertium-js",
		title: "@tertium/js",
		type: "TypeScript",
		description: "Reusable TypeScript library of shared core utilities, entity models, and release scripts for JavaScript projects. In development.",
		status: ProjectStatus.Active,
	},
	{
		name: "tertium-css",
		title: "Tertium CSS",
		type: "CSS",
		description: "Framework-agnostic CSS design system with composable tokens, four themes, layout utilities, and components.",
		status: ProjectStatus.Active,
	},
	{
		name: "tertium-countries",
		title: "Countries",
		type: "TypeScript",
		description: "Country names in 20 languages with lookup helpers, as an ESM package.",
		status: ProjectStatus.Active,
	},
	{
		name: "mastering-releases",
		title: "Releases",
		type: "Repository",
		description: "Git and CI/CD release workflows, with examples and a release metadata schema for the \"maining releases\" article.",
		status: ProjectStatus.Active,
	},
	{
		name: "tertium-prisma-codegen",
		title: "Prisma Codegen",
		type: "TypeScript",
		description: "Code generation library for Prisma schemas: REST handlers, GraphQL resolvers, and TypeScript types. In development.",
		status: ProjectStatus.Active,
	},
	{
		name: "entity-driven-architecture--example",
		title: "EDA Example",
		type: "TypeScript",
		description: "Blog platform built with entity-driven architecture: Bun and Elysia backend, SolidJS frontend.",
		status: ProjectStatus.Active,
	},
	{
		name: "entity-driven-architecture",
		title: "Entity Driven",
		type: "Style Guide",
		description: "Guide to entity-driven development principles, naming conventions, and architectural patterns.",
		status: ProjectStatus.Inactive,
	},
	{
		name: "tertium-js-markdown-wiki",
		title: "Markdown Wiki",
		type: "TypeScript",
		description: "Simple Bun web server that displays and manages markdown files over HTTP.",
		status: ProjectStatus.Active,
	},
	{
		name: "mw-deploy",
		title: "MediaWiki Deploy",
		type: "NodeJS Application",
		description: "Tool for deploying, updating, and deleting MediaWiki pages on a remote server.",
		status: ProjectStatus.Inactive,
	},
	{
		name: "tertium-cheatsheets",
		title: "Cheatsheets",
		type: "Knowledge Base",
		description: "Cheatsheets for programmers on languages, frameworks, databases, and system design.",
		status: ProjectStatus.Active,
	},
	{
		name: "tertium-js-snippets",
		title: "Tertium JS Snippets",
		type: "VSCode Extension",
		description: "Collection of JavaScript snippets for Visual Studio Code.",
		status: ProjectStatus.Inactive,
	},
	{
		name: "simple-js-html",
		title: "Simple JS HTML",
		type: "CSS",
		description: "Plain HTML, CSS, and JavaScript project.",
		status: ProjectStatus.Active,
	},
	{
		name: "stickers-ru-coders",
		title: "RU Coders",
		type: "Telegram Sticker Pack",
		description: "Telegram sticker pack: RU Coders.",
		status: ProjectStatus.Active,
	},
	{
		name: "stickers-anime-emotions",
		title: "Anime Emotions",
		type: "Telegram Sticker Pack",
		description: "Telegram sticker pack: Anime Emotions.",
		status: ProjectStatus.Active,
	},
	{
		name: "software-gentelman-agreement",
		title: "Gentleman's Pact",
		type: "Agreement",
		description: "A gentlemen's agreement for software projects between people working together, including volunteers.",
		status: ProjectStatus.Active,
	},
	{
		name: "json-to-sql-script",
		title: "JSON to SQL Script",
		type: "JavaScript",
		description: "npm package that creates an SQL insert script from a JSON file.",
		status: ProjectStatus.Active,
	},
	{
		name: "json-all-to-one",
		title: "JSON All to One",
		type: "JavaScript",
		description: "Script that concatenates several JSON files from a directory into one file.",
		status: ProjectStatus.Active,
	},
	{
		name: "tertium-icons",
		title: "tertium.icons",
		type: "HTML",
		description: "Free SVG and font icons.",
		status: ProjectStatus.Active,
	},
];
