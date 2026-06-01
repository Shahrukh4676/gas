export interface GasReading {
  id: string;
  timestamp: string;
  gasValue: number;
}

// Use a global variable to preserve state across HMR (Hot Module Replacement) in development
declare global {
  var gasReadings: GasReading[] | undefined;
}

export const getGasReadings = (): GasReading[] => {
  if (!global.gasReadings) {
    global.gasReadings = [];
  }
  return global.gasReadings;
};

export const addGasReading = (reading: Omit<GasReading, 'id' | 'timestamp'>) => {
  const readings = getGasReadings();
  const newReading: GasReading = {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString(),
    gasValue: reading.gasValue,
  };
  
  readings.push(newReading);
  
  // Keep last 100 readings to prevent memory leak
  if (readings.length > 100) {
    readings.shift();
  }
  
  return newReading;
};
