import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Truck, 
  MapPin, 
  Users, 
  BarChart3, 
  Shield, 
  Zap, 
  CheckCircle, 
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Gestão de Entregas",
      description: "Controle completo de todas as entregas com status em tempo real e rastreamento avançado."
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: "Otimização de Rotas",
      description: "Planejamento inteligente de rotas para reduzir custos e tempo de entrega."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Gestão de Equipe",
      description: "Gerenciamento completo de entregadores e transportadoras com níveis de acesso."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Análises Avançadas",
      description: "Relatórios detalhados e métricas de performance para tomada de decisão."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Segurança LGPD",
      description: "Plataforma totalmente compatível com LGPD e melhores práticas de segurança."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Tempo Real",
      description: "Atualizações instantâneas e notificações para manter todos informados."
    }
  ]

  const plans = [
    {
      name: "Starter",
      price: "R$ 99",
      period: "/mês",
      description: "Ideal para pequenas transportadoras",
      features: [
        "Até 100 entregas/mês",
        "5 entregadores",
        "Rotas básicas",
        "Suporte por email",
        "Dashboard básico"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "R$ 299",
      period: "/mês",
      description: "Para empresas em crescimento",
      features: [
        "Até 1000 entregas/mês",
        "25 entregadores",
        "Otimização de rotas",
        "Suporte prioritário",
        "Análises avançadas",
        "API completa"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "R$ 599",
      period: "/mês",
      description: "Para grandes operações",
      features: [
        "Entregas ilimitadas",
        "Entregadores ilimitados",
        "Múltiplas transportadoras",
        "Suporte dedicado",
        "Relatórios customizados",
        "Integração avançada"
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, Transportes Rápido",
      content: "Track Solutions revolucionou nossa operação. Reduzimos custos em 30% e melhoramos a satisfação do cliente.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Gerente, Logística Express",
      content: "A plataforma é intuitiva e poderosa. Nossa equipe se adaptou rapidamente e os resultados foram imediatos.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Diretora, Entregas SP",
      content: "Excelente suporte e funcionalidades. A otimização de rotas sozinha já paga o investimento.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Track Solutions</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Preços</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Depoimentos</a>
              <Button variant="outline" onClick={() => navigate('/login')}>
                Entrar
              </Button>
              <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Começar Grátis
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t"
            >
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-4 py-2">Funcionalidades</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-4 py-2">Preços</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 px-4 py-2">Depoimentos</a>
                <div className="flex flex-col space-y-2 px-4">
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Entrar
                  </Button>
                  <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Começar Grátis
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
              🚀 Nova plataforma de gestão logística
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolucione sua
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Logística</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Plataforma completa para gestão de fretes e entregas com controle hierárquico, 
              otimização de rotas e conformidade LGPD. Tudo que você precisa em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 text-lg"
              >
                Começar Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg"
                onClick={() => navigate('/demo')}
              >
                Ver Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Poderosas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todas as ferramentas que você precisa para gerenciar sua operação logística com eficiência
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos Para Cada Necessidade
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para sua operação. Todos os planos incluem 30 dias grátis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                      Mais Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => navigate(`/checkout?plan=${plan.name.toLowerCase()}`)}
                      className={`w-full mt-6 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Contratar Plano
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empresas de todos os tamanhos confiam no Track Solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto Para Transformar Sua Logística?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a centenas de empresas que já revolucionaram suas operações
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Começar Gratuitamente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Track Solutions</span>
              </div>
              <p className="text-gray-400">
                Plataforma completa para gestão logística com conformidade LGPD e segurança avançada.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Track Solutions. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage