import { View, Text, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { enrollCourse, getUserEnrolledCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';
import Color from '../Utils/Color';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function CourseDetailScreen() {
    const navigation = useNavigation();
    const params = useRoute().params;
    const { isChapterCompleted, setIsChapterCompleted } = useContext(CompleteChapterContext);

    const [userEnrolledCourse, setUserEnrolledCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useUser();

    useEffect(() => {
        if (user && params.course) {
            GetUserEnrolledCourse();
        }
    }, [user, params.course]);

    useEffect(() => {
        isChapterCompleted && GetUserEnrolledCourse()
    }, [isChapterCompleted]);

    const UserEnrollCourse = async () => {
        setLoading(true);
        try {
            const resp = await enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress);
            if (resp) {
                ToastAndroid.show('Course Enrolled successfully!', ToastAndroid.LONG);

                setUserEnrolledCourse(prevState => [
                    ...prevState,
                    {
                        id: resp.createUserEnrolledCourse.id,
                        courseId: params.course.id,
                        completedChapter: []
                    }
                ]);
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
        } finally {
            setLoading(false);
        }
    };

    const GetUserEnrolledCourse = async () => {
        setLoading(true);
        try {
            const resp = await getUserEnrolledCourse(params.course.id, user.primaryEmailAddress.emailAddress);
            setUserEnrolledCourse(resp.userEnrolledCourses);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
        }
    };

    return params.course && (
         !loading
         ?(
        <ScrollView style={{ padding: 20 }
        }>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color={Color.PRIMARY} />}
            <DetailSection enrollCourse={UserEnrollCourse} course={params.course} userEnrolledCourse={userEnrolledCourse} />
            <ChapterSection chapterList={params.course.chapters} userEnrolledCourse={userEnrolledCourse} />
        </ScrollView >
        )

        :(
        <ActivityIndicator size="large" color={Color.PRIMARY} style={{top:400}} />
        )
    );
}
