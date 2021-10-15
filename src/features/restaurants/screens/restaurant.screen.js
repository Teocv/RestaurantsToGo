import React, { useContext} from "react";
import { SafeAreaView, View, Text, StyleSheet, Platform, StatusBar, FlatList } from "react-native";
import { Searchbar, ActivityIndicator, Colors } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";

const isAndroid = Platform.OS === "android";
const AreaView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid && StatusBar.currentHeight ? StatusBar.currentHeight : 0};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const SearchView = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const ListView = styled.View`
  flex: 1;
  padding-top: 50%;
`;

export const RestaurantScreen = () => {
  const { restaurants, isLoading, error} = useContext(RestaurantContext);
  return (
    <>
      <AreaView>
        <SearchView>
          <Searchbar />
        </SearchView>
        {isLoading &&
          <ListView>
            <ActivityIndicator animating={true} color={Colors.red800} size='large'/>
            <Text style={{marginLeft: '30%', fontSize: '20px'}}>Ta cargando woe</Text>
          </ListView>
          
        }
        <FlatList
          data={restaurants.results}
          renderItem={({item})=>{
            return <RestaurantInfoCard restaurant={item}/>
          }}
          keyExtractor={item => item.id}
          contentContainerStyle= {{padding: 16, marginTop: 16}}
        />
      </AreaView>
    </>
  );
};