import { UserGoals, Food, DailyMealPlan, Meal, MealItem } from '@/types'

// Fórmula Mifflin-St Jeor para TMB
function calculateBMR(age: number, weight: number, height: number, gender: 'male' | 'female' = 'male'): number {
  // Usando fórmula genérica, ajustada para gênero masculino por padrão
  // Para feminino: BMR = 10 * weight + 6.25 * height - 5 * age - 5
  // Para masculino: BMR = 10 * weight + 6.25 * height - 5 * age + 5
  return 10 * weight + 6.25 * height - 5 * age + 5
}

// Fator de atividade
const activityFactors = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
}

// Calcular calorias diárias necessárias
export function calculateDailyCalories(goals: UserGoals): number {
  const bmr = calculateBMR(goals.age, goals.weight, goals.height)
  const tdee = bmr * activityFactors[goals.activity_level]

  if (goals.goal === 'lose_weight') {
    return Math.round(tdee * 0.85) // -15%
  } else {
    return Math.round(tdee * 1.15) // +15%
  }
}

// Distribuição de calorias por refeição
const mealDistribution = {
  breakfast: 0.25, // 25%
  morning_snack: 0.15, // 15%
  lunch: 0.30, // 30%
  afternoon_snack: 0.15, // 15%
  dinner: 0.15 // 15%
  // Ceia opcional não incluída na distribuição principal
}

// Distribuição de macronutrientes baseada no objetivo
function getMacroDistribution(goal: UserGoals['goal']) {
  if (goal === 'lose_weight') {
    return {
      protein: 0.35, // 35%
      carbs: 0.40, // 40%
      fat: 0.25 // 25%
    }
  } else {
    return {
      protein: 0.30, // 30%
      carbs: 0.50, // 50%
      fat: 0.20 // 20%
    }
  }
}

// Selecionar alimentos por categoria
function selectFoodsByCategory(foods: Food[], category: Food['category'], count: number): Food[] {
  const categoryFoods = foods.filter(food => food.category === category)
  const shuffled = categoryFoods.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Gerar refeição
function generateMeal(
  name: string,
  calories: number,
  macroDist: { protein: number; carbs: number; fat: number },
  foods: Food[],
  allergies: string[]
): Meal {
  // Filtrar alimentos por alergias
  const safeFoods = foods.filter(food =>
    !allergies.some(allergy =>
      food.name.toLowerCase().includes(allergy.toLowerCase())
    )
  )

  const proteinFoods = selectFoodsByCategory(safeFoods, 'protein', 2)
  const carbFoods = selectFoodsByCategory(safeFoods, 'carb', 2)
  const vegetableFoods = selectFoodsByCategory(safeFoods, 'vegetable', 3)
  const fatFoods = selectFoodsByCategory(safeFoods, 'fat', 1)

  const items: MealItem[] = []

  // Adicionar proteínas
  const proteinCalories = calories * macroDist.protein
  proteinFoods.forEach(food => {
    const quantity = Math.max(1, Math.round(proteinCalories / food.calories / proteinFoods.length))
    items.push({
      food_id: food.id,
      food,
      quantity
    })
  })

  // Adicionar carboidratos
  const carbCalories = calories * macroDist.carbs
  carbFoods.forEach(food => {
    const quantity = Math.max(1, Math.round(carbCalories / food.calories / carbFoods.length))
    items.push({
      food_id: food.id,
      food,
      quantity
    })
  })

  // Adicionar vegetais
  vegetableFoods.forEach(food => {
    const quantity = Math.max(1, Math.round((calories * 0.1) / food.calories / vegetableFoods.length))
    items.push({
      food_id: food.id,
      food,
      quantity
    })
  })

  // Adicionar gorduras
  const fatCalories = calories * macroDist.fat
  fatFoods.forEach(food => {
    const quantity = Math.max(1, Math.round(fatCalories / food.calories / fatFoods.length))
    items.push({
      food_id: food.id,
      food,
      quantity
    })
  })

  // Calcular totais
  let totalCalories = 0
  let totalProtein = 0
  let totalCarbs = 0
  let totalFat = 0

  items.forEach(item => {
    const factor = item.quantity
    totalCalories += item.food.calories * factor
    totalProtein += item.food.protein * factor
    totalCarbs += item.food.carbs * factor
    totalFat += item.food.fat * factor
  })

  return {
    name,
    items,
    total_calories: Math.round(totalCalories),
    total_protein: Math.round(totalProtein),
    total_carbs: Math.round(totalCarbs),
    total_fat: Math.round(totalFat)
  }
}

// Gerar plano semanal
export function generateWeeklyMealPlan(goals: UserGoals, foods: Food[]): DailyMealPlan[] {
  const dailyCalories = calculateDailyCalories(goals)
  const macroDist = getMacroDistribution(goals.goal)

  const days = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo'
  ]

  return days.map(day => {
    const meals: Meal[] = []

    // Café da manhã
    meals.push(generateMeal(
      'Café da Manhã',
      dailyCalories * mealDistribution.breakfast,
      macroDist,
      foods,
      goals.allergies
    ))

    // Lanche da manhã
    meals.push(generateMeal(
      'Lanche da Manhã',
      dailyCalories * mealDistribution.morning_snack,
      macroDist,
      foods,
      goals.allergies
    ))

    // Almoço
    meals.push(generateMeal(
      'Almoço',
      dailyCalories * mealDistribution.lunch,
      macroDist,
      foods,
      goals.allergies
    ))

    // Lanche da tarde
    meals.push(generateMeal(
      'Lanche da Tarde',
      dailyCalories * mealDistribution.afternoon_snack,
      macroDist,
      foods,
      goals.allergies
    ))

    // Jantar
    meals.push(generateMeal(
      'Jantar',
      dailyCalories * mealDistribution.dinner,
      macroDist,
      foods,
      goals.allergies
    ))

    // Calcular totais do dia
    const totalCalories = meals.reduce((sum, meal) => sum + meal.total_calories, 0)
    const totalProtein = meals.reduce((sum, meal) => sum + meal.total_protein, 0)
    const totalCarbs = meals.reduce((sum, meal) => sum + meal.total_carbs, 0)
    const totalFat = meals.reduce((sum, meal) => sum + meal.total_fat, 0)

    return {
      day,
      meals,
      total_calories: totalCalories,
      total_protein: totalProtein,
      total_carbs: totalCarbs,
      total_fat: totalFat
    }
  })
}