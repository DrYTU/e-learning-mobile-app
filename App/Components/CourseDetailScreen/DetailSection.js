import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Color from '../../Utils/Color';
import OptionItem from './OptionItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DetailSection({ course, enrollCourse, userEnrolledCourse }) {

    return (
        <View style={{ padding: 10, borderRadius: 15, backgroundColor: Color.WHITE }}>
            <Image source={{ uri: course?.banner?.url }} style={{ width: Dimensions.get('screen').width * 0.87, height: 190, borderRadius: 15 }} />
            <View style={{ padding: 10, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 22, fontFamily: 'Poppins-Bold', marginTop: 10 }}>{course?.name}</Text>
                <View>
                    <View style={styles.rowStyle}>
                        <OptionItem icon={'book-outline'} value={course.chapters?.length + " Chapters"} />
                        <OptionItem icon={'time'} value={course.time + " hr"} />
                    </View>
                    <View style={styles.rowStyle}>
                        <OptionItem icon={'person-circle-outline'} value={course.author} />
                        <OptionItem icon={'cellular-outline'} value={course.level[0]?.toUpperCase() + course.level.slice(1)} />
                    </View>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Description</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: Color.GRAY, lineHeight: 25 }}>{course.description?.markdown}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", gap: 20 }}>
                    {userEnrolledCourse.length === 0 ?
                        <TouchableOpacity onPress={enrollCourse} style={{ padding: 15, backgroundColor: Color.PRIMARY, borderRadius: 15 }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: Color.WHITE, textAlign: 'center', fontSize: 17 }}>
                                Enroll For Free
                            </Text>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity style={{ padding: 15, backgroundColor: Color.SECONDARY, borderRadius: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: Color.WHITE, textAlign: 'center', fontSize: 17 }}>
                            Membership $2.99/Mon
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }
});
