import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUserEnrolledProgressCourse } from '../../Services'
import { useUser } from '@clerk/clerk-expo';
import SubHeading from './SubHeading';
import Color from '../../Utils/Color';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';


export default function CourseProgress() {
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
        <View style={{ padding: 20 }}>
            <SubHeading text={"In Progress"} color={Color.WHITE} />
            <FlatList
                data={progressCourseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { course: item.course })}>
                        <CourseItem item={item?.course} completedChapter={item?.completedChapter?.length}/>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}