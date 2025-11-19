import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, RefreshCw, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Seu Cardápio Semanal - NutriPlan',
  description: 'Visualize seu plano alimentar semanal personalizado com todas as refeições.',
}

export default function MealPlanPage() {
  // Dados mockados para demonstração
  const weeklyPlan = [
    {
      day: 'Segunda-feira',
      meals: [
        {
          name: 'Café da Manhã',
          items: [
            { food: 'Aveia', quantity: 2, unit: 'porções' },
            { food: 'Banana', quantity: 1, unit: 'unidade' },
            { food: 'Iogurte natural', quantity: 1, unit: 'copo' }
          ],
          calories: 320,
          protein: 12,
          carbs: 55,
          fat: 8
        },
        {
          name: 'Lanche da Manhã',
          items: [
            { food: 'Maçã', quantity: 1, unit: 'unidade' },
            { food: 'Amêndoas', quantity: 10, unit: 'unidades' }
          ],
          calories: 180,
          protein: 5,
          carbs: 15,
          fat: 12
        },
        {
          name: 'Almoço',
          items: [
            { food: 'Peito de frango', quantity: 150, unit: 'g' },
            { food: 'Arroz integral', quantity: 100, unit: 'g' },
            { food: 'Brócolis', quantity: 200, unit: 'g' },
            { food: 'Azeite de oliva', quantity: 1, unit: 'colher de sopa' }
          ],
          calories: 520,
          protein: 45,
          carbs: 45,
          fat: 18
        },
        {
          name: 'Lanche da Tarde',
          items: [
            { food: 'Iogurte grego', quantity: 150, unit: 'g' },
            { food: 'Morangos', quantity: 100, unit: 'g' }
          ],
          calories: 120,
          protein: 15,
          carbs: 12,
          fat: 2
        },
        {
          name: 'Jantar',
          items: [
            { food: 'Salmão', quantity: 120, unit: 'g' },
            { food: 'Batata doce', quantity: 150, unit: 'g' },
            { food: 'Espinafre', quantity: 100, unit: 'g' }
          ],
          calories: 380,
          protein: 32,
          carbs: 30,
          fat: 16
        }
      ],
      total_calories: 1520,
      total_protein: 109,
      total_carbs: 157,
      total_fat: 56
    },
    {
      day: 'Terça-feira',
      meals: [
        {
          name: 'Café da Manhã',
          items: [
            { food: 'Pão integral', quantity: 2, unit: 'fatias' },
            { food: 'Ovo mexido', quantity: 2, unit: 'unidades' },
            { food: 'Tomate', quantity: 1, unit: 'unidade' }
          ],
          calories: 350,
          protein: 18,
          carbs: 35,
          fat: 14
        },
        {
          name: 'Lanche da Manhã',
          items: [
            { food: 'Pera', quantity: 1, unit: 'unidade' },
            { food: 'Queijo cottage', quantity: 100, unit: 'g' }
          ],
          calories: 160,
          protein: 14,
          carbs: 12,
          fat: 5
        },
        {
          name: 'Almoço',
          items: [
            { food: 'Peixe branco', quantity: 150, unit: 'g' },
            { food: 'Quinoa', quantity: 80, unit: 'g' },
            { food: 'Cenoura', quantity: 150, unit: 'g' },
            { food: 'Abacate', quantity: 50, unit: 'g' }
          ],
          calories: 480,
          protein: 38,
          carbs: 35,
          fat: 20
        },
        {
          name: 'Lanche da Tarde',
          items: [
            { food: 'Iogurte natural', quantity: 150, unit: 'g' },
            { food: 'Nozes', quantity: 15, unit: 'g' }
          ],
          calories: 200,
          protein: 8,
          carbs: 10,
          fat: 15
        },
        {
          name: 'Jantar',
          items: [
            { food: 'Frango grelhado', quantity: 120, unit: 'g' },
            { food: 'Batata doce', quantity: 120, unit: 'g' },
            { food: 'Abobrinha', quantity: 150, unit: 'g' }
          ],
          calories: 340,
          protein: 35,
          carbs: 28,
          fat: 10
        }
      ],
      total_calories: 1530,
      total_protein: 113,
      total_carbs: 130,
      total_fat: 64
    }
    // Adicionar mais dias conforme necessário
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">NutriPlan</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Seu Cardápio Semanal</h2>
          <p className="text-muted-foreground">
            Plano personalizado para perda de peso - 1.500-1.600 kcal/dia
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Gerar novamente
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
        </div>

        <Tabs defaultValue="segunda-feira" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="segunda-feira">Seg</TabsTrigger>
            <TabsTrigger value="terca-feira">Ter</TabsTrigger>
            <TabsTrigger value="quarta-feira">Qua</TabsTrigger>
            <TabsTrigger value="quinta-feira">Qui</TabsTrigger>
            <TabsTrigger value="sexta-feira">Sex</TabsTrigger>
            <TabsTrigger value="sabado">Sáb</TabsTrigger>
            <TabsTrigger value="domingo">Dom</TabsTrigger>
          </TabsList>

          {weeklyPlan.map((dayPlan, index) => (
            <TabsContent key={dayPlan.day.toLowerCase().replace(' ', '-')} value={dayPlan.day.toLowerCase().replace(' ', '-')}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{dayPlan.day}</span>
                    <Badge variant="secondary">
                      {dayPlan.total_calories} kcal
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Macronutrientes: {dayPlan.total_protein}g proteína, {dayPlan.total_carbs}g carboidratos, {dayPlan.total_fat}g gorduras
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dayPlan.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{meal.name}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Alimentos:</h5>
                            <ul className="text-sm space-y-1">
                              {meal.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  • {item.food} - {item.quantity} {item.unit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-2">Macronutrientes:</h5>
                            <div className="text-sm space-y-1">
                              <p>Calorias: {meal.calories} kcal</p>
                              <p>Proteína: {meal.protein}g</p>
                              <p>Carboidratos: {meal.carbs}g</p>
                              <p>Gorduras: {meal.fat}g</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          {/* Placeholder para dias não implementados */}
          {['quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado', 'domingo'].map(day => (
            <TabsContent key={day} value={day}>
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Cardápio para {day} será gerado em breve.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}