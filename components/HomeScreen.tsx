import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Appbar } from 'react-native-paper';

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
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Adventure Activities" />
      </Appbar.Header>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
              <Title style={styles.title}>{item.name}</Title>
              <Paragraph style={styles.description}>{item.description}</Paragraph>
              <Paragraph style={styles.price}>Price: {item.price}</Paragraph>
              <Paragraph style={styles.location}>Location: {item.location}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const pastelTheme = {
  colors: {
    primary: '#87CEEB', // Light Sky Blue - Pastel
    background: '#F0F8FF', // Alice Blue - Light Pastel background color
    card: '#B0E0E6', // Powder Blue - Light Pastel card color
    text: '#333', // Dark text color
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pastelTheme.colors.background,
  },
  appbar: {
    backgroundColor: pastelTheme.colors.primary,
    elevation: 4,
  },
  card: {
    marginVertical: 5,
    elevation: 5,
    backgroundColor: pastelTheme.colors.card,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: pastelTheme.colors.text,
  },
  description: {
    fontSize: 14,
    color: pastelTheme.colors.text,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: pastelTheme.colors.text,
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: pastelTheme.colors.text,
  },
});

export default HomeScreen;


