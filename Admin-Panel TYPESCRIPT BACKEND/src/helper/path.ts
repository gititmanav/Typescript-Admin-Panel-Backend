import * as path from 'path';

export default path.dirname(process.mainModule!.filename);

export function join(__dirname: string, arg1: string, arg2: string): string {
    throw new Error('Function not implemented.');
}
