import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_LINK} from '../api-link';
import axios from 'axios';
import {accent} from '../colors';
import NavTitle from './Components/NavTitle';

const MyProfile = ({navigation}) => {
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
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logoutHandler = async () => {
    try {
      AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {}
  };
  return (
    <>
      <NavTitle title={'My Profile'} />
      <SafeAreaView style={styles.container}>
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size={28}
            color={accent}
          />
        )}
        {!loading && userData && (
          <View style={styles.userDataContainer}>
            <Text style={styles.userInfoLabel}>Name:</Text>
            <Text style={styles.userInfo}>{userData.name}</Text>
            <Text style={styles.userInfoLabel}>Enrollment No:</Text>
            <Text style={styles.userInfo}>{userData.enrollmentno}</Text>
            <Text style={styles.userInfoLabel}>Phone No:</Text>
            <Text style={styles.userInfo}>{userData.phonenumber}</Text>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfo}>{userData.email}</Text>
            <Text style={styles.userInfoLabel}>Gender:</Text>
            <Text style={styles.userInfo}>{userData.gender}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.4}
          onPress={logoutHandler}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  userDataContainer: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  userInfoLabel: {
    fontFamily: 'Poppins-Medium',
    color: accent,
  },
  userInfo: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
    fontSize: 18,
  },
  logoutButton: {
    borderColor: accent,
    width: '85%',
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
  },
  logoutButtonText: {
    textAlign: 'center',
    color: accent,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
});
