import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './App/Screen/LoginScreen';
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import { PUBLISHABLE_KEY } from '@env';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { useState } from 'react';
import { UserPointsContext } from './App/Context/UserPointsContext';
import { LogBox } from 'react-native';

export default function App() {

    // Belirli hata mesajlarını yok saymak için LogBox'u kullanın
    LogBox.ignoreLogs(['Warning: ...']); // Buraya uyarı mesajının başını yazabilirsiniz.

    // console.error fonksiyonunu geçici olarak değiştirmek
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (/defaultProps/.test(args[0])) return;
      originalConsoleError(...args);
    };


  const [isChapterCompleted, setIsChapterCompleted] = useState(false);
  const [userPoints, setUserPoints] = useState(10);
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkLoaded>
        <UserPointsContext.Provider value={{ userPoints, setUserPoints }}>
          <CompleteChapterContext.Provider value={{ isChapterCompleted, setIsChapterCompleted }}>
            <View style={styles.container}>


              <SignedIn>
                <NavigationContainer>
                  <TabNavigation />
                </NavigationContainer>

              </SignedIn>


              <SignedOut>
                <LoginScreen></LoginScreen>
              </SignedOut>

            </View>
          </CompleteChapterContext.Provider>
        </UserPointsContext.Provider>
      </ClerkLoaded>
    </ClerkProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
});
