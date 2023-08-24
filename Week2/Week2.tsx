import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import PhotoList from './PhotoList';

const Week2: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PhotoList />
    </SafeAreaView>
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

export default Week2;
