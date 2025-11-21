import React, { useEffect, useState } from 'react';
import { fetchLeaveRequests } from '../services/api';

const LeaveList: React.FC = () => {
    const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLeaveRequests = async () => {
            try {
                const data = await fetchLeaveRequests();
                setLeaveRequests(data);
            } catch (err) {
                setError('Failed to load leave requests');
            } finally {
                setLoading(false);
            }
        };

        loadLeaveRequests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Leave Requests</h2>
            <ul>
                {leaveRequests.map((request) => (
                    <li key={request.id}>
                        {request.user} - {request.startDate} to {request.endDate} ({request.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveList;