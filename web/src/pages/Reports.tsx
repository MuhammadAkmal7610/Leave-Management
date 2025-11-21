import React, { useState } from 'react';
import { fetchFirstLastReport } from '../services/api';

const generateReportsOnServer = async () => {
  const resp = await fetch('/api/reports/generate', { method: 'POST' });
  if (!resp.ok) throw new Error('Generate failed');
  return resp.json();
};

const formatTime = (iso?: string | Date) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const downloadCsv = (rows: any[], date: string) => {
  const headers = ['Employee', 'Email', 'First In', 'Last Out'];
  const lines = [headers.join(',')];
  rows.forEach((r) => {
    const name = r.employee?.name || r.employee?.id || '';
    const email = r.employee?.email || '';
    const first = r.first ? new Date(r.first).toISOString() : '';
    const last = r.last ? new Date(r.last).toISOString() : '';
    lines.push([`"${name}"`, `"${email}"`, first, last].join(','));
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `first-last-report-${date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const ReportsPage: React.FC = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState<string>(today);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchFirstLastReport(date);
      setRows(data || []);
    } catch (err) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">First In / Last Out Report</h1>
        <div className="flex items-center gap-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-2 py-1" />
          <button onClick={load} className="bg-blue-600 text-white px-3 py-1 rounded">Run</button>
          <button onClick={() => downloadCsv(rows, date)} className="bg-gray-200 px-3 py-1 rounded">Export CSV</button>
          <button onClick={async () => { try { await generateReportsOnServer(); alert('Reports generated on server'); } catch (e) { alert('Generate failed'); } }} className="bg-green-600 text-white px-3 py-1 rounded">Generate</button>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        {loading ? (
          <div className="p-4">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-4 text-gray-500">No data for selected date</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left border-b">
                  <th className="px-4 py-2">Employee</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">First In</th>
                  <th className="px-4 py-2">Last Out</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-4 py-2">{r.employee?.name || r.employee?.id}</td>
                    <td className="px-4 py-2">{r.employee?.email || '-'}</td>
                    <td className="px-4 py-2">{formatTime(r.first)}</td>
                    <td className="px-4 py-2">{formatTime(r.last)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
