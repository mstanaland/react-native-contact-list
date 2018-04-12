import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import ContactListItem from "../components/ContactListItem";
import { fetchContacts } from "../utils/api";

export default class Contacts extends React.Component {
  state = {
    contacts: [],
    loading: true,
    error: false
  };

  async componentDidMount() {
    try {
      const contacts = await fetchContacts();

      this.setState({
        contacts,
        loading: false,
        error: false
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  renderContact = ({ item }) => {
    const { name, avatar, phone } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => {}}
      />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;
    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>An error occured</Text>}

        {!loading &&
          !error && (
            <FlatList
              data={contactsSorted}
              keyExtractor={({ phone }) => phone}
              renderItem={this.renderContact}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  }
});