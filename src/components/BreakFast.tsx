import { useState, useEffect } from "react";
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { type Meal } from '../types';
import { fetchMealsByCategory } from '../Services/mealServices';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import '../styles/meals.css';
import '../styles/layout.css';

interface BreakfastFormProps {
    selectedMeal?: Meal;
}

const towerOptions = ["🔮UPTI Block", "🎨Content Corner", "💻Dev's Tower", "🏰Office Keep"];
const drinkOptions = ["☕Coffee", "🧃Juice", "💧Water", "🥛Milk", "☕Tea"];
const localEdibles = ["Cassava", "Bread-Bans", "Boiled Eggs", "Samosa", "Bundanzi", "Yellow Banana"];
const dietaryOptions = ["Gluten-Free", "Dairy-Free", "Nut-Free"];

export const BreakfastForm = ({ }: BreakfastFormProps) => {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState({
        origin: "",
        locals: "",
        drink: "",
        dietaryRestrictions: [] as string[],
        specialNotes: ""
    });
    const [apiMeals, setApiMeals] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const loadMeals = async () => {
            try {
                const meals = await fetchMealsByCategory('Breakfast');
                const mealNames = meals.map((meal) => meal.strMeal);
                setApiMeals(mealNames);
            } catch (error) {
                console.error("Failed to fetch API meals:", error);
                setSubmitError("Failed to load meal options. Showing local options only.");
            } finally {
                setIsLoading(false);
            }
        };
        loadMeals();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setSubmitError("You must be logged in to submit preferences");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");
        setSubmitSuccess(false);

        try {
            await addDoc(collection(db, "preferences"), {
                userId: user.uid,
                userName: user.email || "Anonymous",
                date: new Date().toISOString().split('T')[0],
                tower: formData.origin,
                meal: formData.locals,
                drink: formData.drink,
                dietaryRestrictions: formData.dietaryRestrictions,
                specialNotes: formData.specialNotes,
                createdAt: serverTimestamp()
            });

            setSubmitSuccess(true);
            setFormData({
                origin: "",
                locals: "",
                drink: "",
                dietaryRestrictions: [],
                specialNotes: ""
            });
        } catch (error) {
            console.error("Error submitting preferences:", error);
            setSubmitError("Failed to submit preferences. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDietaryChange = (restriction: string) => {
        setFormData(prev => ({
            ...prev,
            dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
                ? prev.dietaryRestrictions.filter(r => r !== restriction)
                : [...prev.dietaryRestrictions, restriction]
        }));
    };

    const validateForm = () => {
        return formData.origin && formData.locals && formData.drink;
    };

    return (
        <div className="formUser-container">
            <h2 className="text-center">Breakfast Preferences</h2>

            {submitError && <div className="alert alert-danger">{submitError}</div>}
            {submitSuccess && (
                <div className="alert alert-success">
                    Preferences submitted successfully! 🎉
                </div>
            )}

            {isLoading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading meals...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="origin">✨Tower of Origin</label>
                        <select
                            id="origin"
                            name="origin"
                            className="form-control"
                            value={formData.origin}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Choose your Tower</option>
                            {towerOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="drink">🍵 Choice of Drink</label>
                        <select
                            id="drink"
                            name="drink"
                            className="form-control"
                            value={formData.drink}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a drink</option>
                            {drinkOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="locals">🍽️ Choose Your Meal</label>
                        <select
                            id="locals"
                            name="locals"
                            className="form-control"
                            value={formData.locals}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a meal</option>
                            <optgroup label="Local Options">
                                {localEdibles.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </optgroup>
                            <optgroup label="API Meals">
                                {apiMeals.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>🚫 Dietary Restrictions</label>
                        <div className="checkbox-group">
                            {dietaryOptions.map((option) => (
                                <label key={option} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={formData.dietaryRestrictions.includes(option)}
                                        onChange={() => handleDietaryChange(option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">📖 Special Notes</label>
                        <textarea
                            id="notes"
                            name="specialNotes"
                            className="form-control"
                            value={formData.specialNotes}
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-block"
                        disabled={!validateForm() || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-small"></span> Submitting...
                            </>
                        ) : (
                            "Submit Preferences"
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};