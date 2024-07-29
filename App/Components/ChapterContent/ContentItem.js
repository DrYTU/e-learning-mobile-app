import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html';
import Color from '../../Utils/Color';


export default function ContentItem({ description, output }) {


    const [isRun, setIsRun] = useState(false);
    const { width } = useWindowDimensions();
    const descSource = {
        html: description
    }

    const outSource = {
        html: output
    }


    const tagsStyles = {
        body: {
            fontFamily: 'Poppins-Regular',
            fontSize: 17
        },
        code: {
            backgroundColor: Color.BLACK,
            color: Color.WHITE,
            padding: 20,
            borderRadius: 15
        }
    }

    const outputStyles = {
        body: {
            fontFamily: 'Poppins-Regular',
            fontSize: 17,
            backgroundColor: Color.BLACK,
            color: Color.WHITE,
            padding: 20,
            borderRadius: 15
        },
        code: {
            backgroundColor: Color.BLACK,
            color: Color.WHITE,
            padding: 20,
            borderRadius: 15
        }
    }

    return description && (
        <View>
            {/*<Text>{description}</Text>*/}
            <RenderHTML
                contentWidth={width}
                source={descSource}
                tagsStyles={tagsStyles}
            />
            {output != '<p></p>' ?
                <TouchableOpacity onPress={()=>setIsRun(true)}>
                    <Text style={{ padding: 12, backgroundColor: Color.PRIMARY, borderRadius: 10, fontFamily: 'Poppins-Regular', fontSize: 15, color: Color.WHITE, textAlign: 'center', width: 100, marginBottom: 30, marginTop: -30 }}>Run</Text>
                </TouchableOpacity> : null
            }
            {isRun?
                <>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 17, marginBottom: 10 }}>Output:</Text>

                    <RenderHTML
                        contentWidth={width}
                        source={outSource}
                        tagsStyles={outputStyles}
                    />
                </>: null}
        </View>
    )
}