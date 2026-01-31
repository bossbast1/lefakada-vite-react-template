// src/react-app/data/greekFoods.ts

export interface GreekFood {
	name: string;
	img: string;
	ingredients: string[];
	process: string;
}

const greekFoods: GreekFood[] = [
	{
		name: "Moussaka",
		img: "moussaka.jpg",
		ingredients: [
			"2 eggplants",
			"2 potatoes",
			"500g minced beef or lamb",
			"1 onion",
			"2 cloves garlic",
			"400g canned tomatoes",
			"Olive oil, salt, pepper, cinnamon, nutmeg",
			"Béchamel sauce (milk, flour, butter, nutmeg, egg yolk)"
		],
		process:
			"Slice eggplants and potatoes, fry or bake until soft. Sauté onion and garlic, add minced meat, cook until browned. Add tomatoes and spices, simmer. Layer potatoes, eggplants, meat sauce in a baking dish, top with béchamel. Bake at 180°C for 45 minutes until golden."
	},
	{
		name: "Souvlaki",
		img: "souvlaki.jpg",
		ingredients: [
			"500g pork or chicken, cut in cubes",
			"Olive oil, lemon juice, oregano, salt, pepper",
			"Pita bread, tomatoes, onions, tzatziki"
		],
		process:
			"Marinate meat in olive oil, lemon, oregano, salt, pepper for 2+ hours. Skewer and grill until cooked. Serve in pita with tomatoes, onions, and tzatziki."
	},
	{
		name: "Greek Salad (Horiatiki)",
		img: "greek-salad.jpg",
		ingredients: [
			"Tomatoes",
			"Cucumbers",
			"Red onion",
			"Kalamata olives",
			"Feta cheese",
			"Oregano, olive oil, salt"
		],
		process:
			"Chop vegetables, combine in a bowl. Add olives and feta on top. Sprinkle with oregano, salt, and drizzle with olive oil. Serve fresh."
	},
	{
		name: "Spanakopita",
		img: "spanakopita.jpg",
		ingredients: [
			"500g spinach",
			"200g feta cheese",
			"1 onion",
			"2 eggs",
			"Dill, parsley, olive oil, salt, pepper",
			"Phyllo dough"
		],
		process:
			"Sauté onion, add spinach, cook until wilted. Mix with crumbled feta, eggs, herbs, salt, pepper. Layer phyllo in a pan, add filling, cover with more phyllo. Brush with olive oil. Bake at 180°C for 40 minutes until golden."
	},
	{
		name: "Baklava",
		img: "baklava.jpg",
		ingredients: [
			"400g phyllo dough",
			"250g walnuts or pistachios",
			"150g butter",
			"200g sugar",
			"200ml water",
			"100g honey",
			"Cinnamon, lemon juice"
		],
		process:
			"Layer phyllo and melted butter in a pan, sprinkle with chopped nuts and cinnamon. Repeat layers. Cut into diamonds. Bake at 180°C for 40 min. Boil sugar, water, honey, lemon for syrup, pour over hot baklava."
	}
];

export default greekFoods;
