import { Request, Response } from 'express';
import { ExportService } from '../services/exportService';

export class ExportController {
    private exportService: ExportService;

    constructor() {
        this.exportService = new ExportService();
    }

    public async exportLeaveData(req: Request, res: Response): Promise<void> {
        try {
            const format = (req.query.format as string) || 'csv';
            const content = await this.exportService.exportLeaveData(format);

            if (format === 'json') {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="leave_data.json"`);
                res.send(content);
                return;
            }

            // default: csv
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="leave_data.${format}"`);
            res.send(content as string);
        } catch (error) {
            res.status(500).json({ message: 'Error exporting leave data', error: String(error) });
        }
    }
}