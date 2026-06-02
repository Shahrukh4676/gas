'use client';

import { useEffect, useState } from 'react';
import { ref, onValue, query, limitToLast } from 'firebase/database';
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
    // Listen to the last 50 items pushed to the "history" node
    const historyQuery = query(ref(database, "history"), limitToLast(50));

    const unsubscribe = onValue(historyQuery, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert Firebase object to array and sort by time if necessary
        const items = Object.values(data) as any[];
        
        const newReadings: GasReading[] = items.map((item: any) => {
          const time = item.timestamp ? new Date(item.timestamp * 1000).toISOString() : new Date().toISOString();
          return {
            id: Math.random().toString(36).substring(7),
            timestamp: time,
            gasValue: item.gasValue
          };
        });

        setReadings(newReadings);
        
        if (newReadings.length > 0) {
          const latest = newReadings[newReadings.length - 1];
          setLatestGasValue(latest.gasValue);
          setLatestTimestamp(latest.timestamp);
        }
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
            <span><strong>Safe:</strong> 0 - 90 PPM</span>
          </div>
          <div className="legend-item">
            <div style={{width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--warning-color)'}}></div>
            <span><strong>Warning:</strong> 91 - 119 PPM</span>
          </div>
          <div className="legend-item">
            <div style={{width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--danger-color)'}}></div>
            <span><strong>Danger:</strong> &ge; 120 PPM</span>
          </div>
        </div>
      </main>
    </>
  );
}
