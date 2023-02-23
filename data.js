import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
export const menuArray = [
    {
        name: "The Classic",
        ingredients: ["mozarella", "oregano", "olive oil"],
        uuid: uuidv4(),
        price: 12,
        quantity: 0,
    },
    {
        name: "The Godfather",
        ingredients: ["mozarella", "pepperoni", "bacon", "mushrooms", "capsicum" ],
        uuid: uuidv4(),
        price: 16,
        quantity: 0,
    },
    {
        name: "The Meat-Lover",
        ingredients: ["mozarella", "pepperoni", "italian sausage", "prosciutto", "chicken breast", "mushrooms"],
        uuid: uuidv4(),
        price: 18,
        quantity: 0,
    },
    {
        name: "The Vegetarian",
        ingredients: ["mozarella", "mushrooms", "capsicum", "artichoke", "rocket", "spinach"],
        uuid: uuidv4(),
        price: 16,
        quantity: 0,
    },
]