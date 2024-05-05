import React from 'react';
import { View, Text, TouchableOpacity, Pressable, Dimensions, Modal,} from 'react-native';
import { TextInput } from 'react-native-paper';


export const AddArticles = () => {
    return (
        <View className='flex-1 w-[vw] h-[vh] justify-center items-center pt-10 pl-5 pr-4'>
            <Text> List of Articles</Text>
            <Modal>
                <Text>Add Articles</Text>
                <TextInput
                placeholder='add new article'/>
                <Pressable>
                    <Text>Close</Text>
                </Pressable>
            </Modal>
            <Text>AddArticles</Text>

        </View>
    )
}