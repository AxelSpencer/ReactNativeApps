import { useEffect, useState, useCallback } from "react";
import * as Battery from "expo-battery";
import { StyleSheet, Text, View } from "react-native";
import { AccelerometerSDK } from "./Accelerometer";

export const BatterySDK = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [subscription, setSubscription] = useState<Battery.Subscription | null>(
    null
  );

  const _subscribe = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel);
  };

  const _unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [_unsubscribe]);

  const { x, y, z } = AccelerometerSDK();
  const magnitude = Math.sqrt(x * x + y * y + z * z);

  useEffect(() => {
    console.log("Magnitude:", magnitude);

    if (magnitude > 1.1) {
      console.log("Updating battery level...");
      setBatteryLevel((batteryLevel) =>
        Math.min(batteryLevel as any + 0.01, 1)
      );
      console.log(batteryLevel);
    }
  }, [magnitude]);

  const batteryLevelNum =
    batteryLevel !== null ? Math.round(batteryLevel * 100) : 0;
  const batteryLevelPercentage =
    batteryLevel !== null ? `${Math.round(batteryLevel * 100)}%` : "N/A";

  const batteryStatusMessage = () => {
    if (batteryLevelNum === 100) {
      return `Current Battery Level: ${batteryLevelPercentage}\nFully Charged!`;
    } else {
      return `Current Battery Level: ${batteryLevelPercentage}`;
    }
  };

  const batterLevelColors = (batteryLevelNum: number) => {
    let color = "#03fc5e";

    if (batteryLevelNum < 20) {
      color = "red";
    } else if (batteryLevelNum < 50) {
      color = "#fcba03";
    }

    return color;
  };

  return (
    <View style={styles.container}>
      <View style={styles.batteryBar}>
        <View
          style={[
            styles.batteryBarFill,
            {
              width: batteryLevelPercentage as any,
              backgroundColor: batterLevelColors(batteryLevelNum) as any,
            },
          ]}
        />
      </View>
      <Text style={styles.message}>{batteryStatusMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  batteryBar: {
    width: 200,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  batteryBarFill: {
    height: "100%",
    borderRadius: 5,
    borderWidth: 5,
  },
  message: {
    textAlign: 'center'
  },
});
