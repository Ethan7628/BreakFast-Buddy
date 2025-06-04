interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
}

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