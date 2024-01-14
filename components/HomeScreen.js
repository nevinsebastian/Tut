import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Searchbar, BottomNavigation } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';



const HomeScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bottomTab, setBottomTab] = useState('explore');

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

  const handleBottomTabPress = (tab) => setBottomTab(tab);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
          <TouchableOpacity onPress={() => navigation.navigate('Booking', { activity: item })}>
            <Card elevation={0} style={styles.card}>
              <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
              <Card.Content>
                <Title style={styles.title}>{item.name}</Title>
                <Paragraph style={styles.description}>{item.description}</Paragraph>
                <Paragraph style={styles.location}>Location: {item.location}</Paragraph>
                <Paragraph style={styles.price}>Price: ₹{item.price}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      <BottomNavigation
        style={styles.bottomNavigation}
        navigationState={{
          index: 0,
          routes: [
            { key: 'explore', title: 'Explore', icon: 'compass-outline' },
            { key: 'saved', title: 'Saved', icon: 'heart-outline' },
            { key: 'myOrders', title: 'My Orders', icon: 'package-variant' },
            { key: 'profile', title: 'Profile', icon: 'account-outline' },
          ],
        }}
        onIndexChange={(index) => handleBottomTabPress(index === 0 ? 'explore' : 'saved')}
        renderScene={() => null}
        activeColor="#007AFF"
        inactiveColor="#000000"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight(true),
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
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    height: 300,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: -5,
  },
  description: {
    fontSize: 12,
    color: 'grey',
    marginBottom: -3,
  },
  price: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: -5,
  },
  location: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 0,
  },
  bottomNavigation: {
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default HomeScreen;
