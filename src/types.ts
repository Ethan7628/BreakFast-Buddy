export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface BreakfastPreference {
    id?: string;
    userId: string;
    userName: string;
    date: string; // Format: YYYY-MM-DD
    meal: string;
    drink: string;
    dietaryRestrictions: string[];
    specialNotes: string;
    createdAt?: Date;
}

export interface DashboardStats {
    totalUsers: number;
    totalPreferences: number;
    popularMeal: string;
    popularDrink: string;
}

export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
}

// Add this to your existing types.ts file