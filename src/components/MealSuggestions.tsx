
import { useState, useEffect } from 'react';
import { fetchRandomMeal, searchMeals } from '../Services/mealServices';

export const MealSuggestions = () => {
    const [meal, setMeal] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        loadRandomMeal();
    }, []);

    const loadRandomMeal = async () => {
        const randomMeal = await fetchRandomMeal();
        setMeal(randomMeal);
    };

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            const results = await searchMeals(searchQuery);
            setSearchResults(results);
        }
    };

    return (
        <div className="meal-suggestions">
            <h2 style={{ justifySelf: "center" }}>Meal Inspiration</h2>

            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for meals..."
                    className='form-control'
                />
                <button onClick={handleSearch} >Search</button>
            </div>

            {searchResults.length > 0 ? (
                <div className="meal-grid">
                    {searchResults.map((result) => (
                        <div key={result.idMeal} className="meal-card">
                            <img src={result.strMealThumb} alt={result.strMeal} />
                            <h3>{result.strMeal}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="random-meal">
                    {meal && (
                        <>
                            <h3>Today's Special</h3>
                            <div className="meal-card">
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                                <h3>{meal.strMeal}</h3>
                                <button onClick={loadRandomMeal}>Show Another</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};