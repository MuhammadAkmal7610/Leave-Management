import React, { useEffect, useState } from 'react';
import { fetchLeaves } from '../services/api';
import ExportButton from '../components/ExportButton';
import TrendingBoard from '../components/TrendingBoard';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import AttendanceDashboard from './AttendanceDashboard';

const Dashboard: React.FC = () => {
    const [leaves, setLeaves] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchLeaves();
                setLeaves(data || []);
            } catch (e) {
                setLeaves([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const total = leaves.length;
    const newReq = leaves.filter((l) => l.status === 'new' || l.status === 'pending').length;
    const rejected = leaves.filter((l) => l.status === 'rejected').length;
    const pending = leaves.filter((l) => l.status === 'pending').length;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="text-sm text-gray-500">Home &gt; Attendance &gt; Leave management</div>
                    <h1 className="text-3xl font-bold">Leave Management</h1>
                    <div className="text-sm text-gray-400">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input className="border rounded-md pl-10 pr-3 py-2 w-80" placeholder="Search students by name or code" />
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </div>
                    <ExportButton />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow flex items-center gap-4">
                    <div className="w-3 h-12 rounded bg-gradient-to-b from-purple-400 to-purple-600" />
                    <div>
                        <div className="text-sm text-gray-500">Total Request</div>
                        <div className="text-2xl font-semibold text-gray-900">{total}</div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow flex items-center gap-4">
                    <div className="w-3 h-12 rounded bg-gradient-to-b from-green-300 to-green-600" />
                    <div>
                        <div className="text-sm text-gray-500">New Request</div>
                        <div className="text-2xl font-semibold text-gray-900">{newReq}</div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow flex items-center gap-4">
                    <div className="w-3 h-12 rounded bg-gradient-to-b from-red-300 to-red-600" />
                    <div>
                        <div className="text-sm text-gray-500">Rejected</div>
                        <div className="text-2xl font-semibold text-gray-900">{rejected}</div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow flex items-center gap-4">
                    <div className="w-3 h-12 rounded bg-gradient-to-b from-yellow-300 to-yellow-500" />
                    <div>
                        <div className="text-sm text-gray-500">Pending Request</div>
                        <div className="text-2xl font-semibold text-gray-900">{pending}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                <main>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Leave Approval</h2>
                        <span className="text-sm text-orange-500">Pending</span>
                    </div>

                    {loading ? (
                        <div className="p-4 bg-white rounded shadow">Loading…</div>
                    ) : leaves.length === 0 ? (
                        <div className="p-4 bg-white rounded shadow">No leave requests</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {leaves.map((l: any) => (
                                <div key={l.id} className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <img src={l.avatar || 'https://via.placeholder.com/48'} alt="avatar" className="w-12 h-12 rounded-full" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium text-gray-800">{l.name || l.title || 'Unknown'}</div>
                                                    <div className="text-sm text-gray-500">{l.code || l.email || ''}</div>
                                                </div>
                                                <div className="text-sm text-gray-500">{l.type || 'Sick Leave'}</div>
                                            </div>
                                            <div className="mt-2 text-gray-600">{l.reason || l.description || 'No details provided'}</div>
                                            <div className="mt-3 flex items-center gap-2">
                                                <button className="px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100">Deny</button>
                                                <button className="px-3 py-1 rounded-md bg-green-50 text-green-600 border border-green-100">Approve</button>
                                                <button className="ml-auto text-sm text-blue-600">Detail</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <aside className="space-y-4">
                    <TrendingBoard />

                    <div className="bg-white rounded-lg p-4 shadow">
                        <h3 className="text-lg font-medium mb-2">Employees</h3>
                        <EmployeeList />
                        <div className="mt-3">
                          <a href="/employees" className="inline-block text-sm text-blue-600">Manage employees &rarr;</a>
                        </div>
                    </div>

                    {/* <div className="bg-white rounded-lg p-4 shadow">
                        <h3 className="text-lg font-medium mb-2">Attendance</h3>
                        <AttendanceDashboard compact />
                    </div> */}
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;