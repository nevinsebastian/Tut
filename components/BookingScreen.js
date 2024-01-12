import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Linking, useNavigation } from '@react-navigation/native';

const BookingScreen = ({ route }) => {
  const { activity } = route.params;
  const navigation = useNavigation();
  
  const handleViewMapPress = () => {
    const mapURL = 'https://maps.google.com'; // Replace with your map URL
    Linking.openURL(mapURL);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: activity.image }} style={styles.activityImage} />
      </View>

      <Text style={styles.activityName}>{activity.name}</Text>

      <Text style={styles.description}>{activity.description}</Text>

      <Text style={styles.priceText}>{`Price: ₹${activity.price}`}</Text>

      <Text style={styles.locationText}>{`Location: ${activity.location}`}</Text>

      <Text style={styles.viewMapText} onPress={handleViewMapPress}>
        View on Map
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  activityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  locationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  viewMapText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeSlotItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default BookingScreen;
