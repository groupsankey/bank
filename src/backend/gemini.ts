async function getDrinkRecommendation(drink) {
    if (typeof drink === 'string') {
        return drink.replace('oldValue', 'newValue');
    } else {
        console.error('Received an invalid drink:', drink);
        return 'Default Drink'; // Handle the error appropriately
    }
} 