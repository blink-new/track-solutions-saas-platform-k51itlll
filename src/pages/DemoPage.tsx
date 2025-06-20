import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, Building2, Truck, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const DemoPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const demoProfiles = [
    {
      id: 'admin',
      title: 'Administrador',
      email: 'admin@tracksolutions.com',
      icon: <User className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Acesso completo ao sistema',
      features: [
        'Gestão de todas as transportadoras',
        'Gestão de todos os motoristas',
        'Relatórios completos',
        'Configurações do sistema',
        'Dashboard administrativo'
      ]
    },
    {
      id: 'transport',
      title: 'Transportadora',
      email: 'transport@empresa.com',
      icon: <Building2 className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Gestão da própria transportadora',
      features: [
        'Gestão dos próprios motoristas',
        'Criação de rotas e entregas',
        'Relatórios da empresa',
        'Dashboard da transportadora',
        'Gestão de veículos'
      ]
    },
    {
      id: 'driver',
      title: 'Entregador',
      email: 'driver@empresa.com',
      icon: <Truck className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      description: 'Acesso às próprias entregas',
      features: [
        'Visualizar rotas atribuídas',
        'Atualizar status de entregas',
        'Histórico de entregas',
        'Dashboard do motorista',
        'Informações de rota'
      ]
    }
  ]

  const handleDemoLogin = async (email: string, profileId: string) => {
    setLoading(profileId)
    try {
      await login(email)
      navigate('/dashboard')
    } catch (error) {
      console.error('Erro ao fazer login demo:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
              🚀 Ambiente de Demonstração
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore o Track Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha um perfil abaixo para experimentar todas as funcionalidades do sistema
            </p>
          </motion.div>
        </div>

        {/* Demo Profiles */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {demoProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${profile.color} flex items-center justify-center text-white`}>
                    {profile.icon}
                  </div>
                  <CardTitle className="text-2xl">{profile.title}</CardTitle>
                  <CardDescription className="text-base">{profile.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {profile.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full bg-gradient-to-r ${profile.color} hover:opacity-90 transition-opacity`}
                    onClick={() => handleDemoLogin(profile.email, profile.id)}
                    disabled={loading === profile.id}
                  >
                    {loading === profile.id ? (
                      <>Entrando...</>
                    ) : (
                      <>
                        Acessar como {profile.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {profile.email}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sobre o Ambiente Demo
          </h2>
          <div className="space-y-4 text-gray-600 max-w-3xl mx-auto">
            <p>
              Este é um ambiente de demonstração totalmente funcional do Track Solutions. 
              Todos os dados são simulados e resetados periodicamente.
            </p>
            <p>
              Experimente diferentes perfis para entender como o sistema se adapta às 
              necessidades de cada tipo de usuário, mantendo a segurança e hierarquia de acesso.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline" className="px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Sem necessidade de cadastro
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Dados simulados
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Todas as funcionalidades
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DemoPage