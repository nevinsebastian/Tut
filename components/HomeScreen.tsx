// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';

interface Activity {
  id: number;
  provider_name: string;
  name: string;
  description: string;
  price: number;
  location: string;
  image: string;
  time_slots: any[]; // Update the type as needed
}

const HomeScreen: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://13.55.58.126:8000/listactivity/activities/');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>Activities Section</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Location: {item.location}</Text>
            <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
            {/* Display time slots if available */}
            {item.time_slots.length > 0 && (
              <View>
                <Text>Available Time Slots:</Text>
                {item.time_slots.map((timeSlot: any) => (
                  <Text key={timeSlot.id}>
                    {timeSlot.start_time} - {timeSlot.end_time}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
