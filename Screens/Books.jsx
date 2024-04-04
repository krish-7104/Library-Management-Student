import React, {useEffect, useState} from 'react';
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
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {API_LINK} from '../api-link';
import NavTitle from './Components/NavTitle';
import {accent} from '../colors';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: accent, flex: 1}}>
      <NavTitle title={'Search Books'} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={{
            backgroundColor: '#f6f6f6',
            paddingHorizontal: 20,
            width: '100%',
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            paddingVertical: 8,
          }}>
          <View style={styles.searchContainer}>
            <TextInput
              value={search}
              onChangeText={text => setSearch(text)}
              placeholder="Search Book Name.."
              placeholderTextColor={'#00000080'}
              style={styles.input}
              selectionColor={accent}
            />
          </View>
          {loading ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size={28}
              color={styles.loadingIndicator.color}
            />
          ) : (
            <View style={styles.booksContainer}>
              {books.map((book, index) => (
                <View key={index} style={styles.cardContainer}>
                  <Image
                    source={{uri: book.image}}
                    style={styles.bookImage}
                    width={120}
                    height={180}
                  />
                  <View style={styles.cardDetails}>
                    <Text style={styles.bookTitle} numberOfLines={2}>
                      {book.name}
                    </Text>
                    <Text style={styles.authorText}>Author: {book.author}</Text>
                    <Text style={styles.stockText}>Stock: {book.stock}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {!loading && books && books.length === 0 && (
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: 'black',
                fontSize: 16,
              }}>
              No Books Found!
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: 'white',
    marginTop: 12,
    marginBottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
  },
  input: {
    color: 'black',
    width: '100%',
    fontFamily: 'Poppins-Regular',
    borderRadius: 100,
    borderWidth: 2,
    paddingHorizontal: 12,
    borderColor: accent,
  },
  loadingIndicator: {
    marginTop: 20,
    color: accent,
  },
  booksContainer: {
    width: '100%',
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
