import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Truck, ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, BarChart3, MapPin, Users, Shield, Zap } from 'lucide-react'
import { toast } from 'sonner'

const features = [
  {
    icon: <Truck className="h-6 w-6 text-blue-600" />,
    title: "Gestão de Entregas",
    description: "Controle completo de todas as entregas com status em tempo real e rastreamento avançado."
  },
  {
    icon: <MapPin className="h-6 w-6 text-green-600" />,
    title: "Otimização de Rotas",
    description: "Planejamento inteligente de rotas para reduzir custos e tempo de entrega."
  },
  {
    icon: <Users className="h-6 w-6 text-purple-600" />,
    title: "Gestão de Equipe",
    description: "Gerenciamento completo de entregadores e transportadoras com níveis de acesso."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
    title: "Análises Avançadas",
    description: "Relatórios detalhados e métricas de performance para tomada de decisão."
  },
  {
    icon: <Shield className="h-6 w-6 text-red-600" />,
    title: "Segurança LGPD",
    description: "Plataforma totalmente compatível com LGPD e melhores práticas de segurança."
  },
  {
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    title: "Tempo Real",
    description: "Atualizações instantâneas e notificações para manter todos informados."
  }
]

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const demoCredentials = [
    { label: 'Admin', email: 'admin@tracksolutions.com', role: 'Administrador' },
    { label: 'Transportadora', email: 'transport@empresa.com', role: 'Transportadora' },
    { label: 'Entregador', email: 'driver@empresa.com', role: 'Entregador' }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.terms = 'Você deve concordar com os termos de uso e política de privacidade'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      await login(formData.email)
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
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
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Track Solutions</CardTitle>
              <CardDescription className="text-gray-600">
                Entre em sua conta para acessar a plataforma
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              {/* Demo Credentials */}
              {isDemo && (
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                  <AlertDescription className="text-sm">
                    <strong>Demo - Use estas credenciais:</strong>
                    <div className="mt-2 space-y-1">
                      {demoCredentials.map((cred, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span>{cred.role}:</span>
                          <button
                            onClick={() => setFormData(prev => ({ ...prev, email: cred.email, password: '123456' }))}
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {cred.email}
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-600">Senha padrão: 123456</p>
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <label htmlFor="terms" className="cursor-pointer">
                      Concordo com os{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Termos de Uso
                      </a>{' '}
                      e{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Política de Privacidade
                      </a>
                    </label>
                  </div>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-500">{errors.terms}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              {/* Google login centered */}
              <div className="mt-8">
                <div className="flex flex-col items-center">
                  <Separator className="w-full mb-4" />
                  <span className="text-xs uppercase text-gray-500 mb-4">Ou continue com</span>
                  <Button variant="outline" className="w-full max-w-xs flex items-center justify-center" disabled>
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                </div>
              </div>

              {/* Features for demo mode */}
              {isDemo && (
                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4 text-center">Funcionalidades da Plataforma</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-slate-50 rounded-lg p-4 shadow-sm">
                        {feature.icon}
                        <div>
                          <div className="font-medium text-gray-900">{feature.title}</div>
                          <div className="text-sm text-gray-600">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage