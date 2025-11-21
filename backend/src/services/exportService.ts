import { Employee } from '../models';

export class ExportService {
    constructor() {}

    async exportLeaveData(format: string = 'csv'): Promise<string | Buffer> {
        // As a fallback (no dedicated Leave model is available), export employee data
        const employees = await Employee.find().lean();

        if (!employees || employees.length === 0) {
            return '';
        }

        switch (format) {
            case 'csv':
                return this.exportToCSV(employees);
            case 'json':
                return this.exportToJSON(employees);
            default:
                throw new Error('Unsupported format');
        }
    }

    private exportToCSV(data: any[]): string {
        const keys = Object.keys(data[0]);
        const header = keys.join(',') + '\n';
        const rows = data
            .map(row => keys.map(k => this.escape(String(row[k] ?? ''))).join(','))
            .join('\n');
        return header + rows;
    }

    private exportToJSON(data: any[]): string {
        return JSON.stringify(data, null, 2);
    }

    private escape(value: string): string {
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
            return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
    }
}