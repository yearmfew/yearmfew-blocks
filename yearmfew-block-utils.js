// Shared utility for finding block entry files and their build directories
const glob = require('glob');
const path = require('path');

function findBlockEntries(callback) {
    glob('blocks/*/src/index.js', (err, files) => {
        if (err) {
            callback(err);
            return;
        }
        const entries = files.map((entry) => {
            const blockDir = path.dirname(path.dirname(entry));
            const buildDir = path.join(blockDir, 'build');
            return { entry, buildDir };
        });
        callback(null, entries);
    });
}

function handleBlockEntryResults(err, entries) {
    if (err) {
        console.error('Error finding block entry files:', err);
        process.exit(1);
    }
    if (!entries || entries.length === 0) {
        console.log('No block entry files found.');
        return false;
    }
    return true;
}

module.exports = { findBlockEntries, handleBlockEntryResults };
