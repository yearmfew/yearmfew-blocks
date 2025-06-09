const { findBlockEntries, handleBlockEntryResults } = require('./yearmfew-block-utils');
const { execFileSync } = require('child_process');

findBlockEntries((err, entries) => {
    if (!handleBlockEntryResults(err, entries)) return;

    entries.forEach(({ entry, buildDir }) => {
        try {
            execFileSync('npx', ['wp-scripts', 'build', entry, `--output-path=${buildDir}`], { stdio: 'inherit' });
        } catch (e) {
            console.error(`Build failed for ${entry}`);
            process.exit(1);
        }
    });
});
