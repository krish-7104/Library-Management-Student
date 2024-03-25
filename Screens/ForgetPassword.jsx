import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {API_LINK} from '../api-link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accent} from '../colors';
import * as Animated from 'react-native-animatable';
import Toast from './Components/Toast';

const ForgetPassword = ({navigation}) => {
  const upperCardRef = useRef(null);
  const lowerCardRef = useRef(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    if (upperCardRef.current) {
      upperCardRef.current.slideInDown(1000);
    }
    if (lowerCardRef.current) {
      lowerCardRef.current.slideInUp(1000);
    }
  }, []);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const CheckLoginHandler = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value) {
          navigation.navigate('Home');
        }
      } catch (error) {}
    };

    CheckLoginHandler();
  }, []);

  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const loginHandler = async () => {
    setLoading(true);
    try {
      if (value.email) {
        const resp = await axios.post(
          `${API_LINK}/user/forget-password`,
          value,
        );
        try {
          setError(true);
          setErrorMsg({msg: resp.data.message, type: 'success'});
          setLoading(false);
        } catch (e) {}
      } else {
        setLoading(false);
        Keyboard.dismiss();
        setError(true);
        setErrorMsg({msg: 'Enter Email Address!', type: 'error'});
      }
    } catch (error) {
      setError(true);
      if (error.response) {
        setErrorMsg(error.response.data.message);
        setErrorMsg({msg: error.response.data.message, type: 'error'});
      } else {
        setErrorMsg({msg: 'Something Went Wrong!', type: 'error'});
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Text
        ref={upperCardRef}
        animation="slideInDown"
        duration={1000}
        style={styles.title}>
        Forget Password
      </Animated.Text>
      <Animated.View
        ref={lowerCardRef}
        animation="slideInUp"
        duration={1000}
        style={{
          height: '50%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View style={styles.inputCont}>
          <Text style={styles.labelText}>Email Address</Text>
          <TextInput
            autoCapitalize="none"
            value={value.email}
            onChangeText={text => setValue({...value, email: text})}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.forgetText}>Back to Login?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCont}
          activeOpacity={0.4}
          onPress={!loading && loginHandler}>
          {!loading ? (
            <Text style={styles.btnText}>Send Reset Link!</Text>
          ) : (
            <ActivityIndicator color={'white'} />
          )}
        </TouchableOpacity>
      </Animated.View>
      {error && <Toast msg={errorMsg} setError={setError} />}
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: accent,
  },
  inputCont: {
    width: '85%',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderColor: '#00000020',
    borderWidth: 1.4,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  forgetText: {
    fontSize: 14,
    paddingBottom: 12,
    textAlign: 'right',
    width: '100%',
    color: '#7c3aed',
    fontFamily: 'Poppins-Medium',
  },
  labelText: {
    marginBottom: 4,
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  btnCont: {
    backgroundColor: '#7c3aed',
    width: '85%',
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 14,
    shadowColor: '#7c3aed',
  },
  btnText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  alreadyText: {
    marginTop: 20,
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
