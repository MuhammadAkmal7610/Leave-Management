 import { Parser } from '@json2csv/plainjs';   // <-- FIXED
import fs from 'fs';
import path from 'path';

export const exportToCSV = (data: any[], filename: string) => {
    const csvParser = new Parser();           // Same usage
    const csv = csvParser.parse(data);
    const filePath = path.join(__dirname, `../../exports/${filename}.csv`);

    fs.writeFileSync(filePath, csv);
    return filePath;
};

export const readCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const rows = data.split('\n').map(row => row.split(','));
            resolve(rows);
        });
    });
};
