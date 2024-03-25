import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_LINK} from '../api-link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accent} from '../colors';
import Book from 'react-native-vector-icons/Feather';
import NavTitle from './Components/NavTitle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dashboard = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('token');
      const resp = await axios.get(`${API_LINK}/user`, {
        headers: {Authorization: `Bearer ${value}`},
      });
      setUserData(resp.data.data);
      setLoading(false);
    } catch (error) {
      await AsyncStorage.clear();
      navigation.navigate('Login');
      console.log(JSON.stringify(error));
      setLoading(false);
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
    <>
      <NavTitle title={'Student Dashboard'} />
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {loading && (
          <View>
            <ActivityIndicator size={34} color={accent} />
          </View>
        )}
        {!loading && (
          <ScrollView
            style={{width: '94%'}}
            showsVerticalScrollIndicator={false}>
            <Text
              style={{
                color: 'black',
                paddingTop: 22,
                paddingBottom: 14,
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
                elevation: 2,
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
                          style={{fontSize: 28, color: '#00000050'}}
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
                elevation: 2,
                marginHorizontal: 6,
                marginTop: 20,
                paddingVertical: 12,
                paddingHorizontal: 20,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Ionicons name="cash-outline" color={accent} size={30} />
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: 18,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                    marginLeft: 10,
                  }}>
                  Fine To Pay:
                </Text>
              </View>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'center',
                }}>
                ₹{userData ? userData.fine : 0}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                marginTop: 20,
                paddingVertical: 12,
                paddingHorizontal: 10,
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
                Your Active Issued Books
              </Text>
              {userData &&
                userData.issuedHistory &&
                userData.issuedHistory.map((item, index) => {
                  if (!item.returned) {
                    return (
                      <View key={index} style={styles.cardContainer}>
                        <Image
                          source={{uri: item.book.image}}
                          style={styles.bookImage}
                          width={130}
                          height={200}
                        />
                        <View style={styles.cardDetails}>
                          <Text style={styles.bookTitle} numberOfLines={2}>
                            {item.book.name}
                          </Text>

                          <Text style={styles.authorText}>Issued On:</Text>
                          <Text style={styles.authorText}>
                            {dateFormatter(item.createdAt)}
                          </Text>
                          <Text style={styles.authorText}>Return Date:</Text>
                          <Text style={styles.authorText}>
                            {dateFormatter(item.returnDate)}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
            </View>
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 10,
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
                  if (item.returned)
                    return (
                      <View key={index} style={styles.cardContainer}>
                        <Image
                          source={{uri: item.book.image}}
                          style={styles.bookImage}
                          width={130}
                          height={200}
                        />
                        <View style={styles.cardDetails}>
                          <Text style={styles.bookTitle} numberOfLines={2}>
                            {item.book.name}
                          </Text>
                          <Text style={styles.authorText}>Issued On:</Text>
                          <Text style={styles.authorText}>
                            {dateFormatter(item.createdAt)}
                          </Text>
                          <Text style={styles.authorText}>Returned On:</Text>
                          <Text style={styles.authorText}>
                            {dateFormatter(item.updatedAt)}
                          </Text>
                        </View>
                      </View>
                    );
                })}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {
    width: 130,
    height: 200,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
    padding: 10,
    fontFamily: 'Poppins-Regular',
  },
  bookTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  authorText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  stockText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
});
