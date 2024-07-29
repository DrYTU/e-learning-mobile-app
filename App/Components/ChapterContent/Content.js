import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import ContentItem from './ContentItem'
import Color from '../../Utils/Color'
import { useNavigation } from '@react-navigation/native'

export default function Content({ content, onChapterFinish }) {

  const [activeIndex, setActiveIndex] = useState(0)
  let contentRef;
  const navigation = useNavigation();
  const onNextBtnPress = (index) => {

    if (content?.chapterContent?.length <= index + 1) {
      onChapterFinish();

      return;
    }
    setActiveIndex(index + 1)
    contentRef.scrollToIndex({ animated: true, index: index + 1 })
  }


  return (
    <ScrollView style={{ padding: 0, height: '100%' }}>
      <ProgressBar
        contentLength={content?.chapterContent.length}
        contentIndex={activeIndex}
      />
      <FlatList
        data={content.chapterContent}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => {
          contentRef = ref
        }}
        renderItem={({ item, index }) => (
          <View style={{ padding: 0 }}>
            <ScrollView style={{ width: Dimensions.get('screen').width, padding: 20, marginBottom:70 }}>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, marginTop: 5 }}>
                {item.heading}
              </Text>
              <ContentItem description={item?.description?.html}
                output={item?.output?.html} />
            </ScrollView>
            <TouchableOpacity style={{
              position: 'absolute',
              bottom: 20,
              marginLeft: 20,
              marginRight: 20,
              width: '90%'
            }} onPress={() => onNextBtnPress(index)}>
              <Text style={{
                padding: 15, backgroundColor: Color.PRIMARY, color: Color.WHITE, borderRadius: 15, textAlign: 'center',
                fontSize: 17, fontFamily: 'Poppins-Regular',
              }}>
                {
                  content?.chapterContent?.length > index + 1 ? 'Next' : 'Finish'
                }
              </Text>
            </TouchableOpacity>
          </View>


        )}

      />

    </ScrollView>
  )
}