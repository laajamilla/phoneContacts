import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

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
        //setContact(data[5]);
        //console.log(data[5]);
        //console.log(data[5].phoneNumbers[0].number)
        setContact(data.map(cont => ({
          'name': cont.name,
          'id' : cont.id,
          // miten numerot saa??
          'phoneNumber' : cont.phoneNumbers
        })))
      }
    }
  }
  // console.log(contact.phoneNumbers[0].number);
  // <Text>{contact.name} {contact.phoneNumbers[0].number}</Text>
  console.log(contact);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={contact}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View><Text>{item.name}</Text></View>
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
