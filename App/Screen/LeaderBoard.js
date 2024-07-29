import { View, Text, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GetAllUser } from '../Services'
import Color from '../Utils/Color';
import Gold from './../../assets/images/medal1.png'
import Silver from './../../assets/images/medal2.png'
import Bronze from './../../assets/images/medal3.png'
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function LeaderBoard() {

  const [userList, setUserList] = useState([]);
  const {isChapterCompleted, setIsChapterCompleted} = useContext(CompleteChapterContext)
  useEffect(() => {
    GetAllUserDetails();
  }, [])

  useEffect(() => {
    GetAllUserDetails();
  }, [isChapterCompleted])


  const GetAllUserDetails = () => {

    GetAllUser().then(resp => {
      resp && setUserList(resp?.userDetails)
    })
  }
  return (
    <View>
      <View style={{ height: 160, backgroundColor: Color.PRIMARY, padding: 30 }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 30, color: Color.WHITE }}>LeaderBoard</Text>
      </View>
      <View style={{marginTop:-40, height: '85%'}}>
        <FlatList
          data={userList}
          renderItem={({ item, index }) => (

            <View style={{ display: 'flex', flexDirection: "row", alignItems:'center', justifyContent:'space-between', padding:20, backgroundColor:Color.WHITE, margin:8, marginHorizontal:15, borderRadius:15}}>
              <View style={{ display: 'flex', flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: Color.GRAY }}>{index + 1}</Text>
                <Image source={{ uri: item?.profileImage }} style={{ width: 60, height: 60, borderRadius:99 }} />
                <View>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>{item.userName}</Text>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: Color.GRAY }}>{item.point+" Points"}</Text>
                </View>
              </View>
              {index<3?
              <Image source={index+1==1?Gold:
                index+1==2?Silver:Bronze
              } style={{width:40, height:40}}/>
              :null}
            </View>

          )}
        />
      </View>

    </View>
  )
}