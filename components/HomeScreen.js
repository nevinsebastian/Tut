// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        icon={({ color, size }) => (
          <FontAwesome5Icon name="search" color={color} size={size} style={styles.searchIcon} />
        )}
      />
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Booking', { activity: item })}
          >
            <Card elevation={5} style={styles.card}>
              {/* Display activity details */}
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content>
                <Title style={styles.title}>{item.name}</Title>
                <Paragraph style={styles.description}>{item.description}</Paragraph>
                <Paragraph style={styles.price}>Price: {item.price}</Paragraph>
                <Paragraph style={styles.location}>Location: {item.location}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set background color to white
  },
  searchBar: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  card: {
    margin: 10,
    backgroundColor: 'white', // Set card background color to white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Set title color to black
  },
  description: {
    fontSize: 16,
    color: 'black', // Set description color to black
  },
  price: {
    fontSize: 16,
    color: 'black', // Set price color to black
  },
  location: {
    fontSize: 16,
    color: 'black', // Set location color to black
  },
});

export default HomeScreen;
