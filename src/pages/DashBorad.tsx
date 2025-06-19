import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { type BreakfastPreference } from '../types'

export const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [preferences, setPreferences] = useState<BreakfastPreference[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalPreferences: 0,
        popularMeal: '',
        popularDrink: ''
    });

    useEffect(() => {
        const fetchPreferences = async () => {
            if (!user) return;

            try {
                setLoading(true);
                const q = query(collection(db, 'preferences'));
                const querySnapshot = await getDocs(q);

                const prefData: BreakfastPreference[] = [];
                querySnapshot.forEach((doc) => {
                    prefData.push({ id: doc.id, ...doc.data() } as BreakfastPreference);
                });

                setPreferences(prefData);


                const mealCounts: Record<string, number> = {};
                const drinkCounts: Record<string, number> = {};

                prefData.forEach(pref => {
                    mealCounts[pref.meal] = (mealCounts[pref.meal] || 0) + 1;
                    drinkCounts[pref.drink] = (drinkCounts[pref.drink] || 0) + 1;
                });

                const popularMeal = Object.keys(mealCounts).reduce((a, b) =>
                    mealCounts[a] > mealCounts[b] ? a : b, '');
                const popularDrink = Object.keys(drinkCounts).reduce((a, b) =>
                    drinkCounts[a] > drinkCounts[b] ? a : b, '');

                setStats({
                    totalPreferences: prefData.length,
                    popularMeal,
                    popularDrink
                });

            } catch (error) {
                console.error("Error fetching preferences: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreferences();
    }, [user]);

    if (loading) {
        return <div className="loading-spinner">
            <div className="spinner"></div>
        </div>;
    }

    return (
        <div className="dashboard-container">
            <h2 className="text-center">Admin Dashboard</h2>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Preferences</h3>
                    <p>{stats.totalPreferences}</p>
                </div>
                <div className="stat-card">
                    <h3>Most Popular Meal</h3>
                    <p>{stats.popularMeal || 'N/A'}</p>
                </div>
                <div className="stat-card">
                    <h3>Most Popular Drink</h3>
                    <p>{stats.popularDrink || 'N/A'}</p>
                </div>
            </div>

            <div className="preferences-list">
                <h3>Recent Preferences</h3>
                {preferences.length === 0 ? (
                    <p>No preferences submitted yet.</p>
                ) : (
                    <table className="preferences-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Meal</th>
                                <th>Drink</th>
                                <th>Dietary Restrictions</th>
                                <th>Special Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {preferences.map((pref) => (
                                <tr key={pref.id}>
                                    <td>{pref.userName}</td>
                                    <td>{pref.date}</td>
                                    <td>{pref.meal}</td>
                                    <td>{pref.drink}</td>
                                    <td>
                                        {pref.dietaryRestrictions.length > 0
                                            ? pref.dietaryRestrictions.join(', ')
                                            : 'None'}
                                    </td>
                                    <td>{pref.specialNotes || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};