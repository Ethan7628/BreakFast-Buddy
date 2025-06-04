export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface BreakfastPreference {
    id?: string; // Optional because Firestore will auto-generate this
    userId: string;
    userName: string;
    date: string; // Format: YYYY-MM-DD
    meal: string;
    drink: string;
    dietaryRestrictions: string[];
    specialNotes: string;
    createdAt?: Date; // Optional because Firestore will auto-set this
}

export interface DashboardStats {
    totalUsers: number;
    totalPreferences: number;
    popularMeal: string;
    popularDrink: string;
}

// src/types.ts
export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
}

// Add this to your existing types.ts file