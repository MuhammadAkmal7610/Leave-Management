import React from 'react';

const ExportButton: React.FC = () => {
    const handleExport = async () => {
        try {
            const response = await fetch('/api/exports?format=csv', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to export data');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'leave_data.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    return (
        <button onClick={handleExport}>
            Export Leave Data
        </button>
    );
};

export default ExportButton;