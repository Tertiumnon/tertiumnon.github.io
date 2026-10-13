export type StackId = "js" | "python" | "native" | "jvm" | "web-other" | "dotnet" | "mobile";

export interface IStack {
	id: StackId;
	label: string;
	base: number;
	sharedServices: { name: string; port: number }[];
}

export interface IFramework {
	name: string;
	stack: StackId;
	defaultPort?: number;
	debugPort?: number;
}

export const PROJECT_SLOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const ROLES = [
	{ offset: 0, name: "Web frontend / UI" },
	{ offset: 10, name: "Gateway / BFF" },
	{ offset: 20, name: "API" },
	{ offset: 30, name: "Internal services (auth, WebSocket, workers)" },
	{ offset: 40, name: "Tools (Storybook, Jupyter, mocks)" },
];

export const STACKS: IStack[] = [
	{
		id: "js",
		label: "JavaScript / TypeScript",
		base: 12000,
		sharedServices: [
			{ name: "PostgreSQL", port: 5432 },
			{ name: "Redis", port: 6379 },
			{ name: "MongoDB", port: 27017 },
			{ name: "Mailpit", port: 8025 },
		],
	},
	{
		id: "python",
		label: "Python",
		base: 13000,
		sharedServices: [
			{ name: "PostgreSQL", port: 5432 },
			{ name: "Redis", port: 6379 },
			{ name: "Ollama", port: 11434 },
		],
	},
	{
		id: "native",
		label: "Go, Rust, C / C++",
		base: 14000,
		sharedServices: [
			{ name: "PostgreSQL", port: 5432 },
			{ name: "Redis", port: 6379 },
			{ name: "NATS", port: 4222 },
		],
	},
	{
		id: "jvm",
		label: "JVM (Java, Kotlin, Scala)",
		base: 15000,
		sharedServices: [
			{ name: "PostgreSQL", port: 5432 },
			{ name: "Kafka", port: 9092 },
			{ name: "RabbitMQ", port: 5672 },
		],
	},
	{
		id: "web-other",
		label: "Ruby, PHP, Elixir, Dart",
		base: 16000,
		sharedServices: [
			{ name: "PostgreSQL", port: 5432 },
			{ name: "MySQL", port: 3306 },
			{ name: "Redis", port: 6379 },
		],
	},
	{
		id: "dotnet",
		label: ".NET (C#, F#, VB)",
		base: 17000,
		sharedServices: [
			{ name: "SQL Server", port: 1433 },
			{ name: "Redis", port: 6379 },
		],
	},
	{
		id: "mobile",
		label: "Mobile and desktop",
		base: 18000,
		sharedServices: [
			{ name: "Mailpit", port: 8025 },
			{ name: "LocalStack", port: 4566 },
		],
	},
];

export const FRAMEWORKS: IFramework[] = [
	// JavaScript / TypeScript: frontends
	{ name: "React (Create React App)", stack: "js", defaultPort: 3000 },
	{ name: "Vue CLI", stack: "js", defaultPort: 8080 },
	{ name: "Vite (React, Vue, Svelte, Solid, Qwik)", stack: "js", defaultPort: 5173 },
	{ name: "Angular", stack: "js", defaultPort: 4200 },
	{ name: "Ember", stack: "js", defaultPort: 4200 },
	{ name: "Astro", stack: "js", defaultPort: 4321 },
	{ name: "Gatsby", stack: "js", defaultPort: 8000 },
	{ name: "Docusaurus", stack: "js", defaultPort: 3000 },
	{ name: "VitePress", stack: "js", defaultPort: 5173 },
	{ name: "Eleventy", stack: "js", defaultPort: 8080 },
	{ name: "Parcel", stack: "js", defaultPort: 1234 },
	{ name: "Storybook", stack: "js", defaultPort: 6006 },
	// JavaScript / TypeScript: full-stack and servers (Node, Bun, Deno)
	{ name: "Next.js", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Remix", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Nuxt", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "SvelteKit", stack: "js", defaultPort: 5173, debugPort: 9229 },
	{ name: "SolidStart", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Express", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "NestJS", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Fastify", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Koa", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Hono (Node, Bun)", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Hono (Cloudflare Workers)", stack: "js", defaultPort: 8787 },
	{ name: "Bun server", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Deno", stack: "js", defaultPort: 8000, debugPort: 9229 },
	{ name: "Deno Fresh", stack: "js", defaultPort: 8000, debugPort: 9229 },
	{ name: "AdonisJS", stack: "js", defaultPort: 3333, debugPort: 9229 },
	{ name: "Strapi", stack: "js", defaultPort: 1337, debugPort: 9229 },
	{ name: "Payload CMS", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "Directus", stack: "js", defaultPort: 8055, debugPort: 9229 },
	{ name: "Socket.IO", stack: "js", defaultPort: 3000, debugPort: 9229 },
	{ name: "FeathersJS", stack: "js", defaultPort: 3030, debugPort: 9229 },
	{ name: "Meteor", stack: "js", defaultPort: 3000, debugPort: 9229 },

	// Python
	{ name: "Django", stack: "python", defaultPort: 8000, debugPort: 5678 },
	{ name: "FastAPI", stack: "python", defaultPort: 8000, debugPort: 5678 },
	{ name: "Starlette", stack: "python", defaultPort: 8000, debugPort: 5678 },
	{ name: "Litestar", stack: "python", defaultPort: 8000, debugPort: 5678 },
	{ name: "Sanic", stack: "python", defaultPort: 8000, debugPort: 5678 },
	{ name: "Flask", stack: "python", defaultPort: 5000, debugPort: 5678 },
	{ name: "Quart", stack: "python", defaultPort: 5000, debugPort: 5678 },
	{ name: "Tornado", stack: "python", defaultPort: 8888, debugPort: 5678 },
	{ name: "aiohttp", stack: "python", defaultPort: 8080, debugPort: 5678 },
	{ name: "Chainlit", stack: "python", defaultPort: 8000, debugPort: 5678 },
	{ name: "Reflex", stack: "python", defaultPort: 3000, debugPort: 5678 },
	{ name: "Streamlit", stack: "python", defaultPort: 8501, debugPort: 5678 },
	{ name: "Gradio", stack: "python", defaultPort: 7860, debugPort: 5678 },
	{ name: "Dash", stack: "python", defaultPort: 8050, debugPort: 5678 },
	{ name: "Jupyter", stack: "python", defaultPort: 8888 },
	{ name: "MkDocs", stack: "python", defaultPort: 8000 },
	{ name: "Celery Flower", stack: "python", defaultPort: 5555 },
	{ name: "MLflow", stack: "python", defaultPort: 5000 },
	{ name: "TensorBoard", stack: "python", defaultPort: 6006 },
	{ name: "Prefect", stack: "python", defaultPort: 4200 },
	{ name: "Dagster", stack: "python", defaultPort: 3000 },
	{ name: "Airflow", stack: "python", defaultPort: 8080 },
	{ name: "Label Studio", stack: "python", defaultPort: 8080 },

	// Go, Rust, C / C++
	{ name: "Go net/http", stack: "native", defaultPort: 8080, debugPort: 2345 },
	{ name: "Gin", stack: "native", defaultPort: 8080, debugPort: 2345 },
	{ name: "Echo", stack: "native", defaultPort: 1323, debugPort: 2345 },
	{ name: "Fiber", stack: "native", defaultPort: 3000, debugPort: 2345 },
	{ name: "Chi", stack: "native", defaultPort: 3000, debugPort: 2345 },
	{ name: "Buffalo", stack: "native", defaultPort: 3000, debugPort: 2345 },
	{ name: "Beego", stack: "native", defaultPort: 8080, debugPort: 2345 },
	{ name: "Hugo", stack: "native", defaultPort: 1313 },
	{ name: "Actix Web", stack: "native", defaultPort: 8080 },
	{ name: "Axum", stack: "native", defaultPort: 3000 },
	{ name: "Rocket", stack: "native", defaultPort: 8000 },
	{ name: "Warp", stack: "native", defaultPort: 3030 },

	// JVM
	{ name: "Spring Boot", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Quarkus", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Micronaut", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Ktor", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Vert.x", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Helidon", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Dropwizard", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Jetty", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Tomcat", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Grails", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Akka HTTP", stack: "jvm", defaultPort: 8080, debugPort: 5005 },
	{ name: "Javalin", stack: "jvm", defaultPort: 7000, debugPort: 5005 },
	{ name: "Play Framework (Scala)", stack: "jvm", defaultPort: 9000, debugPort: 5005 },

	// Ruby, PHP, Elixir, Dart
	{ name: "Rails", stack: "web-other", defaultPort: 3000, debugPort: 12345 },
	{ name: "Sinatra", stack: "web-other", defaultPort: 4567, debugPort: 12345 },
	{ name: "Hanami", stack: "web-other", defaultPort: 2300, debugPort: 12345 },
	{ name: "Jekyll", stack: "web-other", defaultPort: 4000 },
	{ name: "Laravel", stack: "web-other", defaultPort: 8000, debugPort: 9003 },
	{ name: "Symfony", stack: "web-other", defaultPort: 8000, debugPort: 9003 },
	{ name: "PHP built-in server", stack: "web-other", defaultPort: 8000, debugPort: 9003 },
	{ name: "Phoenix", stack: "web-other", defaultPort: 4000 },
	{ name: "Dart shelf", stack: "web-other", defaultPort: 8080 },
	{ name: "Flutter web", stack: "web-other" },

	// .NET
	{ name: "ASP.NET Core", stack: "dotnet", defaultPort: 5000 },

	// Mobile and desktop
	{ name: "React Native / Expo (Metro)", stack: "mobile", defaultPort: 8081 },
	{ name: "Ionic", stack: "mobile", defaultPort: 8100 },
	{ name: "Tauri", stack: "mobile", defaultPort: 1420 },
];
