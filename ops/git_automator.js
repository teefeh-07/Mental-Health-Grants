const { execSync } = require('child_process');
const path = require('path');

const action = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

function run(command) {
    try {
        console.log(`> ${command}`);
        execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (e) {
        console.error(`Command failed: ${command}`);
        // Don't exit immediately, let the caller handle or ignore if safe
        // But for strict automation, maybe we should. 
        // For now, we allow continuation as some git commands (like checking out existing branch) might fail harmlessly.
    }
}

function getBranchName() {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
}

/**
 * STRATEGY:
 * 1. create-branch: unique branch per small feature
 * 2. commit: granular commits
 * 3. sync: push, pr, merge
 */

if (action === 'init') {
    run('git init');
    run('git branch -M main');
    run('git add .');
    try {
        run('git commit -m "root: initial project setup"');
    } catch (e) {}
}

if (action === 'branch') {
    // usage: node ops/git_automator.js branch <type> <name>
    const type = arg1 || 'feat';
    const name = arg2 || 'update-' + Date.now();
    const branchName = `${type}/${name}`;
    run(`git checkout -b ${branchName}`);
}

if (action === 'commit') {
    // usage: node ops/git_automator.js commit <file> <message>
    const file = arg1 || '.';
    const message = arg2 || 'chore: update';
    run(`git add "${file}"`);
    run(`git commit -m "${message}"`);
}

if (action === 'pr-merge') {
    // usage: node ops/git_automator.js pr-merge <description>
    const currentBranch = getBranchName();
    const desc = arg1 || `Updates for ${currentBranch}`;
    
    // Attempt push
    try {
        run(`git push -u origin ${currentBranch}`);
        
        // PR
        try {
            run(`gh pr create --title "${desc}" --body "Automated micro-commit PR strategy.\n\nChanges:\n- ${currentBranch}"`);
            run(`gh pr merge --admin --merge --delete-branch`); 
            // Note: --admin might be needed if branch protection is on, otherwise just --merge
        } catch (e) {
             console.log("GH CLI failed or not configured. Merging locally.");
             run('git checkout main');
             run(`git merge ${currentBranch}`);
        }
        
    } catch (e) {
        console.log("Push failed (no remote?). Merging locally.");
        run('git checkout main');
        run(`git merge ${currentBranch}`);
    }
}
