import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { markChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';
import { useUser } from '@clerk/clerk-expo';
import { UserPointsContext } from '../Context/UserPointsContext';


export default function ChapterContentScreen() {

    const params = useRoute().params;
    const navigation = useNavigation();
    const { user } = useUser();
    const { userPoints, setUserPoints } = useContext(UserPointsContext);
    const { isChapterCompleted, setIsChapterCompleted } = useContext(CompleteChapterContext);

    const onChapterFinish = () => {

        const contentLength = params.content.chapterContent?.length || 0;
        const currentPoints = Number(userPoints) || 0;
        const totalPoints = currentPoints + contentLength * 10;

        markChapterCompleted(params.chapterId, params.userCourseRecordId, user.primaryEmailAddress.emailAddress, totalPoints)
        .then(resp => {
            if (resp) {
                ToastAndroid.show("Course Completed!", ToastAndroid.LONG);
                setIsChapterCompleted(true);
                setUserPoints(totalPoints);
                navigation.goBack();
            }
        })
            .catch(error => {
                console.error('Error marking chapter as completed:', error);
            });
    };



    return params.content && (
        <View>
            <Content content={params.content} onChapterFinish={() => onChapterFinish()} />
        </View>
    )
}