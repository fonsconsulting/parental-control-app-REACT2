import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './src/components/ErrorBoundary';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TabNavigator from './src/navigation/TabNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { colors } from './src/theme/colors';

function AppContent() {
  const { session, loading } = useAuth();
  const [screen, setScreen] = useState('welcome'); // 'welcome' | 'login' | 'signup'

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (session) {
    return (
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </>
    );
  }

  if (screen === 'welcome') {
    return (
      <>
        <StatusBar style="light" />
        <WelcomeScreen onGetStarted={() => setScreen('login')} />
      </>
    );
  }

  if (screen === 'login') {
    return (
      <>
        <StatusBar style="light" />
        <LoginScreen onSwitch={() => setScreen('signup')} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <SignupScreen onSwitch={() => setScreen('login')} />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
