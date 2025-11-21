import React, { useEffect, useState } from 'react';
import { fetchLeaves } from '../services/api';

const TrendingBoard: React.FC = () => {
    const [trending, setTrending] = useState<Array<{ user: string; count: number }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const leaves = await fetchLeaves();
                if (!Array.isArray(leaves)) {
                    setError('Unexpected data from server');
                    return;
                }

                // Count leaves per user
                const counts: Record<string, number> = {};
                leaves.forEach((l: any) => {
                    const user = l.user || l.username || 'Unknown';
                    counts[user] = (counts[user] || 0) + 1;
                });

                const arr = Object.keys(counts).map((user) => ({ user, count: counts[user] }));
                arr.sort((a, b) => b.count - a.count);
                setTrending(arr.slice(0, 5));
            } catch (err) {
                console.error(err);
                setError('Failed to load trending data');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <div className="bg-white border rounded p-4 shadow">Loading trending…</div>;
    if (error) return <div className="bg-white border rounded p-4 shadow">{error}</div>;

    return (
        <div className="bg-white border rounded p-4 shadow">
            <h3 className="text-lg font-medium mb-2">Trending</h3>
            {trending.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No trending data yet</div>
            ) : (
                <div>
                    {trending.map((t: { user: string; count: number }) => (
                        <div key={t.user} className="flex items-center justify-between py-2 border-b last:border-b-0">
                            <div className="font-medium text-gray-800">{t.user}</div>
                            <div className="text-sm text-gray-600">{t.count} leave(s)</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingBoard;
