'use client'

import { Metadata } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Target, User, Activity, AlertTriangle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export const metadata: Metadata = {
  title: 'Objetivos Nutricionais - NutriPlan',
  description: 'Defina seus objetivos nutricionais para gerar um plano alimentar personalizado.',
}

const allergies = [
  'Glúten',
  'Lactose',
  'Ovos',
  'Amendoim',
  'Nozes',
  'Peixe',
  'Frutos do mar',
  'Soja'
]

export default function GoalsPage() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('')
  const [goal, setGoal] = useState('')
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    if (checked) {
      setSelectedAllergies([...selectedAllergies, allergy])
    } else {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergy))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('Usuário não autenticado')
        router.push('/auth/login')
        return
      }

      const goalsData = {
        user_id: user.id,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        activity_level: activityLevel,
        allergies: selectedAllergies,
        goal: goal
      }

      const { error } = await supabase
        .from('user_goals')
        .insert(goalsData)

      if (error) {
        toast.error('Erro ao salvar objetivos: ' + error.message)
      } else {
        toast.success('Objetivos salvos com sucesso!')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Erro inesperado ao salvar objetivos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">NutriPlan</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Defina seus objetivos</h2>
          <p className="text-muted-foreground">
            Responda algumas perguntas para criar seu plano alimentar personalizado
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Informações pessoais</span>
            </CardTitle>
            <CardDescription>
              Dados necessários para calcular suas necessidades calóricas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    min="30"
                    max="200"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    min="120"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Nível de atividade */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Nível de atividade física</span>
                </Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu nível de atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentário (pouco ou nenhum exercício)</SelectItem>
                    <SelectItem value="light">Leve (exercício leve 1-3 dias/semana)</SelectItem>
                    <SelectItem value="moderate">Moderado (exercício moderado 3-5 dias/semana)</SelectItem>
                    <SelectItem value="active">Ativo (exercício intenso 6-7 dias/semana)</SelectItem>
                    <SelectItem value="very_active">Muito ativo (exercício muito intenso diariamente)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Objetivo */}
              <div className="space-y-2">
                <Label>Objetivo nutricional</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose_weight">Perder peso</SelectItem>
                    <SelectItem value="gain_muscle">Ganhar massa muscular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Alergias */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Alergias ou intolerâncias (opcional)</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {allergies.map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={allergy.toLowerCase()}
                        checked={selectedAllergies.includes(allergy)}
                        onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                      />
                      <Label
                        htmlFor={allergy.toLowerCase()}
                        className="text-sm font-normal"
                      >
                        {allergy}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Salvando...' : 'Gerar meu plano alimentar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}