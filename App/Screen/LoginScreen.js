import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View,  Image, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking"
import Color from "../Utils/Color";
import { useFonts } from "expo-font";


export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Warm up the android browser to improve UX
        // https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();


const SignInWithOAuth = () => {

    const [fontsLoaded, error] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
        'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    });

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow({ redirectUrl: Linking.createURL("/dashboard", { scheme: "e-learning" }) });

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);


    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ display: 'flex', flexDirection: "column", alignItems: 'center' , backgroundColor:Color.WHITISH}}>
            <Image source={{ uri: 'https://shop.miletakademi.net/wp-content/uploads/2022/12/Portal-Software-Box_22.webp' }} style={{ width: 400, height: 500, objectFit: 'contain', marginTop: 0 }} />
            <View style={{
                height: 500,
                backgroundColor: Color.PRIMARY,
                width: 500,
                marginTop: 0,
                padding: 20,
                alignItems: 'center'
            }}>
                <Text style={{ textAlign: 'center', fontSize: 35, color: Color.WHITE, fontFamily: "Poppins-Bold", marginTop: 30 }}>Milet Akademi</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20, color: Color.LIGHT_PRIMARY, fontFamily: "Poppins-Regular" }}>Portal ile analiz yapmak çok kolay.</Text>

                <TouchableOpacity
                    onPress={onPress}
                    style={{ backgroundColor: Color.WHITE, display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 10, borderRadius: 99, marginTop: 25, width: 375 }}>

                    <Image source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }} style={{ width: 40, height: 40 }}></Image>
                    <Text style={{ fontSize: 20, color: Color.PRIMARY, fontFamily: 'Poppins-Regular' }}>
                        Google ile üye olun
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};
export default SignInWithOAuth;