import { format } from 'date-fns';
import { GasReading } from '@/lib/store';
import { List } from 'lucide-react';

interface ReadingsTableProps {
  readings: GasReading[];
}

export default function ReadingsTable({ readings }: ReadingsTableProps) {
  // Sort readings by descending timestamp (newest first) and take the last 10
  const recentReadings = [...readings].reverse().slice(0, 10);

  const getStatus = (val: number) => {
    if (val > 180) return { text: 'DANGER', class: 'status-badge-danger' };
    if (val > 120) return { text: 'WARNING', class: 'status-badge-warning' };
    return { text: 'SAFE', class: 'status-badge-safe' };
  };

  return (
    <div className="table-section">
      <div className="table-title">
        <List size={20} />
        <span>Recent Readings (Last 10)</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th>Gas Value (PPM)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentReadings.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No readings available yet.
                </td>
              </tr>
            ) : (
              recentReadings.map((reading, idx) => {
                const status = getStatus(reading.gasValue);
                return (
                  <tr key={reading.id}>
                    <td>{idx + 1}</td>
                    <td>{format(new Date(reading.timestamp), 'hh:mm:ss a')}</td>
                    <td>{reading.gasValue}</td>
                    <td>
                      <span className={`pill ${status.class}`}>{status.text}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
