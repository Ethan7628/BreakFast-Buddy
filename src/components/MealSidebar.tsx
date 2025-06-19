import { useState, useEffect } from 'react';
import { fetchMealsByCategory } from '../Services/mealServices';
import { type Meal } from '../types';

interface MealSidebarProps {
    onSelectMeal: (meal: Meal) => void;
}

type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner';

export const MealSidebar = ({ onSelectMeal }: MealSidebarProps) => {
    const [activeCategory, setActiveCategory] = useState<MealCategory>('Breakfast');
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMeals = async () => {
            setLoading(true);
            setError(null);

            try {
                let categoryName = '';
                switch (activeCategory) {
                    case 'Breakfast':
                        categoryName = 'Breakfast';
                        break;
                    case 'Lunch':
                        categoryName = 'Seafood';
                        break;
                    case 'Dinner':
                        categoryName = 'Beef';
                        break;
                    default:
                        categoryName = 'Breakfast';
                }

                const categoryMeals = await fetchMealsByCategory(categoryName);
                setMeals(categoryMeals);
            } catch (err) {
                console.error(`Error fetching ${activeCategory} meals:`, err);
                setError(`Failed to load ${activeCategory} meals. Try again later.`);
            } finally {
                setLoading(false);
            }
        };

        loadMeals();
    }, [activeCategory]);

    return (
        <div className="meal-sidebar">
            <div className="category-tabs">
                <button
                    className={activeCategory === 'Breakfast' ? 'active' : ''}
                    onClick={() => setActiveCategory('Breakfast')}
                    aria-label="Show breakfast meals"
                >
                    Breakfast
                </button>
                <button
                    className={activeCategory === 'Lunch' ? 'active' : ''}
                    onClick={() => setActiveCategory('Lunch')}
                    aria-label="Show lunch meals"
                >
                    Lunch
                </button>
                <button
                    className={activeCategory === 'Dinner' ? 'active' : ''}
                    onClick={() => setActiveCategory('Dinner')}
                    aria-label="Show dinner meals"
                >
                    Dinner
                </button>
            </div>

            <div className="meal-list">
                {loading ? (
                    <div className="loading">Loading {activeCategory.toLowerCase()} meals...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : meals.length > 0 ? (
                    meals.map((meal) => (
                        <button
                            key={meal.idMeal}
                            className="meal-item"
                            onClick={() => onSelectMeal(meal)}
                            aria-label={`Select ${meal.strMeal}`}
                        >
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                onError={(e) => {

                                    (e.target as HTMLImageElement).src = '/placeholder-food.jpg';
                                }}
                            />
                            <span>{meal.strMeal}</span>
                        </button>
                    ))
                ) : (
                    <div className="no-meals">
                        {activeCategory === 'Lunch'
                            ? 'Lunch options coming soon!'
                            : 'No meals found'}
                    </div>
                )}
            </div>
        </div>
    );
};