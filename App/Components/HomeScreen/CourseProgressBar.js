import { View, Text } from 'react-native'
import React from 'react'
import Color from '../../Utils/Color'

export default function CourseProgressBar({totalChapter, completedChapter}) {

    const width = completedChapter/totalChapter*100
  return (
    <View style={{width: '100%', height:7, backgroundColor:Color.GRAY, borderRadius:99}}>
      <View style={{width: width+'%', height:7, backgroundColor:Color.PRIMARY, borderRadius:99}}></View>
    </View>
  )
}