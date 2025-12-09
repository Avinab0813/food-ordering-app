// client/src/data.js
export const menuItems = [
  // --- BURGERS ---
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "Burger",
    description: "Juicy beef patty with melted cheddar, lettuce, and tomato.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    name: "BBQ Bacon Smash",
    category: "Burger",
    description: "Smoked bacon, BBQ sauce, onion rings, and pepper jack cheese.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    name: "Mushroom Swiss",
    category: "Burger",
    description: "Sautéed mushrooms with creamy Swiss cheese and mayo.",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    name: "Spicy Crispy Chicken",
    category: "Burger",
    description: "Fried chicken breast with spicy mayo and pickles.",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    name: "The Veggie Delight",
    category: "Burger",
    description: "Black bean patty, avocado, sprouts, and vegan mayo.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 6,
    name: "Double Decker",
    category: "Burger",
    description: "Two beef patties, double cheese, and secret sauce.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=500&q=60"
  },

  // --- PIZZA ---
  {
    id: 7,
    name: "Margherita Pizza",
    category: "Pizza",
    description: "Traditional Italian pizza with fresh basil and mozzarella.",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 8,
    name: "Pepperoni Feast",
    category: "Pizza",
    description: "Loaded with double pepperoni and extra cheese.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 9,
    name: "BBQ Chicken Pizza",
    category: "Pizza",
    description: "Grilled chicken, red onions, cilantro, and BBQ drizzle.",
    price: 15.50,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 10,
    name: "Veggie Supreme",
    category: "Pizza",
    description: "Bell peppers, onions, olives, mushrooms, and spinach.",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 11,
    name: "Hawaiian Delight",
    category: "Pizza",
    description: "Ham, fresh pineapple chunks, and mozzarella.",
    price: 13.50,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 12,
    name: "Truffle Mushroom",
    category: "Pizza",
    description: "White sauce, wild mushrooms, truffle oil, and thyme.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60"
  },

  // --- APPETIZERS ---
  {
    id: 13,
    name: "Spicy Chicken Wings",
    category: "Appetizer",
    description: "Crispy wings tossed in our signature hot sauce.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 14,
    name: "Loaded Nachos",
    category: "Appetizer",
    description: "Tortilla chips, melted cheese, jalapenos, salsa, and guacamole.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 15,
    name: "Mozzarella Sticks",
    category: "Appetizer",
    description: "Golden fried cheese sticks served with marinara sauce.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 16,
    name: "Garlic Bread",
    category: "Appetizer",
    description: "Toasted baguette with garlic butter and herbs.",
    price: 5.50,
    // FINAL FIXED IMAGE
    image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 17,
    name: "Calamari Rings",
    category: "Appetizer",
    description: "Lightly battered squid rings with tartare sauce.",
    price: 11.50,
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 18,
    name: "Onion Rings",
    category: "Appetizer",
    description: "Thick cut onion rings with BBQ dipping sauce.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=60"
  },

  // --- SALADS ---
  {
    id: 19,
    name: "Caesar Salad",
    category: "Salad",
    description: "Fresh romaine lettuce, croutons, and parmesan cheese.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 20,
    name: "Greek Salad",
    category: "Salad",
    description: "Cucumbers, tomatoes, feta cheese, olives, and olive oil.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 21,
    name: "Cobb Salad",
    category: "Salad",
    description: "Chicken, bacon, egg, avocado, and blue cheese.",
    price: 11.50,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 22,
    name: "Caprese Salad",
    category: "Salad",
    description: "Fresh mozzarella, tomatoes, basil, and balsamic glaze.",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 23,
    name: "Quinoa Power Bowl",
    category: "Salad",
    description: "Quinoa, roasted veggies, chickpeas, and tahini dressing.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 24,
    name: "Asian Sesame Salad",
    category: "Salad",
    description: "Mixed greens, mandarin oranges, almonds, and sesame dressing.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=60"
  },

  // --- DESSERTS ---
  {
    id: 25,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    description: "Warm chocolate cake with a gooey molten center.",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 26,
    name: "New York Cheesecake",
    category: "Dessert",
    description: "Classic creamy cheesecake with strawberry topping.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 27,
    name: "Tiramisu",
    category: "Dessert",
    description: "Italian coffee-flavored dessert with mascarpone.",
    price: 7.50,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 28,
    name: "Apple Pie",
    category: "Dessert",
    description: "Warm apple pie served with vanilla ice cream.",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 29,
    name: "Fudge Brownie",
    category: "Dessert",
    description: "Decadent chocolate brownie with walnuts.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1599785209796-786432b228bc?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 30,
    name: "Banana Split",
    category: "Dessert",
    description: "Three scoops of ice cream, banana, whipped cream, and cherries.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60"
  },

  // --- DRINKS ---
  {
    id: 31,
    name: "Strawberry Smoothie",
    category: "Drink",
    description: "Refreshing blend of strawberries, yogurt, and honey.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 32,
    name: "Iced Caramel Macchiato",
    category: "Drink",
    description: "Espresso, milk, vanilla syrup, and caramel drizzle over ice.",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 33,
    name: "Fresh Lemonade",
    category: "Drink",
    description: "Squeezed lemons, mint, and ice cold water.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 34,
    name: "Mango Lassi",
    category: "Drink",
    description: "Traditional Indian yogurt drink with sweet mango pulp.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 35,
    name: "Green Tea",
    category: "Drink",
    description: "Hot calming green tea with a hint of jasmine.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 36,
    name: "Cola Zero",
    category: "Drink",
    description: "Chilled can of sugar-free cola.",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=60"
  }
];