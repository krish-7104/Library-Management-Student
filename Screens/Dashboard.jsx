import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {API_LINK} from '../api-link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accent} from '../colors';
import Book from 'react-native-vector-icons/Feather';
const Dashboard = ({navigation}) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    eno: '',
    uid: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      title: 'Home',
      headerStyle: {backgroundColor: accent},
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 20,
              marginTop: 6,
              marginLeft: -8,
              color: '#fff',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Library Student App
          </Text>
        );
      },
    });
  }, [navigation]);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const resp = await axios.get(`${API_LINK}/user`, {
        headers: {Authorization: `Bearer ${value}`},
      });
      setUserData(resp.data.data);
    } catch (error) {
      await AsyncStorage.clear();
      navigation.navigate('Login');
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const dateFormatter = date => {
    const tempDate = new Date(date);
    const newDate = `${tempDate.getDate()}/${
      tempDate.getMonth() + 1
    }/${tempDate.getFullYear()}`;
    return newDate;
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView style={{width: '94%'}}>
        <Text
          style={{
            color: 'black',
            paddingVertical: 14,
            paddingHorizontal: 20,
            fontWeight: 600,
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
          }}>
          Welcome {userData.name} 👋
        </Text>
        <View
          style={{
            width: 'full',
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 4,
            marginHorizontal: 6,
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 600,
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              textAlign: 'center',
              marginBottom: 4,
            }}>
            Your Book Slots ({userData.bookSlot} Remaining)
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: 10,
            }}>
            {userData &&
              userData.bookSlot &&
              Array(5 - userData.bookSlot)
                .fill(0)
                .map((_, index) => {
                  return (
                    <Book
                      key={index + 'book'}
                      name="book"
                      style={{fontSize: 28, color: accent}}
                    />
                  );
                })}
            {userData &&
              userData.bookSlot &&
              Array(userData.bookSlot)
                .fill(0)
                .map((_, index) => {
                  return (
                    <Book
                      key={index + 'book'}
                      name="book"
                      style={{fontSize: 28}}
                    />
                  );
                })}
          </View>
        </View>
        <View
          style={{
            width: 'full',
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 4,
            marginHorizontal: 6,
            marginTop: 20,
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 600,
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
              textAlign: 'center',
              paddingVertical: 6,
            }}>
            Fine To Pay: {userData ? userData.fine : 0}
          </Text>
        </View>
        <View
          style={{
            width: 'full',
            borderRadius: 10,
            marginHorizontal: 6,
            marginTop: 20,
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 600,
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'center',
              marginBottom: 14,
              color: accent,
            }}>
            Your Previously Issued Books
          </Text>
          {userData &&
            userData.issuedHistory &&
            userData.issuedHistory.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.cardContainer}
                  activeOpacity={0.9}>
                  <Image
                    source={{uri: item.book.image}}
                    style={styles.bookImage}
                  />
                  <View style={styles.cardDetails}>
                    <Text style={styles.bookTitle}>{item.book.name}</Text>
                    <Text style={styles.authorText}>
                      Author: {item.book.author}
                    </Text>
                    <Text style={styles.authorText}>Issued On:</Text>
                    <Text style={styles.authorText}>
                      {dateFormatter(item.book.createdAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 14,
    borderRadius: 5,
    overflow: 'hidden',
  },
  bookImage: {
    width: 130,
    height: 200,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  bookTitle: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
    color: '#000',
  },
  authorText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  stockText: {
    fontSize: 16,
    color: '#555',
  },
});
