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
  return "";
}

async function copyDirRecursive(src: string, dest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = `${src}/${entry.name}`;
    const destPath = `${dest}/${entry.name}`;

    if (entry.isDirectory()) {
      await copyDirRecursive(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function removeAll(dirPath: string): Promise<void> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === ".git") continue;
      const fullPath = `${dirPath}/${entry.name}`;
      if (entry.isDirectory()) {
        await fs.rm(fullPath, { recursive: true, force: true });
      } else {
        await fs.unlink(fullPath);
      }
    }
  } catch {
    // ignore errors
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

    // Commit articles if changed
    const articlesStatus = run("git status --porcelain src/assets/posts.json", { silent: true });
    if (articlesStatus) {
      run("git add src/assets/posts.json");
      run('git commit -m "docs: regenerate article list"');
      run("git push");
    }

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

    // Check if gh-pages branch exists
    const branchCheck = run("git rev-parse --verify gh-pages", { silent: true, ignoreFail: true });
    const ghPagesExists = branchCheck.length > 0;

    if (ghPagesExists) {
      console.log("📤 Updating gh-pages branch...");
      run("git checkout gh-pages");
      run("git pull origin gh-pages");
    } else {
      console.log("📤 Creating gh-pages branch...");
      run("git checkout --orphan gh-pages");
      run("git rm -rf .");
    }

    // Copy docs to root
    console.log("📁 Preparing deployment files...");
    const repoRoot = process.cwd();
    await removeAll(repoRoot);
    const docsDir = `${repoRoot}/docs`;
    await copyDirRecursive(docsDir, repoRoot);

    run("git add .");

    // Only commit if there are changes
    const docsStatus = run("git status --porcelain", { silent: true });
    if (docsStatus) {
      run('git commit -m "docs: deploy site"');
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
