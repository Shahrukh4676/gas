'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';
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
    const sensorRef = ref(database, "sensor");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();

      if (data && typeof data.gasValue !== 'undefined') {
        setLatestGasValue(data.gasValue);
        
        // Handle timestamp (Python snippet sends int timestamp in seconds, JS needs ms)
        const time = data.timestamp ? new Date(data.timestamp * 1000).toISOString() : new Date().toISOString();
        setLatestTimestamp(time);

        setReadings(prev => {
          // Prevent adding duplicate sequential identical values if it's updating rapidly
          if (prev.length > 0 && prev[prev.length - 1].gasValue === data.gasValue && prev[prev.length - 1].timestamp === time) {
            return prev;
          }

          const newReading: GasReading = {
            id: Math.random().toString(36).substring(7),
            timestamp: time,
            gasValue: data.gasValue
          };
          const updated = [...prev, newReading];
          return updated.length > 50 ? updated.slice(1) : updated;
        });
      }
    });

    return () => unsubscribe();
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
