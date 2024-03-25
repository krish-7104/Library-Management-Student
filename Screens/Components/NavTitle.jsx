import React from 'react';
import {View, Text} from 'react-native';
import {accent} from '../../colors';

const NavTitle = ({title}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: accent,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        padding: 14,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: accent,
        position: 'relative',
        zIndex: 10,
      }}>
      <Text
        style={{fontFamily: 'Poppins-SemiBold', color: 'white', fontSize: 20}}>
        {title}
      </Text>
    </View>
  );
};

export default NavTitle;
