import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Linking, useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

// Import Paper UI components
import { Chip, Button, TextInput, IconButton } from 'react-native-paper';

const BookingScreen = ({ route }) => {
  const { activity } = route.params;
  const navigation = useNavigation();

  const mapIframe = `
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.36066535252!2d76.33385267575912!3d9.477314581808796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0884ea4aec3cd9%3A0xd0b71fa3d92bac86!2sMullathuvallappu-%20Valiyachudukadu%20Rd%2C%20Mullathuvalappu%2C%20Alappuzha%2C%20Kerala!5e0!3m2!1sen!2sin!4v1705447233703!5m2!1sen!2sin"
      width="100%"
      height="300"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `;

  const [selectedDate, setSelectedDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    // You can perform additional actions on date selection
  };


  const decrementPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(numberOfPeople - 1);
    }
  };

  const incrementPeople = () => {
    setNumberOfPeople(numberOfPeople + 1);
  };

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: activity.image }} style={styles.activityImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.activityName}>{activity.name}</Text>
          <Text style={styles.description}>{activity.description}</Text>

          {/* Line above "Hosted by" */}
          <View style={styles.line} />

          {/* Render Provider Name */}
          <Text style={styles.providerName}>{`Hosted by: ${activity.provider_name}`}</Text>

          {/* Line below "Hosted by" */}
          <View style={styles.line} />

          {/* Calendar */}
          <Text style={styles.mapHeading}>Select Date</Text>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' } }}
          />

          {/* Dummy iframe for map */}
          <Text style={styles.mapHeading}>Where You'll Be</Text>
          <View style={styles.mapContainer}>
            <WebView
              source={{ html: mapIframe }}
              style={styles.mapIframe}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          {/* Custom PaperUI Chip for Price */}
          <Chip >{`₹${activity.price}`}</Chip>
        </View>
        <View>
          {/* Paper UI Default Button for "Book Now" */}
          <Button mode="contained" style={styles.bookNowButton}>
            Book Now
          </Button>
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
    paddingBottom:70
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
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  providerName: {
    fontSize: 16,
    color: 'black',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  mapHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black',
  },
  mapContainer: {
    aspectRatio: 1.5,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapIframe: {
    flex: 1,
  },
  bookNowButton: {
    backgroundColor: '#007AFF',
    padding: 1,
    borderRadius: 8,
  },
});

export default BookingScreen;
