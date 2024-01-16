import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Searchbar, BottomNavigation, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';  // Updated import for FontAwesome5
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// ... (other imports remain unchanged)

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bottomTab, setBottomTab] = useState('explore');
  const scrollY = new Animated.Value(0);
  const scrollPosition = new Animated.Value(0);
  const [searchBarVisible, setSearchBarVisible] = useState(true);

  const [activityCategories, setActivityCategories] = useState([
    { name: 'All', icon: 'star' },
    { name: 'Kayaking', icon: 'water' },
    { name: 'House Boat', icon: 'ship' },
    { name: 'Adventure', icon: 'mountain' },
    // Add more categories as needed
  ]);

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

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  const handleScrollEnd = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
    { useNativeDriver: false },
  );

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const footerTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Animated.View
        style={[
          styles.searchBarContainer,
          { transform: [{ translateY: searchBarTranslateY }] },
        ]}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          icon={({ color, size }) => (
            <FontAwesome5Icon name="search" color={color} size={size} style={styles.searchIcon} />
          )}
        />
      </Animated.View>

      <ScrollView
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {/* Horizontal Scrollable Section for Activity Categories */}
        <View style={styles.categoryContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={activityCategories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Chip icon={item.icon} mode="outlined" style={styles.categoryChip}>
                  {item.name}
                </Chip>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Scrollable Content for Activity Cards */}
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
      </ScrollView>

      <Animated.View style={[styles.bottomNavigation, { transform: [{ translateY: footerTranslateY }] }]}>
        <BottomNavigation
          navigationState={{
            index: 0,
            routes: [
              { key: 'explore', title: 'Explore', icon: 'compass-outline' },
              { key: 'saved', title: 'Saved', icon: 'heart-outline' },
              { key: 'myOrders', title: 'My Orders', icon: 'package-variant' },
              { key: 'profile', title: 'Profile', icon: 'account-outline' },
            ],
          }}
          renderScene={() => null}
          activeColor="#007AFF"
          inactiveColor="#000000"
          style={styles.bottomNavigationContainer}
          renderIcon={({ route, color }) => (
            <Icon name={route.icon} size={20} color={color} style={styles.icon} />
          )}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  searchBar: {
    marginHorizontal: 10,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: getStatusBarHeight() + 40,
    zIndex: 1, // Ensure the category section is above other components
  },
  categoryChip: {
    marginRight: 10,
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
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: -13,
  },
  description: {
    fontSize: 12,
    color: 'grey',
    marginBottom: -8,
  },
  price: {
    fontSize: 11,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomNavigationContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    marginRight: 5,
  },
});

export default HomeScreen;
