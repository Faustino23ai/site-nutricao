import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Target, Calendar, Download, Moon, Sun } from 'lucide-react'

export default function Home() {
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
            <Button variant="ghost" size="sm">
              <Sun className="w-4 h-4" />
            </Button>
            <Link href="/auth/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            ✨ Plano alimentar personalizado
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Monte sua dieta semanal automaticamente
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Com base nos seus objetivos, gere cardápios equilibrados e personalizados.
            Perca peso ou ganhe massa muscular com refeições deliciosas e nutritivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>1. Cadastre-se</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Crie sua conta e responda algumas perguntas sobre seus objetivos e preferências.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>2. Defina seus objetivos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Informe idade, peso, altura, nível de atividade e alergias para um plano personalizado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>3. Receba seu cardápio</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gere automaticamente um plano alimentar semanal com todas as refeições.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Benefícios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Personalizado</h3>
                <p className="text-sm text-muted-foreground">
                  Algoritmo inteligente calcula suas necessidades calóricas exatas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Equilibrado</h3>
                <p className="text-sm text-muted-foreground">
                  Macronutrientes balanceados: proteínas, carboidratos e gorduras.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Flexível</h3>
                <p className="text-sm text-muted-foreground">
                  Considere alergias e restrições alimentares.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Prático</h3>
                <p className="text-sm text-muted-foreground">
                  Baixe seu cardápio em PDF e leve para qualquer lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua alimentação?</h2>
          <p className="text-xl mb-8 opacity-90">
            Comece hoje mesmo e veja os resultados em semanas.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary">
              Criar Meu Plano Alimentar
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">NutriPlan</span>
          </div>
          <p className="text-sm opacity-75">
            © 2024 NutriPlan. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}