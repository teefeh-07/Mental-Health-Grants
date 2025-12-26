const { execSync } = require('child_process');
const path = require('path');

const action = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

function run(command) {
    try {
        console.log(`> ${command}`);
        // Add timeout to prevent hangs
        execSync(command, { encoding: 'utf8', stdio: 'inherit', timeout: 10000 });
    } catch (e) {
        console.error(`Command failed: ${command}`);
        // error handling handled by caller or ignored
        throw e;
    }
}

function getBranchName() {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
}

if (action === 'init') {
    // ... assumed done
}

if (action === 'branch') {
    // usage: node ops/git_automator.cjs branch <type> <name>
    const type = arg1 || 'feat';
    const name = arg2 || 'update-' + Date.now();
    const branchName = `${type}/${name}`;
    try {
        run(`git checkout -b ${branchName}`);
    } catch (e) {
        // maybe branch exists
        run(`git checkout ${branchName}`);
    }
}

if (action === 'commit') {
    // usage: node ops/git_automator.cjs commit <file> <message>
    const file = arg1 || '.';
    const message = arg2 || 'chore: update';
    run(`git add "${file}"`);
    try {
        run(`git commit -m "${message}"`);
    } catch (e) {
        console.log("Nothing to commit?");
    }
}

if (action === 'pr-merge') {
    // usage: node ops/git_automator.cjs pr-merge <description>
    const currentBranch = getBranchName();
    const desc = arg1 || `Updates for ${currentBranch}`;

    console.log(`Merging ${currentBranch} into main locally (Simulating PR)...`);

    try {
        run('git checkout main');
        // --no-ff creates a merge commit, simulating a PR merge
        run(`git merge --no-ff "${currentBranch}" -m "Merge pull request: ${desc}"`);
        // Optional: delete branch to keep clean, or keep it. User asked for 50+ branches.
        // If we delete, they are "gone" but the history remains in the graph.
        // "Create separate branches... Auto-merge all PRs".
        // Usually, deleted after merge.
        run(`git branch -d "${currentBranch}"`);
    } catch (e) {
        console.error("Merge failed. Resolve conflicts manually.");
        // Try to go back?
        // run(`git checkout ${currentBranch}`);
    }
}
