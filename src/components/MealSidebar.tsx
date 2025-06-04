// src/components/MealSidebar.tsx
import { useState, useEffect } from 'react';
import { fetchMealsByCategory } from '../Services/mealServices';
import { type Meal } from '../types';


interface MealSidebarProps {
    onSelectMeal: (meal: Meal) => void;
}

type MealCategory = 'Breakfast' | 'Lunch';

export const MealSidebar = ({ onSelectMeal }: MealSidebarProps) => {
    const [activeCategory, setActiveCategory] = useState<MealCategory>('Breakfast');
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadMeals = async () => {
            setLoading(true);
            // The MealDB uses these category names
            const category = activeCategory === 'Breakfast' ? 'Breakfast' : 'Lunch';
            const categoryMeals = await fetchMealsByCategory(category);
            setMeals(categoryMeals);
            setLoading(false);
        };

        loadMeals();
    }, [activeCategory]);

    return (
        <div className="meal-sidebar">
            <div className="category-tabs">
                <button
                    className={activeCategory === 'Breakfast' ? 'active' : ''}
                    onClick={() => setActiveCategory('Breakfast')}
                >
                    Breakfast
                </button>
                <button
                    className={activeCategory === 'Lunch' ? 'active' : ''}
                    onClick={() => setActiveCategory('Lunch')}
                >
                    Lunch
                </button>
            </div>

            <div className="meal-list">
                {loading ? (
                    <div className="loading">Loading meals...</div>
                ) : meals.length > 0 ? (
                    meals.map((meal) => (
                        <div
                            key={meal.idMeal}
                            className="meal-item"
                            onClick={() => onSelectMeal(meal)}
                        >
                            <img src={meal.strMealThumb} alt={meal.strMeal} />
                            <span>{meal.strMeal}</span>
                        </div>
                    ))
                ) : (
                    <div className="no-meals">No meals found</div>
                )}
            </div>
        </div>
    );
};