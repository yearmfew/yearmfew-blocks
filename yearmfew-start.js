const { findBlockEntries, handleBlockEntryResults } = require('./yearmfew-block-utils');
const { spawn } = require('child_process');

findBlockEntries((err, entries) => {
    if (!handleBlockEntryResults(err, entries)) return;

    entries.forEach(({ entry, buildDir }) => {

        const
            cmd = 'npx',
            args = ['wp-scripts', 'start', entry, '--output-path=' + buildDir],
            proc = spawn(cmd, args, { stdio: 'inherit' });

        console.log(`Starting watch: ${cmd} ${args.join(' ')}`);

        proc.on('close', (code) => {
            (code !== 0) && console.error(`Watch process exited with code ${code} for ${entry}`);
        });
    });
});
