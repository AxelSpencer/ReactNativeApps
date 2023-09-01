import React from "react";
import { StyleSheet, View } from 'react-native';
import { BatterySDK } from "./Battery";
//import { AccelerometerSDK } from "./Accelerometer";

const Week6: React.FC = () => {
  return (
    <View style={styles.container}>
      <BatterySDK/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Week6;
