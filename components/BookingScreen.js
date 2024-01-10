import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { Linking, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const BookingScreen = ({ route }) => {
  const { activityId } = route.params;
  const navigation = useNavigation();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    // Fetch program details from the API based on activityId
    axios.get(`http://13.55.58.126:8000/listactivity/activities/${activityId}`)
      .then(response => {
        setProgram(response.data);
      })
      .catch(error => {
        console.error('Error fetching program details:', error);
      });
  }, [activityId]);

  const handleViewMapPress = () => {
    const mapURL = 'https://maps.google.com'; // Replace with your map URL
    Linking.openURL(mapURL);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const decrementGuests = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const incrementGuests = () => {
    setGuests(guests + 1);
  };

  const handleContinuePress = () => {
    // Navigate to the screen where you can select the desired time slot
    navigation.navigate('TimeSlotSelection', {
      activityId,
      selectedDate,
      guests,
    });
  };

  if (!program) {
    // Display loading indicator or message while fetching data
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: program.image }} style={styles.programImage} />
      </View>

      <Text style={styles.programName}>{program.name}</Text>

      <Text style={styles.description}>{program.description}</Text>

      <Text style={styles.addressText}>{program.location}</Text>

      <Text style={styles.viewMapText} onPress={handleViewMapPress}>
        View on Map
      </Text>

      <View style={styles.bookingDetails}>
        <View style={styles.transparentTile}>
          <Text style={styles.bookingDetailsHeading}>Your Booking Details</Text>
          <View style={styles.bookingRow}>
            <FontAwesome5 name="calendar" size={20} color="#007AFF" style={styles.icon} />
            <Text style={styles.bookingLabel}>Date:</Text>
            <Text style={styles.bookingValue}>
              {selectedDate ? moment(selectedDate).format('MMM DD, YYYY') : 'Select date'}
            </Text>
          </View>
          <View style={styles.bookingRow}>
            <FontAwesome5 name="user-friends" size={20} color="#007AFF" style={styles.icon} />
            <Text style={styles.bookingLabel}>Guests:</Text>
            <View style={styles.guestsControl}>
              <TouchableOpacity onPress={decrementGuests}>
                <FontAwesome5 name="minus" size={20} color="#007AFF" style={styles.guestControlIcon} />
              </TouchableOpacity>
              <Text style={styles.bookingValue}>{guests}</Text>
              <TouchableOpacity onPress={incrementGuests}>
                <FontAwesome5 name="plus" size={20} color="#007AFF" style={styles.guestControlIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.transparentTile}>
          <View style={styles.priceAndBookNow}>
            <Text style={styles.priceText}>{`₹${program.price}`}</Text>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  programImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  programName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  addressText: {
    fontSize: 16,
    marginBottom: 8,
  },
  viewMapText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'none',
  },
  transparentTile: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButtonText: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
  bookingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  bookingValue: {
    fontSize: 16,
    color: '#007AFF',
  },
  bookingDetailsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  priceAndBookNow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guestsControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestControlIcon: {
    paddingHorizontal: 8,
  },
});

export default BookingScreen;
