// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.55.58.126:8000/listactivity/activities/');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => navigation.navigate('Booking', { activity: item })}
        >
        
            <Card elevation={5} style={{ margin: 10 }}>
              {/* Display activity details */}
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph>Price: {item.price}</Paragraph>
                <Paragraph>Location: {item.location}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;