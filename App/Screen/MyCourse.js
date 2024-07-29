import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../Utils/Color'
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { GetAllUserEnrolledProgressCourse } from '../Services';
import CourseProgressItem from '../Components/MyCourse/CourseProgressItem';
import emptyFolder from './../../assets/images/empty-folder.png'

export default function MyCourse() {


  const navigation = useNavigation()
  const { user } = useUser();
  const [progressCourseList, setProgressCourseList] = useState();

  useEffect(() => {
    user && GetAllUserEnrolledProgressCourseList()
  }, [user])

  const GetAllUserEnrolledProgressCourseList = () => {
    GetAllUserEnrolledProgressCourse(user.primaryEmailAddress.emailAddress).then(resp => {
      setProgressCourseList(resp.userEnrolledCourses);
    })
  }


  return (
    <View>
      <View style={{ height: 160, backgroundColor: Color.PRIMARY, padding: 30 }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 30, color: Color.WHITE }}>My Course</Text>
      </View>
      
       
           <FlatList
            data={progressCourseList}
            style={{ marginTop: -50, marginBottom: 150 }}
            showsHorizontalScrollIndicator={false}

            renderItem={({ item }) => (
              <TouchableOpacity style={{ margin: 10, padding: 5 }} onPress={() => navigation.navigate('CourseDetail', { course: item.course })}>
                <CourseProgressItem item={item?.course} completedChapter={item?.completedChapter?.length} />
              </TouchableOpacity>

            )}
          />
          
      

    </View>
  )
}