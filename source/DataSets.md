# DataSets

aktuelle können folgende JSON-Endpunkte verwendet werden

- **JSON-Url/JSON-Api** 
- **GraphQl**
- **Google Sheet**


## JSON-Url/JSON-Api

### Request Parameters

- **Url** (required): URL zu Ihrer Datenquelle
```
https://dummyjson.com/recipes
```

- **Request-Header** (optional): Hier können Sie zusätzlichen Informationen definieren.
```json
{"content-type": "application/json"}
```

## GraphQl

### Request Parameters
- **Url** (required): URL zu Ihrer Datenquelle
- **Query** (required): Query Definition
```graphql
query (
  $id: ID!
) {
  photo(id: $id) {
    album {
      id
      title
      user { id }
    }
  }
}
```
- **Variables** (optional): Query Variables
```json
{"id": 5}
```
- **Request-Header** (optional): Hier können Sie zusätzlichen Informationen definieren.
```json
{"content-type": "application/json"}
```
## Google Sheet

- **SpreadSheet ID** (required): URL zu Ihrer Datenquelle
- **Sheet Title** (required): Query Definition
- **Google API-Key** (required): Query Variables

# JSON Data

Alle Daten Endpunkte müssen ein JSON-Object liefern!

## Beispiel ROOT is Object - (https://dummyjson.com/recipes)
```json
{  "recipes": [{
      "id": 1,
      "name": "Classic Margherita Pizza",
      "ingredients": [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella cheese",
        "Fresh basil leaves",
        "Olive oil",
        "Salt and pepper to taste"
      ],
      "instructions": [
        "Preheat the oven to 475°F (245°C).",
        "Roll out the pizza dough and spread tomato sauce evenly.",
        "Top with slices of fresh mozzarella and fresh basil leaves.",
        "Drizzle with olive oil and season with salt and pepper.",
        "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
        "Slice and serve hot."
      ],
      "prepTimeMinutes": 20,
      "cookTimeMinutes": 15,
      "servings": 4,
      "difficulty": "Easy",
      "cuisine": "Italian",
      "caloriesPerServing": 300,
      "tags": [
        "Pizza",
        "Italian"
      ],
      "userId": 166,
      "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
      "rating": 4.6,
      "reviewCount": 98,
      "mealType": [
        "Dinner"
      ]
    },
  ],
    "total": 50,
  "skip": 0,
  "limit": 30
}
```
Intern verwendete Schemata
```json
{
  "recipes": [{
      "id": "number",
      "name": "string",
      "ingredients": [
        "string"
      ],
      "instructions": [
        "string"
      ],
      "prepTimeMinutes": "number",
      "cookTimeMinutes": "number",
      "servings": "number",
      "difficulty": "string",
      "cuisine": "string",
      "caloriesPerServing": "number",
      "tags": [
        "string"
      ],
      "userId": "number",
      "image": "string",
      "rating": "number",
      "reviewCount": "number",
      "mealType": [
        "string"
      ]
    }],
  "total": "number",
  "skip": "number",
  "limit": "number"
}
```


## Beispiel ROOT is Array - (https://jsonplaceholder.typicode.com/todos/)
Um eine Kompatibilität zu erreichen wird hier ein internes "_root" Object hinzugefügt.

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  }
]
```
Intern verwendete Schemata
```json
{
  "_root": [{
      "userId": "number",
      "id": "number",
      "title": "string",
      "completed": "boolean"
    }]
}```