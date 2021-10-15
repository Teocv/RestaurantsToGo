import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import star from "../../../../assets/star";
import open from "../../../../assets/open";

const RestaurantCardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const RestaurantCard = styled(Card)`
  padding: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.primary};
`;

const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const Open = styled.View`
  
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Closed = styled.Text`
  color: red;
  align-self: flex-end;
`;

const Available = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Rating = styled.View`
  display: flex;
  flex-direction: row;
  
`;

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Nice restaurant",
    icon,
    photos = ["https://cdn.pixabay.com/photo/2015/10/12/15/11/cafe-984275_960_720.jpg"],
    address = "Some random street",
    isOpenNow = false,
    rating = 5,
    isClosedTemporarily = true,
  } = restaurant;
  const ratingArray = Array.from(new Array(Math.ceil(rating)));

  return (
    <RestaurantCard>
      <RestaurantCardCover elevation={5} source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>

        <Row>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} key={Math.floor(100*Math.random())} />
            ))}
          </Rating>
          
          <Available>
            {isClosedTemporarily &&
              <Closed>
                CLOSED TEMPORARILY
              </Closed>
            }
            {isOpenNow &&
              <Open>
                <SvgXml xml={open} width={20} height={20} key={Math.floor(100*Math.random())} />
              </Open>
            }
          </Available>
        </Row>

        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};