import { Activity, ShieldAlert, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface StatusCardsProps {
  gasValue: number;
  timestamp: string;
}

export default function StatusCards({ gasValue, timestamp }: StatusCardsProps) {
  let status = 'SAFE';
  let statusClass = 'status-safe';
  let badgeClass = 'status-badge-safe';
  let message = 'Gas levels are normal';

  if (gasValue >= 300) {
    status = 'DANGER';
    statusClass = 'status-danger';
    badgeClass = 'status-badge-danger';
    message = 'Gas level is too high!';
  } else if (gasValue > 200) {
    status = 'WARNING';
    statusClass = 'status-warning';
    badgeClass = 'status-badge-warning';
    message = 'Gas levels elevated';
  }

  const formattedTime = timestamp ? format(new Date(timestamp), 'hh:mm:ss a') : '--:--:--';
  const formattedDate = timestamp ? format(new Date(timestamp), 'MMM dd, yyyy') : '---';

  return (
    <div className="cards-grid">
      {/* Current Gas Value */}
      <div className="card">
        <div className="card-header">
          <Activity size={20} />
          <span>Current Gas Value</span>
        </div>
        <div className={`card-value ${statusClass}`}>{gasValue || 0}</div>
        <div className="card-subtitle">PPM</div>
      </div>

      {/* System Status */}
      <div className="card">
        <div className="card-header">
          <ShieldAlert size={20} />
          <span>System Status</span>
        </div>
        <div className={`status-badge ${badgeClass}`}>{status}</div>
        <div className="card-subtitle">{message}</div>
      </div>

      {/* Last Updated */}
      <div className="card">
        <div className="card-header">
          <Clock size={20} />
          <span>Last Updated</span>
        </div>
        <div className="card-value" style={{ fontSize: '2rem' }}>{formattedTime}</div>
        <div className="card-subtitle">{formattedDate}</div>
      </div>
    </div>
  );
}
