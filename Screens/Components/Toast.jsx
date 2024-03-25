import {Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animated from 'react-native-animatable';

const Toast = ({msg, setError}) => {
  const lowerCardRef = useRef(null);
  useEffect(() => {
    if (lowerCardRef.current) {
      lowerCardRef.current.slideInUp(1000);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (lowerCardRef.current) {
        lowerCardRef.current.fadeOutDown(1000).then(() => setError(false));
      }
    }, 4000);
  }, []);
  return (
    <Animated.View
      ref={lowerCardRef}
      animation="slideInUp"
      duration={1000}
      style={{
        borderRadius: 100,
        padding: 10,
        backgroundColor: msg.type === 'success' ? '#10b981' : '#ef4444',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
      }}>
      <Ionicons
        name="warning-outline"
        style={{fontSize: 22, color: 'white', marginLeft: 5}}
      />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          color: 'white',
          textAlign: 'center',
          fontSize: 14,
          marginHorizontal: 10,
        }}>
        {msg.msg}
      </Text>
    </Animated.View>
  );
};

export default Toast;
