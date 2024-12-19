import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const phpEnumPath = path.join(__dirname, '../app/Support/Enums/PermissionEnum.php');
const tsEnumPath = path.join(__dirname, '../resources/js/Support/Enums/permissionEnum.ts');

function transformEnum() {
    const phpEnumContent = fs.readFileSync(phpEnumPath, 'utf-8');
    const enumLines = phpEnumContent.split('\n').filter((line) => line.includes('case '));

    const permissions = enumLines.reduce((acc, line) => {
        const [key, value] = line.match(/case\s+(\w+)\s+=\s+'([^']+)'/).slice(1, 3);
        acc[key] = value;
        return acc;
    }, {});

    const tsEnumContent = `export enum PERMISSION_ENUM ${JSON.stringify(permissions, null, 4).replace(/"([^"]+)":/g, '$1:').replace(/:/g, '=')};`;

    fs.writeFileSync(tsEnumPath, tsEnumContent, 'utf-8');
    console.log('Transformed PermissionEnum.php to permissionEnum.ts');
}

transformEnum();

exec('prettier --write resources/js/Support/Enums/permissionEnum.ts', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(stdout);
    console.error(stderr);
});
