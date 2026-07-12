import { execSync } from "node:child_process";
import { exit } from "node:process";
import * as fs from "node:fs/promises";

function run(command: string, options?: { silent?: boolean }): string {
  try {
    if (!options?.silent) console.log(`> ${command}`);
    return execSync(command, {
      encoding: "utf-8",
      stdio: options?.silent ? "pipe" : "inherit"
    }).trim();
  } catch (error) {
    console.error(`❌ Error: ${command}`);
    exit(1);
  }
}

async function deploy(): Promise<void> {
  console.log("\n🚀 Deploying to GitHub Pages (gh-pages branch)...\n");

  // Check if on main branch
  const branch = run("git rev-parse --abbrev-ref HEAD", { silent: true });
  if (branch !== "main") {
    console.error("❌ Error: Must be on 'main' branch to deploy");
    exit(1);
  }

  // Check if working tree is clean
  const status = run("git status --porcelain", { silent: true });
  if (status) {
    console.error("❌ Error: Working tree has uncommitted changes. Commit first.");
    exit(1);
  }

  try {
    // Build articles
    console.log("📚 Building articles...");
    run("bun run post:list:create");

    // Build site
    console.log("🔨 Building site...");
    run("bun run gh:pages:build");

    // Check if docs folder exists
    const docsPath = "docs";
    try {
      await fs.access(docsPath);
    } catch {
      console.error("❌ Error: docs folder not found after build");
      exit(1);
    }

    // Get or create gh-pages branch
    let ghPagesExists = false;
    try {
      run("git rev-parse --verify gh-pages", { silent: true });
      ghPagesExists = true;
    } catch {
      ghPagesExists = false;
    }

    if (ghPagesExists) {
      console.log("📤 Updating gh-pages branch...");
      run("git checkout gh-pages");
      run("git pull origin gh-pages");
    } else {
      console.log("📤 Creating gh-pages branch...");
      run("git checkout --orphan gh-pages");
      run("git rm -rf .");
    }

    // Copy docs to root and commit
    console.log("📁 Preparing deployment files...");
    run("rm -rf *", { silent: true });
    run("cp -r ../docs/* .", { silent: true });
    run("git add .");

    // Only commit if there are changes
    const docsStatus = run("git status --porcelain", { silent: true });
    if (docsStatus) {
      run("git commit -m 'docs: deploy site'");
      run("git push -u origin gh-pages");
      console.log("✅ Deployed to gh-pages!");
    } else {
      console.log("✅ No changes to deploy.");
    }

    // Return to main branch
    console.log("🔄 Returning to main branch...");
    run("git checkout main");

    console.log("\n✨ Deployment complete!\n");
    console.log("📖 Make sure GitHub Pages is configured to use 'gh-pages' branch");
    console.log("   Settings → Pages → Build and deployment → Branch: gh-pages\n");
  } catch (error) {
    console.error("❌ Deployment failed");
    run("git checkout main", { silent: true });
    exit(1);
  }
}

deploy();
