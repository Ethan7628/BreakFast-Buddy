interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
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

