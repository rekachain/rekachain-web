import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const phpEnumPath = path.join(__dirname, '../app/Support/Enums/IntentEnum.php');
const tsEnumPath = path.join(__dirname, '../resources/js/Support/Enums/intentEnum.ts');

function transformEnum() {
    const phpEnumContent = fs.readFileSync(phpEnumPath, 'utf-8');
    const enumLines = phpEnumContent.split('\n').filter(line => line.includes('case '));

    const intents = enumLines.reduce((acc, line) => {
        const [key, value] = line.match(/case\s+(\w+)\s+=\s+'([^']+)'/).slice(1, 3);
        acc[key] = value;
        return acc;
    }, {});

    const tsEnumContent = `
const intents = ${JSON.stringify(intents, null, 4)};

export const IntentEnum = intents;

export type IntentEnum = (typeof intents)[keyof typeof intents];
`;

    fs.writeFileSync(tsEnumPath, tsEnumContent, 'utf-8');
    console.log('Transformed IntentEnum.php to intentEnum.ts');
}

transformEnum();