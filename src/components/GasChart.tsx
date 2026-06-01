import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { GasReading } from '@/lib/store';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GasChartProps {
  readings: GasReading[];
}

export default function GasChart({ readings }: GasChartProps) {
  // Take last 20 readings for the chart for better visibility
  const chartReadings = readings.slice(-20);

  const data = {
    labels: chartReadings.map((r) => format(new Date(r.timestamp), 'HH:mm:ss')),
    datasets: [
      {
        label: 'Gas Value (PPM)',
        data: chartReadings.map((r) => r.gasValue),
        borderColor: '#0f172a',
        backgroundColor: 'rgba(15, 23, 42, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: chartReadings.map(r => {
          if (r.gasValue > 510) return '#ef4444';
          if (r.gasValue > 300) return '#f59e0b';
          return '#22c55e';
        }),
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 800,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 10,
        cornerRadius: 8,
      }
    },
    animation: {
      duration: 0
    }
  };

  return (
    <div className="chart-section">
      <div className="chart-header">
        <div className="chart-title">
          <TrendingUp size={20} />
          <span>Gas Value Over Time</span>
        </div>
        <div className="live-indicator" style={{ color: '#0f172a', fontSize: '0.75rem', fontWeight: 600 }}>
          <div className="live-dot" style={{ backgroundColor: '#ef4444' }}></div>
          Live (1s)
        </div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
