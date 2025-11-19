// Tipos para o aplicativo de nutrição

export interface User {
  id: string
  email: string
  name?: string
  created_at: string
}

export interface UserGoals {
  id: string
  user_id: string
  age: number
  weight: number
  height: number
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  allergies: string[]
  goal: 'lose_weight' | 'gain_muscle'
  created_at: string
}

export interface Food {
  id: string
  name: string
  category: 'protein' | 'carb' | 'vegetable' | 'fat'
  portion_weight: number // em gramas
  calories: number
  protein: number // em gramas
  carbs: number // em gramas
  fat: number // em gramas
}

export interface MealItem {
  food_id: string
  food: Food
  quantity: number // porções
}

export interface Meal {
  name: string // Café da manhã, Almoço, etc.
  items: MealItem[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
}

export interface DailyMealPlan {
  day: string // 'Segunda-feira', etc.
  meals: Meal[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
}

export interface MealPlan {
  id: string
  user_id: string
  weekly_plan: DailyMealPlan[]
  total_weekly_calories: number
  created_at: string
}