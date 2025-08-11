import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider, useAuth } from './auth-context';

function LayoutStack() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <StatusBar style='auto' />
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="create-account" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutStack />
    </AuthProvider>
  );
}
