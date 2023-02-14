import { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MealDetail from "../components/MealDetail";
import { MEALS } from "../data/dummy-data";

const getItem = (id) => {
  return MEALS.find((meal) => {
    return meal.id === id;
  });
};
const MealsDetailScreen = ({ route, navigation }) => {
  const itemId = route.params.itemId;
  const item = getItem(itemId);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.title,
    });
  }, [item, navigation]);
  return (
    <View>
      <Image
        source={{ uri: item.imageUrl }}
        style={style.image}
        resizeMode="cover"
      />
      <Text>{item.title}</Text>
      <MealDetail
        complexity={item.complexity}
        affordability={item.affordability}
        duration={item.duration}
      />
      <Text>Ingredients</Text>
      {item.ingredients.map((ingredient) => (
        <Text key={ingredient}>{ingredient}</Text>
      ))}
      <Text>Steps</Text>
      {item.steps.map((step) => (
        <Text key={step}>{step}</Text>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
});
export default MealsDetailScreen;
