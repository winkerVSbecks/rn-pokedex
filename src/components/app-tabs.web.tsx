import { Tabs, TabSlot } from 'expo-router/ui';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  slot: {
    height: '100%',
  },
});
