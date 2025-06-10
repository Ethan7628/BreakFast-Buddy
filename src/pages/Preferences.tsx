import { useState, useEffect } from 'react';
import { BreakfastForm } from '../components/BreakFast';
import { MealSidebar } from '../components/MealSidebar';
import { type Meal } from '../types';
import '../styles/meals.css';

export const Preferences = () => {
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 879);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="preferences-page">

            {isMobile && (
                <button
                    className={`hamburger ${sidebarOpen ? 'open' : ''}`}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle sidebar"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            )}


            <div className={`sidebar-container ${isMobile ? (sidebarOpen ? 'open' : 'closed') : ''}`}>
                <MealSidebar onSelectMeal={(meal) => {
                    setSelectedMeal(meal);
                    if (isMobile) setSidebarOpen(false);
                }} />
            </div>


            <div className="form-container">
                <BreakfastForm selectedMeal={selectedMeal || undefined} />
            </div>
        </div>
    );
};