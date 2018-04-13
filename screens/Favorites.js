import React from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";

import { fetchContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";
