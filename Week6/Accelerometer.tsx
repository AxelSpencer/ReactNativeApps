import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Subscription } from 'expo-battery';

export function AccelerometerSDK() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const accelerometerData = { x, y, z };

  return accelerometerData;
}
