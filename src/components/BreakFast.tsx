import { useState, useEffect } from "react";
import { auth } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { type Meal } from '../types';

interface BreakfastFormProps {
    selectedMeal?: Meal;
}

const towerOptions = ["🔮UPTI Block", "🎨Content Corner", "💻Dev's Tower", "🏰Office Keep"];
const drinkOptions = ["☕Coffee", "🧃Juice", "💧Water", "🥛Milk", "☕Tea"];
const localEdibles = ["Cassava", "Bread-Bans", "Boiled Eggs", "Samosa", "Bundanzi", "Yellow Banana"]
const dietaryOptions = ["Gluten-Free", "Dairy-Free", "Nut-Free"];

export const BreakfastForm = ({ selectedMeal }: BreakfastFormProps) => {
    const [user] = useAuthState(auth);
    const [meal, setMeal] = useState("");
    const [locals, setLocals] = useState('')
    const [drink, setDrink] = useState("");
    const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
    const [specialNotes, setSpecialNotes] = useState("");


    useEffect(() => {
        if (selectedMeal) {
            setMeal(selectedMeal.strMeal);


            if (selectedMeal.strCategory === 'Breakfast') {
                setDrink('Coffee');
            } else if (selectedMeal.strCategory === 'Lunch') {
                setDrink('Water');
            }
        }
    }, [selectedMeal]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            userId: user?.uid,
            meal,
            drink,
            dietaryRestrictions,
            specialNotes,
        });
        alert("Breakfast preferences submitted!");
    };

    const handleDietaryChange = (restriction: string) => {
        setDietaryRestrictions((prev) =>
            prev.includes(restriction)
                ? prev.filter((r) => r !== restriction)
                : [...prev, restriction]
        );
    };

    return (
        <div className="formUser-container">
            <h2 className="text-center">Breakfast Preferences</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="meal">✨Tower of Origin</label>
                    <select
                        id="meal"
                        className="form-control"
                        value={meal}
                        onChange={(e) => setMeal(e.target.value)}
                        required
                    >
                        <option value="">Choose your Tower</option>
                        {towerOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="drink">Choice of your Drink</label>
                    <select
                        id="drink"
                        className="form-control"
                        value={drink}
                        onChange={(e) => setDrink(e.target.value)}
                        required
                    >
                        <option value="">Select a drink</option>
                        {drinkOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="drink">Choose your Local Escort</label>
                    <select
                        id="locals"
                        className="form-control"
                        value={locals}
                        onChange={(e) => setLocals(e.target.value)}
                        required
                    >
                        <option value="">Select Your Escort</option>
                        {localEdibles.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Dietary Restrictions</label>
                    <div className="checkbox-group">
                        {dietaryOptions.map((option) => (
                            <label key={option} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={dietaryRestrictions.includes(option)}
                                    onChange={() => handleDietaryChange(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Special Notes</label>
                    <textarea
                        id="notes"
                        className="form-control"
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-block">
                    Submit Preferences
                </button>
            </form>
        </div>
    );
};