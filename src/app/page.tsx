'use client';

import { useEffect, useState } from 'react';
import { GasReading } from '@/lib/store';
import AlertBanner from '@/components/AlertBanner';
import StatusCards from '@/components/StatusCards';
import GasChart from '@/components/GasChart';
import ReadingsTable from '@/components/ReadingsTable';
import { Cloud, Info } from 'lucide-react';

export default function Home() {
  const [readings, setReadings] = useState<GasReading[]>([]);
  const [latestGasValue, setLatestGasValue] = useState<number>(0);
  const [latestTimestamp, setLatestTimestamp] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/history');
        if (response.ok) {
          const data = await response.json();
          setReadings(data);
          if (data.length > 0) {
            const latest = data[data.length - 1];
            setLatestGasValue(latest.gasValue);
            setLatestTimestamp(latest.timestamp);
          }
        }
      } catch (error) {
        console.error('Error fetching gas data:', error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Poll every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>
        <div className="header-title">
          <Cloud color="#38bdf8" />
          IoT Gas Monitoring Dashboard
        </div>
        <div className="live-indicator">
          <div className="live-dot"></div>
          Live
        </div>
      </header>

      <main className="container">
        <AlertBanner gasValue={latestGasValue} />
        
        <StatusCards gasValue={latestGasValue} timestamp={latestTimestamp} />
        
        <GasChart readings={readings} />
        
        <ReadingsTable readings={readings} />

        <div className="legend">
          <div className="legend-item">
            <Info size={16} color="#3b82f6" />
            <span><strong>Safe:</strong> &le; 300 PPM</span>
          </div>
          <div className="legend-item">
            <div style={{width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--warning-color)'}}></div>
            <span><strong>Warning:</strong> 301 - 510 PPM</span>
          </div>
          <div className="legend-item">
            <div style={{width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--danger-color)'}}></div>
            <span><strong>Danger:</strong> &gt; 510 PPM</span>
          </div>
        </div>
      </main>
    </>
  );
}
