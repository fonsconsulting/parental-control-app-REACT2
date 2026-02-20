import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './src/components/ErrorBoundary';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar style={started ? 'auto' : 'light'} />
        {started ? (
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        ) : (
          <WelcomeScreen onGetStarted={() => setStarted(true)} />
        )}
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
