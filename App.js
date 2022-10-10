import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contact, setContact ] = useState([]);

  const getContacts = async () => {
    console.log('kontaktit nappula')
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        //console.log(data);
        //setContact(data[5]);
        console.log(data[5]);
        setContact(data);
      
      }
    }
  }
  // console.log(contact.phoneNumbers[0].number);

  console.log(contact[5]);

  // return, puhelinnumerot -> tarkista, onko numeroa, muuten palauta 'no nubmer'
  // null- arvolla ei ole metodeja
  // null tai undefined- arvon kautta ei voi viitata mihinkään
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator#syntax

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={contact}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View><Text>{item.name} {item.phoneNumbers ? item.phoneNumbers[0].number : 'no number'}</Text>
          </View>
        )}
      ></FlatList>
      
      <Button
        title='get contacts'
        onPress={getContacts}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 40
  }
});
