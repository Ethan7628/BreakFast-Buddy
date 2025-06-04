import { useState } from 'react';
import { BreakfastForm } from '../components/BreakFast';
import { MealSidebar } from '../components/MealSidebar';
import { type Meal } from '../types';
import '../styles/meals.css';

export const Preferences = () => {
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    return (
        <div className="preferences-page">
            <div className="sidebar-container">
                <MealSidebar onSelectMeal={setSelectedMeal} />
            </div>

            <div className="form-container">
                <BreakfastForm selectedMeal={selectedMeal || undefined} />
            </div>
        </div>
    );
};