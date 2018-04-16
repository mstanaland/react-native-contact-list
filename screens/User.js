import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import ContactThumbnail from "../components/ContactThumbnail";

import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";
import store from "../store";

export default class User extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Me",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.blue
      },
      headerRight: (
        <MaterialIcons
          name="settings"
          size={24}
          style={{ color: "white", marginRight: 10 }}
          onPress={() => navigation.navigate("Options")}
        />
      )
    };
  }

  state = {
    user: store.getState().user,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() => (
      this.setState({
        user: store.getState().user,
        loading: store.getState().loading,
        error: store.getState().error
      })
    ));

    const user = await fetchUserContact();

    store.setState({
      user,
      isFetchingUser: false}
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { loading, user, error } = this.state;
    const { avatar, name, phone } = user;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>An error occured</Text>}
        {!loading && !error && (
          <ContactThumbnail avatar={avatar} name={name} phone={phone} />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue
  }
});
