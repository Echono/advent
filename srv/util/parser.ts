import { readFileSync } from 'fs';
import { resolve } from 'path';

export function parseFileToString(filePath: string): string {
    const absolutePath = resolve(filePath);
    return readFileSync(absolutePath, 'utf-8');
}
