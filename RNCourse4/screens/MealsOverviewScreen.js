import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";

const getCat = (id) => {
  return CATEGORIES.find((category) => {
    return category.id === id;
  });
};

const MealsOverviewScreen = ({ route, navigation }) => {
  const catId = route.params.categoryId;
  // // update the title
  useLayoutEffect(() => {
    const category = getCat(catId);
    navigation.setOptions({
      title: category.title,
      headerStyle: { backgroundColor: category.color },
    });
  }, [catId, navigation]);
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  const pressHandler = ({ id }) => {
    navigation.navigate("MealsDetail", {
      itemId: id,
    });
  };

  const renderMealItem = (itemData) => {
    const item = itemData.item;
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
      onPress: pressHandler.bind(this, item),
    };
    return <MealItem {...mealItemProps}></MealItem>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
export default MealsOverviewScreen;
