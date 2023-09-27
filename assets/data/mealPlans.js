const mealPlans = {
    Mon: {
      Rice: {
        lunch: 'White Rice',
        dinner: 'Tomato ',
        uri: 'https://img.freepik.com/premium-vector/rice-plate-vector-illustration_622487-1061.jpg',
      },
      Daal: {
        lunch: 'Black Dal',
        dinner: 'Moosor',
        uri: 'https://img.freepik.com/premium-vector/dal-daal-dhal-indian-dried-legumes-soup-from-lentils-beans-peas-bright-yellow-asian-cuisine-dish_499817-1199.jpg',
      },
      Gravy: {
        lunch: 'Aloo Gobi',
        dinner: 'Brinjal',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lWK4Zx6OkFayKH3n309caCd-9x44jBjZIG_oaTKkUNXl9cm_knAjg3d5EIf-OitxQXc&usqp=CAU',
      },
      Chicken: {
        lunch: 'Special',
        dinner: 'Chicken',
        uri: 'https://img.freepik.com/premium-vector/vector-illustration-chicken-curry-masalasouth-indian-style-chicken-curry_527904-1471.jpg',
      },
      Egg: {
        lunch: 'Egg Chilly',
        dinner: 'Special',
        uri: 'https://img.freepik.com/premium-vector/egg-curry-rice-food-vector-illustration_526280-725.jpg?w=2000',
      },
      Paneer: {
        lunch: 'Sai Paneer',
        dinner: 'Special',
        uri: 'https://img.freepik.com/premium-vector/vector-paneer-butter-masala-cheese-cottage-curry_466689-23714.jpg',
      },
    },
    Tue: {
      Rice: {
        lunch: 'Steamed Rice',
        dinner: 'Lemon Rice',
        uri: 'https://img.freepik.com/premium-vector/rice-plate-vector-illustration_622487-1061.jpg',

      },
      Daal: {
        lunch: 'Yellow Dal',
        dinner: 'Spinach Dal',
        uri: 'https://img.freepik.com/premium-vector/dal-daal-dhal-indian-dried-legumes-soup-from-lentils-beans-peas-bright-yellow-asian-cuisine-dish_499817-1199.jpg',

      },
      Gravy: {
        lunch: 'Paneer Tikka',
        dinner: 'Mixed Vegetable Curry',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lWK4Zx6OkFayKH3n309caCd-9x44jBjZIG_oaTKkUNXl9cm_knAjg3d5EIf-OitxQXc&usqp=CAU',

      },
      Chicken: {
        lunch: 'Chicken Biryani',
        dinner: 'Chicken Curry',
        uri: 'https://img.freepik.com/premium-vector/vector-illustration-chicken-curry-masalasouth-indian-style-chicken-curry_527904-1471.jpg',

      },
      Egg: {
        lunch: 'Egg Fried Rice',
        dinner: 'Egg Bhurji',
        uri: 'https://img.freepik.com/premium-vector/egg-curry-rice-food-vector-illustration_526280-725.jpg?w=2000',

      },
      Paneer: {
        lunch: 'Kadai Paneer',
        dinner: 'Paneer Butter Masala',
        uri: 'https://img.freepik.com/premium-vector/vector-paneer-butter-masala-cheese-cottage-curry_466689-23714.jpg',

      },
    },
    Wed: {
      Rice: {
        lunch: 'Jeera Rice',
        dinner: 'Coconut Rice',
        uri: 'https://img.freepik.com/premium-vector/rice-plate-vector-illustration_622487-1061.jpg',

      },
      Daal: {
        lunch: 'Masoor Dal',
        dinner: 'Chana Dal',
        uri: 'https://img.freepik.com/premium-vector/dal-daal-dhal-indian-dried-legumes-soup-from-lentils-beans-peas-bright-yellow-asian-cuisine-dish_499817-1199.jpg',
      },
      Gravy: {
        lunch: 'Mushroom Curry',
        dinner: 'Bhindi Masala',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lWK4Zx6OkFayKH3n309caCd-9x44jBjZIG_oaTKkUNXl9cm_knAjg3d5EIf-OitxQXc&usqp=CAU',

      },
      Chicken: {
        lunch: 'Chicken Tikka',
        dinner: 'Butter Chicken',
        uri: 'https://img.freepik.com/premium-vector/vector-illustration-chicken-curry-masalasouth-indian-style-chicken-curry_527904-1471.jpg',

      },
      Egg: {
        lunch: 'Egg Curry',
        dinner: 'Scrambled Eggs',
        uri: 'https://img.freepik.com/premium-vector/egg-curry-rice-food-vector-illustration_526280-725.jpg?w=2000',

      },
      Paneer: {
        lunch: 'Palak Paneer',
        dinner: 'Mutter Paneer',
        uri: 'https://img.freepik.com/premium-vector/vector-paneer-butter-masala-cheese-cottage-curry_466689-23714.jpg',

      },
    },
    Thu: {
      Rice: {
        lunch: 'White Rice',
        dinner: 'Tomato Rice',
        uri: 'https://img.freepik.com/premium-vector/rice-plate-vector-illustration_622487-1061.jpg',

      },
      Daal: {
        lunch: 'Black Dal',
        dinner: 'Moosor',
        uri: 'https://img.freepik.com/premium-vector/dal-daal-dhal-indian-dried-legumes-soup-from-lentils-beans-peas-bright-yellow-asian-cuisine-dish_499817-1199.jpg',

      },
      Gravy: {
        lunch: 'Aloo Gobi',
        dinner: 'Brinjal',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lWK4Zx6OkFayKH3n309caCd-9x44jBjZIG_oaTKkUNXl9cm_knAjg3d5EIf-OitxQXc&usqp=CAU',

      },
      Chicken: {
        lunch: 'Special',
        dinner: 'Chicken',
        uri: 'https://img.freepik.com/premium-vector/vector-illustration-chicken-curry-masalasouth-indian-style-chicken-curry_527904-1471.jpg',

      },
      Egg: {
        lunch: 'Egg Chilly',
        dinner: 'Special',
        uri: 'https://img.freepik.com/premium-vector/egg-curry-rice-food-vector-illustration_526280-725.jpg?w=2000',

      },
      Paneer: {
        lunch: 'Sai Paneer',
        dinner: 'Special',
        uri: 'https://img.freepik.com/premium-vector/vector-paneer-butter-masala-cheese-cottage-curry_466689-23714.jpg',

      },
    },
    Fri: {
      Rice: {
        lunch: 'Steamed Rice',
        dinner: 'Lemon Rice',
        uri: 'https://img.freepik.com/premium-vector/rice-plate-vector-illustration_622487-1061.jpg',

      },
      Daal: {
        lunch: 'Yellow Dal',
        dinner: 'Spinach Dal',
        uri: 'https://img.freepik.com/premium-vector/dal-daal-dhal-indian-dried-legumes-soup-from-lentils-beans-peas-bright-yellow-asian-cuisine-dish_499817-1199.jpg',

      },
      Gravy: {
        lunch: 'Paneer Tikka',
        dinner: 'Mixed Vegetable Curry',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lWK4Zx6OkFayKH3n309caCd-9x44jBjZIG_oaTKkUNXl9cm_knAjg3d5EIf-OitxQXc&usqp=CAU',

      },
      Chicken: {
        lunch: 'Chicken Biryani',
        dinner: 'Chicken Curry',
        uri: 'https://img.freepik.com/premium-vector/vector-illustration-chicken-curry-masalasouth-indian-style-chicken-curry_527904-1471.jpg',

      },
      Egg: {
        lunch: 'Egg Fried Rice',
        dinner: 'Egg Bhurji',
        uri: 'https://img.freepik.com/premium-vector/egg-curry-rice-food-vector-illustration_526280-725.jpg?w=2000',

      },
      Paneer: {
        lunch: 'Kadai Paneer',
        dinner: 'Paneer Butter Masala',
        uri: 'https://img.freepik.com/premium-vector/vector-paneer-butter-masala-cheese-cottage-curry_466689-23714.jpg',

      },
    },
    Sat: {
      Rice: {
        lunch: 'White Rice',
        dinner: 'Tomato Rice',
        uri: 'https://img.freepik.com/premium-vector/rice-plate-vector-illustration_622487-1061.jpg',

      },
      Daal: {
        lunch: 'Black Dal',
        dinner: 'Moosor',
        uri: 'https://img.freepik.com/premium-vector/dal-daal-dhal-indian-dried-legumes-soup-from-lentils-beans-peas-bright-yellow-asian-cuisine-dish_499817-1199.jpg',

      },
      Gravy: {
        lunch: 'Aloo Gobi',
        dinner: 'Brinjal',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lWK4Zx6OkFayKH3n309caCd-9x44jBjZIG_oaTKkUNXl9cm_knAjg3d5EIf-OitxQXc&usqp=CAU',

      },
      Chicken: {
        lunch: 'Special',
        dinner: 'Chicken',
        uri: 'https://img.freepik.com/premium-vector/vector-illustration-chicken-curry-masalasouth-indian-style-chicken-curry_527904-1471.jpg',

      },
      Egg: {
        lunch: 'Egg Chilly',
        dinner: 'Special',
        uri: 'https://img.freepik.com/premium-vector/egg-curry-rice-food-vector-illustration_526280-725.jpg?w=2000',

      },
      Paneer: {
        lunch: 'Sai Paneer',
        dinner: 'Special',
        uri: 'https://img.freepik.com/premium-vector/vector-paneer-butter-masala-cheese-cottage-curry_466689-23714.jpg',

      },
    },
}

export default mealPlans ;