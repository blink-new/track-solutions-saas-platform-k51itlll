import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Package,
  Clock,
  MapPin,
  TrendingUp,
  Plus,
  Upload,
  Route,
  Users,

  ArrowRight
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const stats = [
    {
      title: "Total de Entregas",
      value: "17",
      subtitle: "Todas as entregas",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Entregas Hoje",
      value: "0",
      subtitle: "Criadas hoje",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Em Rota",
      value: "3",
      subtitle: "Sendo entregues",
      icon: MapPin,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Taxa de Entrega",
      value: "76%",
      subtitle: "Entregas concluídas",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      customer: "Dra. Sabrina Carvalho",
      address: "Quadra Maria Clara Pinto, 870 - Trevo, Francisco Morato - SP",
      status: "Em Rota",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      customer: "Yuri Viana",
      address: "Pátio de Rocha, 720 - Maria Helena, Franco da Rocha - SP",
      status: "Em Rota",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      customer: "Thales Duarte",
      address: "Estrada Moreira, 785 - Nova Floresta, Francisco Morato - SP",
      status: "Em Rota",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 4,
      customer: "Isabelly Ferreira",
      address: "Passarela de Alves, 647 - Vila Tirol, Francisco Morato - SP",
      status: "Entregue",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 5,
      customer: "Larissa Porto",
      address: "Esplanada de da Conceição, 184 - São Jorge 3ª Seção, Francisco Morato - SP",
      status: "Entregue",
      statusColor: "bg-green-100 text-green-800"
    }
  ]

  const quickActions = [
    {
      title: "Nova Entrega",
      description: "Cadastrar nova entrega",
      icon: Plus,
      color: "bg-blue-600 hover:bg-blue-700",
      href: "/entregas"
    },
    {
      title: "Importar Planilha",
      description: "Upload de entregas em lote",
      icon: Upload,
      color: "bg-green-600 hover:bg-green-700",
      href: "/importar-planilha"
    },
    {
      title: "Otimizar Rotas",
      description: "Calcular melhores rotas",
      icon: Route,
      color: "bg-purple-600 hover:bg-purple-700",
      href: "/rotas"
    },
    {
      title: "Gerenciar Equipe",
      description: "Cadastrar entregadores",
      icon: Users,
      color: "bg-orange-600 hover:bg-orange-700",
      href: "/entregadores"
    }
  ]

  const performanceData = [
    { label: "Entregados", value: 13, color: "bg-green-500" },
    { label: "Pendentes", value: 0, color: "bg-yellow-500" },
    { label: "Em rota", value: 3, color: "bg-blue-500" },
    { label: "Atrasados", value: 1, color: "bg-red-500" }
  ]

  const bottomStats = [
    {
      title: "Entregadores",
      active: 3,
      total: 3,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Rotas",
      active: 0,
      total: 4,
      icon: MapPin,
      color: "text-green-600"
    },
    {
      title: "Performance",
      active: 13,
      total: 0,
      icon: TrendingUp,
      color: "text-purple-600",
      labels: ["Entregas:", "Pendentes:"]
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral das suas operações de entrega</p>
        {user && (
          <Badge variant="outline" className="w-fit">
            Logado como: {user.name} ({user.role})
          </Badge>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Atividade Recente</span>
                </CardTitle>
                <CardDescription>Últimas atualizações de entregas</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {activity.customer.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.customer}</p>
                          <p className="text-sm text-gray-600 truncate">{activity.address}</p>
                        </div>
                      </div>
                    </div>
                    <Badge className={activity.statusColor} variant="secondary">
                      {activity.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Ver mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200"
                    onClick={() => navigate(action.href)}
                  >
                    <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{action.title}</span>
                      <span className="text-xs text-gray-500">{action.description}</span>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bottomStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{stat.title}</h3>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {stat.labels ? stat.labels[0] : 'Ativos:'}
                    </span>
                    <span className="font-bold text-2xl">{stat.active}</span>
                  </div>
                  {stat.labels && stat.labels[1] ? (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{stat.labels[1]}</span>
                      <span className="font-bold text-2xl">{stat.total}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="font-bold text-2xl">{stat.total}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Status das Entregas</CardTitle>
          <CardDescription>Distribuição atual das entregas por status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32">
                    <Progress value={(item.value / 17) * 100} className="h-2" />
                  </div>
                  <span className="text-sm font-bold w-8">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard