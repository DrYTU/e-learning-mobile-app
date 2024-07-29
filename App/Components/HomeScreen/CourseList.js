import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../../Services';
import SubHeading from './SubHeading';
import Color from '../../Utils/Color';
import { Ionicons } from '@expo/vector-icons'
import CourseItem from './CourseItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export default function CourseList({ level, subheadColor="black" }) {


  const [courseList, setCourseList] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getCourseList(level).then(resp => {


      setCourseList(resp?.courses)
    })
  }


  return (
    <View style={{ padding: 20 }}>
      <SubHeading text={level[0].toUpperCase() + level.slice(1) + " Courses"} color={level == 'basic' && subheadColor} />
      <FlatList
        data={courseList}
        key={courseList.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}

        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('CourseDetail', {course:item})}>
            <CourseItem item={item} />
          </TouchableOpacity>

        )}
      />
    </View>
  )
}