interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strInstructions?: string;
    strIngredients?: string[];
}

export const fetchRandomMeal = async (): Promise<Meal> => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
            throw new Error('No meals found');
        }

        return data.meals[0];
    } catch (error) {
        console.error('Error fetching random meal:', error);
        throw error;
    }
};

export const searchMeals = async (query: string): Promise<Meal[]> => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Error searching meals:', error);
        return [];
    }
};

export const fetchMealsByCategory = async (category: string): Promise<Meal[]> => {
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error(`Error fetching ${category} meals:`, error);
        return [];
    }
};

export const fetchMealDetails = async (id: string): Promise<Meal> => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
            throw new Error('Meal not found');
        }

        const meal = data.meals[0];
        // Extract ingredients (up to 20 ingredients)
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(ingredient);
            }
        }

        return {
            ...meal,
            strIngredients: ingredients
        };
    } catch (error) {
        console.error('Error fetching meal details:', error);
        throw error;
    }
};