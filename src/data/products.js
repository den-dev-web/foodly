import { lang } from "../scripts/i18n.js";

const IMAGES_URL = `${import.meta.env.BASE_URL}assets/images/`;

// Texts are { en, uk }; the export holds the current page language only
const PRODUCTS = [
  {
    id: "pizza_vegan",
    category: "pizza",
    name: {
      en: "Vegan Pizza",
      uk: "Піца Веганська",
    },
    description: {
      en: "A light pizza with a refined vegetable flavour! Tomato sauce, tomatoes, mushrooms, pickled onion, sweetcorn, bell pepper, broccoli, courgette.",
      uk: "Дієтична піца з вишуканим овочевим смаком! Соус на томатній основі, помідори, печериці, маринована цибуля, кукурудза, болгарський перець, броколі, кабачок.",
    },
    price: 230,
    variants: [
      { id: "30", label: { en: "30 cm", uk: "30 см" }, price: 230 },
      { id: "40", label: { en: "40 cm", uk: "40 см" }, price: 330 },
    ],
    image: `${IMAGES_URL}vegan_pizza.jpg`,
    images: {
      avif: `${IMAGES_URL}vegan_pizza.avif`,
      webp: `${IMAGES_URL}vegan_pizza.webp`,
      jpg: `${IMAGES_URL}vegan_pizza.jpg`,
    },
  },
  {
    id: "pizza_americana",
    category: "pizza",
    name: {
      en: "Americana Pizza",
      uk: "Піца Американа",
    },
    description: {
      en: "Cream-based pizza with grilled chicken, a cheese blend, bacon, pickles and pickled onion, finished with Cheddar sauce and spring onion.",
      uk: "Піца на вершковій основі з куркою гриль, міксом сирів, беконом, солоними огірками, маринованою цибулею, прикрашена соусом Чеддер і зеленою цибулею.",
    },
    price: 315,
    variants: [
      { id: "30", label: { en: "30 cm", uk: "30 см" }, price: 315 },
      { id: "40", label: { en: "40 cm", uk: "40 см" }, price: 415 },
    ],
    image: `${IMAGES_URL}pizza_americana.jpg`,
    images: {
      avif: `${IMAGES_URL}pizza_americana.avif`,
      webp: `${IMAGES_URL}pizza_americana.webp`,
      jpg: `${IMAGES_URL}pizza_americana.jpg`,
    },
  },
  {
    id: "pizza_village",
    category: "pizza",
    name: {
      en: "Rustic Pizza",
      uk: "Піца Сільська",
    },
    description: {
      en: "An original pizza on garlic sauce with bacon, ham, mushrooms and tomatoes. Topped with spring onion.",
      uk: "Оригінальна піца на часниковому соусі з беконом, шинкою, печерицями та помідорами. Прикрашена зеленою цибулею.",
    },
    price: 315,
    variants: [
      { id: "30", label: { en: "30 cm", uk: "30 см" }, price: 315 },
      { id: "40", label: { en: "40 cm", uk: "40 см" }, price: 415 },
    ],
    image: `${IMAGES_URL}village_pizza.jpg`,
    images: {
      avif: `${IMAGES_URL}village_pizza.avif`,
      webp: `${IMAGES_URL}village_pizza.webp`,
      jpg: `${IMAGES_URL}village_pizza.jpg`,
    },
  },
  {
    id: "pizza_mexicano",
    category: "pizza",
    name: {
      en: "Mexicana Pizza",
      uk: "Піца Мексиканська",
    },
    description: {
      en: "Pizza on spicy sauce with chicken fillet, hunter’s sausages, a cheese blend, red onion, sweetcorn and bell pepper. Topped with tomatoes, chilli and parsley.",
      uk: "Піца на гострому соусі з курячим філе, мисливськими ковбасками, міксом сирів, цибулею марс, кукурудзою, болгарським перцем. Прикрашена томатами, перцем чилі та петрушкою.",
    },
    price: 335,
    variants: [
      { id: "30", label: { en: "30 cm", uk: "30 см" }, price: 335 },
      { id: "40", label: { en: "40 cm", uk: "40 см" }, price: 435 },
    ],
    image: `${IMAGES_URL}mexicano_pizza.jpg`,
    images: {
      avif: `${IMAGES_URL}mexicano_pizza.avif`,
      webp: `${IMAGES_URL}mexicano_pizza.webp`,
      jpg: `${IMAGES_URL}mexicano_pizza.jpg`,
    },
  },
  {
    id: "pizza_new_york",
    category: "pizza",
    name: {
      en: "New York Pizza",
      uk: "Піца Нью-Йорк",
    },
    description: {
      en: "Pizza sauce, cheese, hunter’s sausages, French fries.",
      uk: "Піцовий соус, сир, мисливські ковбаски, картопля фрі.",
    },
    price: 335,
    variants: [
      { id: "30", label: { en: "30 cm", uk: "30 см" }, price: 335 },
      { id: "40", label: { en: "40 cm", uk: "40 см" }, price: 435 },
    ],
    image: `${IMAGES_URL}new_york_pizza.jpg`,
    images: {
      avif: `${IMAGES_URL}new_york_pizza.avif`,
      webp: `${IMAGES_URL}new_york_pizza.webp`,
      jpg: `${IMAGES_URL}new_york_pizza.jpg`,
    },
  },
  {
    id: "pizza_meat",
    category: "pizza",
    name: {
      en: "Meat Pizza",
      uk: "Піца М’ясна",
    },
    description: {
      en: "Pizza on cream sauce with soft cheese, grilled chicken fillet, ham, salami, hunter’s sausages and spicy pickles on half the pizza, parsley.",
      uk: "Піца на вершковому соусі з ніжним сиром, курячим філе гриль, шинкою, салямі, мисливськими ковбасками та пікантними солоними огірками на половині піци, петрушка.",
    },
    price: 335,
    variants: [
      { id: "30", label: { en: "30 cm", uk: "30 см" }, price: 335 },
      { id: "40", label: { en: "40 cm", uk: "40 см" }, price: 435 },
    ],
    image: `${IMAGES_URL}meat_pizza.jpg`,
    images: {
      avif: `${IMAGES_URL}meat_pizza.avif`,
      webp: `${IMAGES_URL}meat_pizza.webp`,
      jpg: `${IMAGES_URL}meat_pizza.jpg`,
    },
  },
  {
    id: "pizza_cossack",
    category: "pizza",
    name: {
      en: "Cossack Pizza",
      uk: "Піца Козацька",
    },
    description: {
      en: "Pizza on garlic sauce with grilled chicken, a cheese blend, bacon, salami, hunter’s sausages, mushrooms and olives.",
      uk: "Піца на часниковому соусі з куркою гриль, міксом сирів, беконом, салямі, мисливськими ковбасками, печерицями та маслинами.",
    },
    price: 335,
    variants: [
      { id: "30", label: { en: "30 cm", uk: "30 см" }, price: 335 },
      { id: "40", label: { en: "40 cm", uk: "40 см" }, price: 435 },
    ],
    image: `${IMAGES_URL}cossack_pizza.jpg`,
    images: {
      avif: `${IMAGES_URL}cossack_pizza.avif`,
      webp: `${IMAGES_URL}cossack_pizza.webp`,
      jpg: `${IMAGES_URL}cossack_pizza.jpg`,
    },
  },
  {
    id: "sushi_philadelphia_classic",
    category: "sushi",
    name: {
      en: "Philadelphia Classic",
      uk: "Філадельфія Класична",
    },
    description: {
      en: "Our best-selling roll: cream cheese and cucumber topped with fresh Norwegian salmon and Japanese mayo.",
      uk: "Серія найпопулярніших ролів: з вершковим сиром, огірком, накритий свіжим норвезьким лососем, задекорований японським майонезом.",
    },
    price: 285,
    variants: [],
    image: `${IMAGES_URL}philadelphia_classic_sushi.jpg`,
    images: {
      avif: `${IMAGES_URL}philadelphia_classic_sushi.avif`,
      webp: `${IMAGES_URL}philadelphia_classic_sushi.webp`,
      jpg: `${IMAGES_URL}philadelphia_classic_sushi.jpg`,
    },
  },
  {
    id: "sushi_philadelphia_smoked_salmon",
    category: "sushi",
    name: {
      en: "Philadelphia Smoked Salmon",
      uk: "Філадельфія Копчений Лосось",
    },
    description: {
      en: "Our best-selling roll: cream cheese, tobiko roe and cucumber topped with smoked Norwegian salmon.",
      uk: "Серія найпопулярніших ролів: з вершковим сиром, ікрою тобіко, огірком, накритий копченим норвезьким лососем.",
    },
    price: 335,
    variants: [],
    image: `${IMAGES_URL}philadelphia_smoked_salmon_sushi.jpg`,
    images: {
      avif: `${IMAGES_URL}philadelphia_smoked_salmon_sushi.avif`,
      webp: `${IMAGES_URL}philadelphia_smoked_salmon_sushi.webp`,
      jpg: `${IMAGES_URL}philadelphia_smoked_salmon_sushi.jpg`,
    },
  },
  {
    id: "sushi_green_dragon",
    category: "sushi",
    name: {
      en: "Green Dragon",
      uk: "Зелений дракон",
    },
    description: {
      en: "Signature roll with eel, tamago, cream cheese, cucumber, avocado and roe, drizzled with unagi sauce and toasted sesame.",
      uk: "Фірмовий рол з вугрем, тамаго, вершковим сиром, огірком, авокадо, ікрою, политий соусом унагі та смаженим кунжутом.",
    },
    price: 445,
    variants: [],
    image: `${IMAGES_URL}green_dragon_sushi.jpg`,
    images: {
      avif: `${IMAGES_URL}green_dragon_sushi.avif`,
      webp: `${IMAGES_URL}green_dragon_sushi.webp`,
      jpg: `${IMAGES_URL}green_dragon_sushi.jpg`,
    },
  },
  {
    id: "sushi_chess",
    category: "sushi",
    name: {
      en: "Chess Roll",
      uk: "Шахи",
    },
    description: {
      en: "Roll with smoked salmon, cream and hard cheeses, mozzarella, cucumber, red and black caviar.",
      uk: "Рол з копченим лососем, вершковим і твердим сирами, моцарелою, огірком, червоною та чорною ікрою.",
    },
    price: 295,
    variants: [],
    image: `${IMAGES_URL}chess_sushi.jpg`,
    images: {
      avif: `${IMAGES_URL}chess_sushi.avif`,
      webp: `${IMAGES_URL}chess_sushi.webp`,
      jpg: `${IMAGES_URL}chess_sushi.jpg`,
    },
  },
  {
    id: "burgers_hamburger",
    category: "burgers",
    name: {
      en: "Hamburger",
      uk: "Гамбургер",
    },
    description: {
      en: "Prime beef patty, pickles, pickled onion, lettuce, rich tomato sauce, sweet mustard and a crispy bun.",
      uk: "Бургер з котлетою з добірної яловичини, мариновані огірки, маринована цибуля, салат, ароматний томатний соус, солодка гірчиця та хрустка булочка.",
    },
    price: 155,
    variants: [],
    image: `${IMAGES_URL}hamburger.jpg`,
    images: {
      avif: `${IMAGES_URL}hamburger.avif`,
      webp: `${IMAGES_URL}hamburger.webp`,
      jpg: `${IMAGES_URL}hamburger.jpg`,
    },
  },
  {
    id: "burgers_kinder_burger",
    category: "burgers",
    name: {
      en: "Kinder Burger",
      uk: "Кіндер Бургер",
    },
    description: {
      en: "Every kid’s favourite! Prime beef patty, a slice of mild cheese, pickles, rich tomato sauce and a crispy bun.",
      uk: "Улюблений бургер усіх дітей! Бургер з котлетою з добірної яловичини, скибочкою ніжного сиру, мариновані огірки, ароматний томатний соус і хрустка булочка.",
    },
    price: 145,
    variants: [],
    image: `${IMAGES_URL}kinder_burger.jpg`,
    images: {
      avif: `${IMAGES_URL}kinder_burger.avif`,
      webp: `${IMAGES_URL}kinder_burger.webp`,
      jpg: `${IMAGES_URL}kinder_burger.jpg`,
    },
  },
  {
    id: "burgers_cheeseburger",
    category: "burgers",
    name: {
      en: "Cheeseburger",
      uk: "Чизбургер",
    },
    description: {
      en: "Prime beef patty, a slice of mild cheese, pickle, pickled onion, lettuce, rich tomato sauce, sweet mustard and a crispy bun.",
      uk: "Бургер з котлетою з добірної яловичини, скибочкою ніжного сиру, маринованим огірком, маринованою цибулею, салатом, ароматним томатним соусом, солодкою гірчицею та хрусткою булочкою.",
    },
    price: 155,
    variants: [],
    image: `${IMAGES_URL}cheeseburger.jpg`,
    images: {
      avif: `${IMAGES_URL}cheeseburger.avif`,
      webp: `${IMAGES_URL}cheeseburger.webp`,
      jpg: `${IMAGES_URL}cheeseburger.jpg`,
    },
  },
  {
    id: "desserts_coconut-chocolate_cake",
    category: "desserts",
    name: {
      en: "Coconut Chocolate Cake",
      uk: "Кокосово-шоколадний торт",
    },
    description: {
      en: "An amazing mix of coconut and chocolate in one dessert. Served with icing sugar, chocolate topping and a cocktail cherry.",
      uk: "Дивовижне поєднання кокосу та шоколаду в одному десерті. Подається з цукровою пудрою, шоколадним топінгом і десертною вишнею.",
    },
    price: 150,
    variants: [],
    image: `${IMAGES_URL}coconut-chocolate_cake.jpg`,
    images: {
      avif: `${IMAGES_URL}coconut-chocolate_cake.avif`,
      webp: `${IMAGES_URL}coconut-chocolate_cake.webp`,
      jpg: `${IMAGES_URL}coconut-chocolate_cake.jpg`,
    },
  },
  {
    id: "desserts_cheesecake",
    category: "desserts",
    name: {
      en: "Cheesecake",
      uk: "Чизкейк",
    },
    description: {
      en: "The most delicate treat! A snow-white cake with a wonderful light creamy cheese flavour. Tasty, tall, tender and beautiful.",
      uk: "Найніжніші ласощі! Білосніжний торт із чудовим вершково-сирним повітряним смаком! Смачний, високий, ніжний і гарний.",
    },
    price: 165,
    variants: [],
    image: `${IMAGES_URL}cheesecake.jpg`,
    images: {
      avif: `${IMAGES_URL}cheesecake.avif`,
      webp: `${IMAGES_URL}cheesecake.webp`,
      jpg: `${IMAGES_URL}cheesecake.jpg`,
    },
  },
  {
    id: "desserts_",
    category: "desserts",
    name: {
      en: "Chocolate Brownie",
      uk: "Шоколадний Брауні",
    },
    description: {
      en: "A true American classic — a rich chocolate brownie with a scoop of ice cream and deep chocolate flavour! A treat you’ll want again and again…",
      uk: "Справжній американець — чудовий шоколадний брауні з кулькою морозива та насиченим шоколадним смаком! Насолода, яку хочеться відчувати знову і знову…",
    },
    price: 175,
    variants: [],
    image: `${IMAGES_URL}chocolate_brownie.jpg`,
    images: {
      avif: `${IMAGES_URL}chocolate_brownie.avif`,
      webp: `${IMAGES_URL}chocolate_brownie.webp`,
      jpg: `${IMAGES_URL}chocolate_brownie.jpg`,
    },
  },
];

export const products = PRODUCTS.map((product) => ({
  ...product,
  name: product.name[lang],
  description: product.description[lang],
  variants: product.variants.map((variant) => ({ ...variant, label: variant.label[lang] })),
}));
