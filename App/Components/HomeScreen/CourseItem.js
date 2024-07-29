import { View, Text, Image } from 'react-native'
import React from 'react'
import Color from '../../Utils/Color';
import { Ionicons } from '@expo/vector-icons'
import CourseProgressBar from './CourseProgressBar';

export default function CourseItem({ item, completedChapter}) {
    return (
        <View style={{
            padding: 10,
            backgroundColor: Color.WHITE,
            marginRight: 15,
            borderRadius: 15
        }}>
            <Image source={{ uri: item?.banner.url }} style={{ width: 210, height: 120, borderRadius: 15 }} />
            <View style={{ padding: 7 }}>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17
                }}>{item.name}</Text>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                        <Ionicons name="book-outline" size={18} color='black' />
                        <Text style={{ fontFamily: "Poppins-Regular" }}> {item?.chapters?.length} Chapters</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginTop: 5 }}>
                        <Ionicons name="time" size={18} color={'gray'} />
                        <Text style={{ fontFamily: "Poppins-Regular" }}> {item?.time}</Text>
                    </View>
                </View>

                <Text style={{
                    marginTop: 5,
                    color: Color.PRIMARY,
                    fontFamily: "Poppins-Regular",

                }}>{item.price == 0 ? 'Free' : item.price+"$"}</Text>

            </View>
            {completedChapter!=undefined?
            <CourseProgressBar totalChapter={item?.chapters?.length} completedChapter={completedChapter}/>:null}
        </View>
    )
}