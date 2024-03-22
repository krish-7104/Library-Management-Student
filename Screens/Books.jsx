import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {API_LINK} from '../api-link';

const Books = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      title: 'Home',
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 20,
              marginTop: 6,
              marginLeft: -8,
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Books
          </Text>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    SearchBookHandler();
  }, [search]);

  const SearchBookHandler = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `${API_LINK}/book/get-books?search=${search}`,
      );
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <ActivityIndicator style={{marginTop: 20}} color={'#7c3aed'} />
      )}
      {!loading && (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View
            style={{
              backgroundColor: 'white',
              marginVertical: 12,
              width: '100%',
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 0,
            }}>
            <TextInput
              value={search}
              onChangeText={text => setSearch(text)}
              placeholder="Search Book Name.."
              placeholderTextColor={'#00000080'}
              style={{
                color: 'black',
                width: '90%',
                fontFamily: 'Poppins-Regular',
              }}
            />
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name={'search'} size={24} color={'#7c3aed'} />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%'}}>
            {books.map((book, index) => (
              <View key={index} style={styles.cardContainer}>
                <Image
                  source={{uri: book.image}}
                  style={styles.bookImage}
                  width={130}
                  height={200}
                />
                <View style={styles.cardDetails}>
                  <Text style={styles.bookTitle}>{book.name}</Text>
                  <Text style={styles.authorText}>Author: {book.author}</Text>
                  <Text style={styles.stockText}>Stock: {book.stock}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

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
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  bookImage: {
    width: 140,
    height: 220,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
    padding: 10,
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

export default Books;
