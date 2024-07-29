import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Color from '../../Utils/Color';
import point from '../../../assets/images/point.png'
import { Ionicons } from '@expo/vector-icons'

export default function Header({userPoints}) {

  const { isLoaded, isSignedIn, user } = useUser();


  return isLoaded && (
    <View>
      <View style={[{ justifyContent: 'space-between' }, styles.rowStyle]}>

        <View style={styles.rowStyle}>
          <Image source={{ uri: user?.imageUrl }}
            style={{ width: 50, height: 50, borderRadius: 99 }}
          />
          <View>
            <Text style={styles.mainText}>Welcome,</Text>
            <Text style={{
              color: Color.WHITE,
              fontFamily: "Poppins-Regular",
              fontSize: 20,
            }}>{user?.fullName}</Text>
          </View>
        </View>

        <View style={[[styles.rowStyle],{marginRight:12,gap: 5}]}>
          <Image source={point} style={{ width: 24, height: 24 }} />
          <Text style={{marginTop:5,color: Color.WHITE,
    fontFamily: "Poppins-Regular", fontSize:22}}>{userPoints}</Text>
        </View>

      </View>
      
      <View style={{ backgroundColor: Color.WHITE, display: 'flex', flexDirection: 'row', justifyContent: "space-between", borderRadius: 99, paddingLeft: 20, paddingRight: 5, marginTop: 20 }}>
        <TextInput placeholder='Kurs Ara   ' style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }} />
        <Ionicons name='search-circle' size={50} color={Color.PRIMARY} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  mainText: {
    color: Color.WHITE,
    fontFamily: "Poppins-Regular"
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }
})