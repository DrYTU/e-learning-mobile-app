import { View, Text, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Color from '../../Utils/Color'
import { useNavigation } from '@react-navigation/native'
import { CompleteChapterContext } from '../../Context/CompleteChapterContext'

export default function ChapterSection({ chapterList, userEnrolledCourse }) {

    const {isChapterCompleted,setIsChapterCompleted}  = useContext(CompleteChapterContext);
    const navigation = useNavigation();

    const checkIsChapterCompleted = (chapterId) => {
        if(userEnrolledCourse[0]?.completedChapter?.length<=0){
            return false;
        }
        const resp = userEnrolledCourse[0]?.completedChapter?.find(item=> item.chapterId == chapterId)
        return resp;
    }

    const OnChapterPress = (chapter) => {
        if (userEnrolledCourse.length === 0) {
            ToastAndroid.show("Please Enroll First", ToastAndroid.LONG)
            return;
        } else {
            setIsChapterCompleted(false);
            navigation.navigate("ChapterContent",
                {
                    content: chapter,
                    chapterId: chapter.id,
                    userCourseRecordId: userEnrolledCourse[0]?.id

                })
        }
    }

    return chapterList && (
        <View style={{ padding: 10, backgroundColor: Color.WHITE, marginTop: 20, marginBottom: 20, borderRadius: 15 }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 22, padding: 5, marginTop: 5 }}>Chapters</Text>
            {chapterList.map((item, index) => (
                <TouchableOpacity key={index} style={[checkIsChapterCompleted(item.id)
                ?styles.completedChapter 
                :styles.inCompletedChapter]}
                 onPress={() => OnChapterPress(item)}>
                    <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {checkIsChapterCompleted(item.id)
                        ?<Ionicons name='checkmark-circle' size={30} color={Color.GREEN} style={{marginLeft:-5}}/>
                        :<Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 27, color: Color.GRAY }}>{index + 1}</Text>
                        }
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: Color.GRAY }}>{item.title}</Text>
                    </View>
                    {userEnrolledCourse.length === 0 ?
                        <Ionicons name='lock-closed' size={25} color={Color.GRAY} /> :
                        <Ionicons name='play' size={25} color={checkIsChapterCompleted(item.id)? Color.GREEN: Color.GRAY} />
                    }
                </TouchableOpacity>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    inCompletedChapter: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderWidth: 1, borderRadius: 10, marginTop: 10, borderColor: Color.GRAY 
    },
    completedChapter:{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderWidth: 1, borderRadius: 10, marginTop: 10, borderColor: Color.GREEN, backgroundColor: Color.LIGHT_GREEN, minHeight:75
    }
})