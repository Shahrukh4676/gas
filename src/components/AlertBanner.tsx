import { AlertTriangle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AlertBannerProps {
  gasValue: number;
}

export default function AlertBanner({ gasValue }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (gasValue >= 120) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [gasValue]);

  if (!isVisible) return null;

  return (
    <div className="alert-banner">
      <div className="alert-content">
        <AlertTriangle size={24} />
        <span>Danger Alert! Gas value has reached 120 PPM. Current value: {gasValue} PPM.</span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger-color)' }}
      >
        <X size={20} />
      </button>
    </div>
  );
}
