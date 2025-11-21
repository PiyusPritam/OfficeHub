import React, { useState, useEffect } from 'react';
import './ShiftCard.css';

export default function ShiftCard({ currentUser }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    // Check if user is currently checked in
    checkCurrentStatus();
    
    // Start countdown timer
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkCurrentStatus = async () => {
    // This would check the current attendance status
    // For now, we'll simulate based on time of day
    const now = new Date();
    const hours = now.getHours();
    setIsCheckedIn(hours >= 9 && hours < 17); // 9 AM to 5 PM
  };

  const updateCountdown = () => {
    const now = new Date();
    const endOfShift = new Date();
    endOfShift.setHours(21, 0, 0, 0); // 9 PM
    
    if (now > endOfShift) {
      endOfShift.setDate(endOfShift.getDate() + 1);
    }
    
    const diff = endOfShift.getTime() - now.getTime();
    
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    } else {
      setTimeRemaining('00:00:00');
    }
  };

  return (
    <div className="shift-header">
      <div className="shift-info">
        Offshore General [ 12:00 PM - 9:00 PM ]
      </div>
      <div className="checkout-badge">
        Check-out<br/>
        <span className="timer">{timeRemaining} Hrs</span>
      </div>
    </div>
  );
}