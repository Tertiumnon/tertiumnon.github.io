import { execSync } from "node:child_process";
import { exit } from "node:process";
import * as fs from "node:fs/promises";

interface RunOptions {
  silent?: boolean;
  ignoreFail?: boolean;
}

function run(command: string, options?: RunOptions): string {
  try {
    if (!options?.silent) console.log(`> ${command}`);
    const result = execSync(command, {
      encoding: "utf-8",
      stdio: options?.silent ? "pipe" : "inherit",
      shell: true
    } as any);
    return result ? result.trim() : "";
  } catch (error) {
    if (options?.ignoreFail) return "";
    console.error(`❌ Error: ${command}`);
    if (error instanceof Error) console.error(`Details: ${error.message}`);
    exit(1);
  }
}

async function deploy(): Promise<void> {
  console.log("\n🚀 Deploying to GitHub Pages...\n");

  // CHECK 1: Verify we're on main branch
  const branch = run("git rev-parse --abbrev-ref HEAD", { silent: true });
  if (branch !== "main") {
    console.error("❌ Error: Must be on 'main' branch to deploy");
    exit(1);
  }

  // CHECK 2: Verify working tree is clean
  const status = run("git status --porcelain", { silent: true });
  if (status) {
    console.error("❌ Error: Working tree has uncommitted changes. Commit first.");
    exit(1);
  }

  // CHECK 3: Verify critical files exist
  try {
    await fs.access("package.json");
    await fs.access("src");
  } catch {
    console.error("❌ Error: Cannot access critical files");
    exit(1);
  }

  try {
    // STEP 1: Build articles
    console.log("📚 Building articles...");
    run("bun run post:list:create");

    // Commit if changed
    const articlesStatus = run("git status --porcelain src/assets/posts.json", { silent: true });
    if (articlesStatus) {
      run("git add src/assets/posts.json");
      run('git commit -m "docs: regenerate article list"');
      run("git push");
    }

    // STEP 2: Build site
    console.log("🔨 Building site...");
    run("bun run gh:pages:build");

    // CHECK 4: Verify docs folder exists after build
    try {
      await fs.access("docs");
    } catch {
      console.error("❌ Error: docs folder not found after build");
      exit(1);
    }

    // STEP 3: Deploy using git push with subtree split
    // Split docs/ into gh-pages branch (with -f to force push)
    // Safe because gh-pages should ONLY contain built output, never manual edits
    console.log("📤 Pushing docs/ to gh-pages branch...");
    const splitCommit = run("git subtree split --prefix docs HEAD", { silent: true });
    if (!splitCommit) {
      throw new Error("Failed to split docs subtree");
    }
    run(`git push -f origin ${splitCommit}:gh-pages`);

    console.log("\n✨ Deployment complete!\n");
    console.log("📖 GitHub Pages is configured to use 'gh-pages' branch");
    console.log("   Settings → Pages → Build and deployment → Branch: gh-pages\n");
  } catch (error) {
    console.error("❌ Deployment failed!");
    console.error(`Error: ${error}`);
    exit(1);
  }
}

deploy();
