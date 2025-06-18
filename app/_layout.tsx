import { HeaderShownContext } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const isLoggetIn = false;
const HaveCreateAccount = false;


export default function RootLayout() {
  return (
    <React.Fragment>
        <StatusBar style='auto' />
        <Stack>

            <Stack.Protected guard={isLoggetIn}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Protected guard={isLoggetIn}>  
                <Stack.Screen name='sign-in'  />
                <Stack.Screen name="modal" options={{ presentation : "modal" }} />
            </Stack.Protected>

            <Stack.Protected guard={!HaveCreateAccount} >
                <Stack.Screen name='create-account' />
            </Stack.Protected>

        </Stack>
    </React.Fragment>
  );
}
