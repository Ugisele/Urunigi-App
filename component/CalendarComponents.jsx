import React, { useRef } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';

const CalendarComponent = () => {

  const screenWidth = Dimensions.get('window').width;


  const days = [];
  const today = new Date();
  for (let i = -30; i < 31; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }


  const renderDay = ({ item }) => (
    <View style={[{ flex: 1, width: screenWidth / 7, height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: '#f698c1', color:'white'},
                  item.toDateString() === today.toDateString() ? { backgroundColor: 'white', borderWidth: 0.5, borderRadius: 20, borderColor:'black',width:30,height:30,top:10 } : null]}>
      <Text style={{ color: item.toDateString() === today.toDateString() ? 'blue' : 'white' }}>{item.getDate()}</Text>
    </View>
  );

  
  const flatListRef = useRef(null);

  const scrollToCenter = () => {
    flatListRef.current.scrollToOffset({ animated: false, offset: screenWidth * 15 / 7 });
  };

  return (
    <View >
       
      <FlatList
        ref={flatListRef}
        horizontal
        data={days}
        keyExtractor={(item) => item.toISOString()}
        renderItem={renderDay}
        initialScrollIndex={30}
        getItemLayout={(data, index) => ({ length: 
            70, offset: (screenWidth / 7) * index, index })}
        onMomentumScrollEnd={scrollToCenter}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CalendarComponent;
