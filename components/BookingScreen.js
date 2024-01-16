import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: activity.image }} style={styles.activityImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.activityName}>{activity.name}</Text>
          <Text style={styles.description}>{activity.description}</Text>
        </View>

        <Text style={styles.viewMapText} onPress={handleViewMapPress}>
          View on Map
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceText}>{`Price: ₹${activity.price}`}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.bookNowButton} >
            <Text style={styles.bookNowButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  activityImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  activityName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  viewMapText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  priceText: {
    fontSize: 16,
    marginBottom: 8,
  },
  bookNowButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  bookNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingScreen;
