import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooksHandler();
  }, []);

  const getBooksHandler = async () => {
    try {
      const resp = await fetch('http://127.0.0.1:5000/api/book/get-books');
      const data = await resp.json();
      setBooks(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {books &&
          books.map(book => {
            return;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  bookImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  bookTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default Books;
