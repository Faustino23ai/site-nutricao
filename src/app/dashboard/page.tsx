'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Calendar, History, Settings, Plus, Download, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export const metadata: Metadata = {
  title: 'Dashboard - NutriPlan',
  description: 'Seu painel de controle para gerenciar planos alimentares personalizados.',
}

interface UserGoals {
  id: string
  age: number
  weight: number
  height: number
  activity_level: string
  allergies: string[]
  goal: string
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [goals, setGoals] = useState<UserGoals | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        router.push('/auth/login')
        return
      }

      setUser(user)

      // Buscar objetivos do usuário
      const { data: goalsData, error: goalsError } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (!goalsError && goalsData) {
        setGoals(goalsData)
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logout realizado com sucesso!')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">NutriPlan</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Olá, {user?.user_metadata?.name || 'Usuário'}!</h2>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de controle nutricional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Cardápio atual */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Seu cardápio atual</span>
              </CardTitle>
              <CardDescription>
                {goals ? `Plano personalizado baseado nos seus objetivos` : 'Configure seus objetivos para gerar um plano'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Plano de {goals.goal === 'lose_weight' ? 'perda de peso' : 'ganho de massa'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Criado em {new Date(goals.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Badge variant="secondary">Ativo</Badge>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Você ainda não configurou seus objetivos nutricionais.
                    </p>
                    <Link href="/goals">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Configurar objetivos
                      </Button>
                    </Link>
                  </div>
                )}
                {goals && (
                  <div className="flex space-x-2">
                    <Link href="/meal-plan">
                      <Button size="sm">
                        Ver cardápio
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ações rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/goals">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo plano
                </Button>
              </Link>
              {goals && (
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Regenerar cardápio
                </Button>
              )}
              <Link href="/dashboard/history">
                <Button className="w-full justify-start" variant="outline">
                  <History className="w-4 h-4 mr-2" />
                  Histórico
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        {goals && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Calorias diárias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.850</div>
                <p className="text-xs text-muted-foreground">
                  Meta: 1.800-2.000 kcal
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Proteínas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">140g</div>
                <p className="text-xs text-muted-foreground">
                  35% das calorias
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Carboidratos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">180g</div>
                <p className="text-xs text-muted-foreground">
                  40% das calorias
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Gorduras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65g</div>
                <p className="text-xs text-muted-foreground">
                  25% das calorias
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Histórico recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>Histórico recente</span>
            </CardTitle>
            <CardDescription>
              Seus últimos planos alimentares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals ? (
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium">
                      Plano de {goals.goal === 'lose_weight' ? 'perda de peso' : 'ganho de massa'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(goals.created_at).toLocaleDateString('pt-BR')} - 7 dias
                    </p>
                  </div>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhum plano encontrado. Configure seus objetivos para começar.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}