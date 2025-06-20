import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  FileText,
  Video,
  Send
} from 'lucide-react'
import { toast } from 'sonner'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'media'
  })

  const faqItems = [
    {
      id: "1",
      question: "Como faço para criar uma nova entrega?",
      answer: "Para criar uma nova entrega, acesse o menu 'Entregas' e clique no botão 'Nova Entrega'. Preencha todos os campos obrigatórios como endereço de origem, destino, cliente e dados do produto. Você também pode importar entregas em lote através de uma planilha CSV."
    },
    {
      id: "2", 
      question: "Como otimizar rotas de entrega?",
      answer: "Acesse o menu 'Rotas' e clique em 'Nova Rota'. Selecione as entregas que deseja incluir na rota e o sistema calculará automaticamente a melhor sequência baseada em distância, tempo ou outros critérios de otimização configurados nas suas preferências."
    },
    {
      id: "3",
      question: "Como gerenciar entregadores?",
      answer: "No menu 'Entregadores' você pode cadastrar novos entregadores, editar informações existentes, definir status (ativo/inativo) e acompanhar o desempenho de cada um. Cada entregador terá acesso apenas às suas rotas designadas."
    },
    {
      id: "4",
      question: "Como importar entregas via planilha?",
      answer: "Vá para 'Entregas' > 'Importar Planilha'. Baixe o template CSV, preencha com seus dados seguindo o formato especificado e faça o upload. O sistema validará os dados e importará as entregas automaticamente."
    },
    {
      id: "5",
      question: "Como alterar configurações de notificação?",
      answer: "Acesse 'Configurações' > 'Notificações' e configure quais tipos de alertas você deseja receber por email, SMS ou notificações push. Você pode personalizar notificações para entregas, rotas e alertas do sistema."
    },
    {
      id: "6",
      question: "Como funciona o controle de acesso por níveis?",
      answer: "O sistema possui 3 níveis: Administrador (acesso total), Transportadora (gerencia própria empresa e entregadores) e Entregador (acesso apenas às suas rotas). Cada usuário vê apenas as informações pertinentes ao seu nível."
    },
    {
      id: "7",
      question: "Como rastrear uma entrega em tempo real?",
      answer: "No dashboard ou na lista de entregas, clique no status da entrega para ver detalhes em tempo real. Entregas 'Em Rota' mostram localização atual do entregador e tempo estimado de chegada."
    },
    {
      id: "8",
      question: "Como exportar relatórios?",
      answer: "Em qualquer listagem (entregas, rotas, etc.), use os filtros para selecionar o período e dados desejados, depois clique em 'Exportar' para baixar um arquivo CSV ou PDF com os dados filtrados."
    }
  ]

  const quickActions = [
    {
      title: "Guia de Início Rápido",
      description: "Aprenda o básico em 5 minutos",
      icon: <Book className="h-5 w-5 text-blue-600" />,
      action: () => toast.info("Guia será aberto em breve")
    },
    {
      title: "Vídeos Tutoriais", 
      description: "Assista nossos tutoriais",
      icon: <Video className="h-5 w-5 text-green-600" />,
      action: () => toast.info("Vídeos em desenvolvimento")
    },
    {
      title: "Documentação API",
      description: "Para desenvolvedores",
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      action: () => toast.info("Documentação disponível em breve")
    }
  ]

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Preencha todos os campos obrigatórios!')
      return
    }
    
    toast.success('Mensagem enviada com sucesso! Responderemos em breve.')
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'media'
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="h-6 w-6 text-blue-600" />
        <h1 className="text-3xl font-bold">Central de Ajuda</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search and FAQ */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-gray-600" />
                Buscar Ajuda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Digite sua dúvida ou busque por palavras-chave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos de Ajuda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center text-center"
                    onClick={action.action}
                  >
                    <div className="mb-2">{action.icon}</div>
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Perguntas Frequentes
              </CardTitle>
              {searchQuery && (
                <p className="text-sm text-gray-600">
                  {filteredFAQ.length} resultado(s) encontrado(s) para "{searchQuery}"
                </p>
              )}
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {filteredFAQ.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Nenhum resultado encontrado para sua busca.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tente usar palavras-chave diferentes ou entre em contato conosco.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-600" />
                Fale Conosco
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Resumo da sua dúvida"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Descreva sua dúvida ou problema..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Outras Formas de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">suporte@tracksolutions.com</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-sm text-gray-600">(11) 4000-0000</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Horário de Atendimento</p>
                  <p className="text-sm text-gray-600">
                    Segunda a Sexta<br />
                    9:00 às 18:00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Plataforma</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Operacional
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mapas</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Funcional
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Última verificação: há 5 minutos
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Help