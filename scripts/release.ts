#!/usr/bin/env bun

import { spawnSync } from 'child_process';

/**
 * Execute a command and print its output
 */
function run(command: string): void {
  console.log(`> ${command}`);
  const result = spawnSync(command, {
    shell: true,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

/**
 * Release a new version
 */
function release(type: 'patch' | 'minor' | 'major' | 'hotfix'): void {
  // Map hotfix to patch
  const versionType = type === 'hotfix' ? 'patch' : type;

  switch (type) {
    case 'hotfix':
    case 'patch':
      // Patch/hotfix release: from main branch
      run('git checkout main');
      run(`npm version ${versionType}`);
      run('git push');
      run('git push --tags');
      run('git checkout develop');
      run('git rebase main');
      run('git push');
      run('git checkout main');
      break;

    case 'minor':
    case 'major':
      // Minor and major releases: from develop branch
      run('git checkout develop');
      run(`npm version ${versionType}`);
      run('git push');
      run('git push --tags');
      run('git checkout main');
      run('git merge develop');
      run('git push');
      run('git checkout develop');
      break;

    default:
      console.error('Invalid release type. Use: hotfix, patch, minor, or major');
      process.exit(1);
  }
}

// Get release type from command line arguments
const releaseType = process.argv[2] as 'patch' | 'minor' | 'major' | 'hotfix';
if (!releaseType) {
  console.error('Please specify release type: hotfix, patch, minor, or major');
  process.exit(1);
}

release(releaseType);
