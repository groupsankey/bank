async function getRecommendation() {
    const drink = await fetchDrink(); // Example function to fetch drink
    console.log('Fetched drink:', drink);
    return getDrinkRecommendation(drink);
} 