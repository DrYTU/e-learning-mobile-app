import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Color from '../Utils/Color'
import CourseList from '../Components/HomeScreen/CourseList'
import { useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services'
import { UserPointsContext } from '../Context/UserPointsContext'
import CourseProgress from '../Components/HomeScreen/CourseProgress'


export default function HomeScreen() {

  const {user} = useUser();
  const {userPoints, setUserPoints} = useContext(UserPointsContext);

  useEffect(()=> {
    user&&createUser();
  }, [user])
  const createUser = ()=> {
    if(user)
      {
        createNewUser(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl)
        .then(resp=>{
          if(resp)
            GetUser()
        })
      }
  }

  const GetUser = () => {
    getUserDetail(user.primaryEmailAddress.emailAddress)
    .then(resp=> setUserPoints(resp.userDetail?.point));
    
  }

  return(
    user&&userPoints?
    <ScrollView>
      <View style={{ backgroundColor: Color.PRIMARY, height: 250, padding: 20 }}>
        <Header userPoints={userPoints}/>
      </View>
      <View style={{ backgroundColor: Color.WHITISH, height: '100%' }}>
        <View style={{ marginTop: -80 }}>
          {userPoints>10?<CourseProgress />:null}
          <CourseList level={'basic'} subheadColor={userPoints>10?"black":"white"} />
        </View>
        <CourseList level={'advance'} />

      </View>
    </ScrollView>
    :<ActivityIndicator size="large" color={Color.PRIMARY} style={{top:400}} />

  )
}