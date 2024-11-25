import chokidar from 'chokidar';
import { exec } from 'child_process';

const phpEnumPath = 'app/Support/Enums/IntentEnum.php';

const watcher = chokidar.watch(phpEnumPath, {
    persistent: true,
});

watcher.on('change', path => {
    console.log(`${path} has been changed. Transforming...`);
    exec('node experimental/transform-intent-enum.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });
});

console.log(`Watching for changes in ${phpEnumPath}`);
