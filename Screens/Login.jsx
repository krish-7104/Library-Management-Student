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
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_LINK} from '../api-link';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
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
        const resp = await axios.post(`${API_LINK}/user/login`, value);
        try {
          await AsyncStorage.setItem('token', resp.data.data.token);
          navigation.navigate('Home');
          setLoading(false);
        } catch (e) {}
      } else {
        setLoading(false);
        Keyboard.dismiss();
        ToastAndroid.show('Enter Email Address!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GCET Library</Text>
      <View style={styles.inputCont}>
        <Text style={styles.labelText}>Email Address</Text>
        <TextInput
          autoCapitalize="none"
          value={value.email}
          onChangeText={text => setValue({...value, email: text})}
          style={styles.input}
        />
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          secureTextEntry
          value={value.password}
          onChangeText={text => setValue({...value, password: text})}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => navigation.navigate('Reset Password')}>
        <Text style={styles.forgetText}>Forget Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCont}
        activeOpacity={0.4}
        onPress={!loading && loginHandler}>
        {!loading ? (
          <Text style={styles.btnText}>Login Now!</Text>
        ) : (
          <ActivityIndicator color={'white'} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCont: {
    width: '85%',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderColor: '#9ca3af',
    borderWidth: 1.4,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    fontWeight: '600',
    fontFamily: 'Poppins-Regulars',
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
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 14,
    shadowColor: '#7c3aed',
  },
  btnText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  alreadyText: {
    marginTop: 20,
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
