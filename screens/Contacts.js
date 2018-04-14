import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import ContactListItem from "../components/ContactListItem";
import { fetchContacts } from "../utils/api";
import colors from "../utils/colors";

export default class Contacts extends React.Component {
  static navigationOptions = ({ navigation }) => (
    {
      title: "Contacts",
      // headerLeft: (
      //   <MaterialIcons
      //     name="menu"
      //     size={24}
      //     style={{ color: colors.black, marginLeft: 10 }}
      //     onPress={() => navigation.navigate("DrawerToggle")}
      //   />
      // )
    }
  );



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
    const { navigation: { navigate } } = this.props;
    const { name, avatar, phone } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate("Profile", { contact: item })}
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
