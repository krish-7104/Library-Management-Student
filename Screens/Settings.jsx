import {
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

const Settings = ({navigation}) => {
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
    <SafeAreaView style={styles.container}>
      {userData && (
        <View
          style={{
            width: '95%',
            backgroundColor: 'white',
            borderRadius: 6,
            elevation: 2,
            paddingHorizontal: 10,
            paddingVertical: 12,
          }}>
          <Text style={{fontFamily: 'Poppins-Medium', color: accent}}>
            Name:
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              marginBottom: 8,
              fontSize: 18,
            }}>
            {userData.name}
          </Text>
          <Text style={{fontFamily: 'Poppins-Medium', color: accent}}>
            Enrollment No:
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              marginBottom: 8,
              fontSize: 18,
            }}>
            {userData.enrollmentno}
          </Text>
          <Text style={{fontFamily: 'Poppins-Medium', color: accent}}>
            Phone No:
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              marginBottom: 8,
              fontSize: 18,
            }}>
            {userData.phonenumber}
          </Text>
          <Text style={{fontFamily: 'Poppins-Medium', color: accent}}>
            Email:
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              marginBottom: 8,
              fontSize: 18,
            }}>
            {userData.email}
          </Text>
          <Text style={{fontFamily: 'Poppins-Medium', color: accent}}>
            Gender:
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              marginBottom: 8,
              fontSize: 18,
            }}>
            {userData.gender}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.btnCont}
        activeOpacity={0.4}
        onPress={logoutHandler}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnCont: {
    borderColor: '#7c3aed',
    width: '85%',
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
  },
  btnText: {
    textAlign: 'center',
    color: '#7c3aed',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
});
