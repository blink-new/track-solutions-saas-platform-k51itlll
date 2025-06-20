import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  MapPin,
  PlusCircle,
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  Truck,
  CalendarDays,
  ListChecks,
  Clock
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DatePicker } from '@/components/ui/date-picker'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SimplifiedDelivery {
  id: string
  address: string
}

interface SimplifiedDriver {
  id: string
  name: string
}

export type RouteStatus = "Planejada" | "Em Andamento" | "Concluída" | "Cancelada"

export interface Route {
  id: string
  name: string
  driverId?: string 
  deliveries: string[] 
  status: RouteStatus
  plannedDate: Date
  estimatedDuration?: string
  totalDistance?: string
  startLocation: string
  endLocation: string
  notes?: string
  createdAt: Date
  progress?: number 
}

const mockDriversForRoutes: SimplifiedDriver[] = [
  { id: "DRV001", name: "Carlos Alberto" },
  { id: "DRV002", name: "Fernanda Lima" },
  { id: "DRV003", name: "Ricardo Souza" },
]

const mockDeliveriesForRoutes: SimplifiedDelivery[] = [
  { id: "DEL001", address: "Rua das Palmeiras, 123" },
  { id: "DEL002", address: "Av. Central, 456" },
  { id: "DEL003", address: "Praça da Sé, 789" },
  { id: "DEL004", address: "Rodovia BR-101, Km 50" },
  { id: "DEL005", address: "Rua das Acácias, 321" },
]

const mockRoutes: Route[] = [
  {
    id: "ROT001",
    name: "Rota Centro - Manhã",
    driverId: "DRV001",
    deliveries: ["DEL001", "DEL003"],
    status: "Em Andamento",
    plannedDate: new Date(2024, 6, 28),
    estimatedDuration: "3h 15m",
    totalDistance: "42 km",
    startLocation: "Depósito Central",
    endLocation: "Região Central",
    notes: "Priorizar entrega DEL001.",
    createdAt: new Date(2024, 6, 27),
    progress: 60,
  },
  {
    id: "ROT002",
    name: "Rota Zona Sul - Tarde",
    driverId: "DRV002",
    deliveries: ["DEL002", "DEL004", "DEL005"],
    status: "Planejada",
    plannedDate: new Date(2024, 6, 28),
    estimatedDuration: "4h 00m",
    totalDistance: "65 km",
    startLocation: "Depósito Zona Sul",
    endLocation: "Bairros da Zona Sul",
    createdAt: new Date(2024, 6, 27),
  },
  {
    id: "ROT003",
    name: "Rota Urgente - Noite",
    deliveries: ["DEL005"],
    status: "Concluída",
    plannedDate: new Date(2024, 6, 27),
    estimatedDuration: "1h 30m",
    totalDistance: "22 km",
    startLocation: "Depósito Central",
    endLocation: "Cliente VIP",
    driverId: "DRV001",
    createdAt: new Date(2024, 6, 26),
    progress: 100,
  },
]

const routeStatusColors: Record<RouteStatus, string> = {
  Planejada: "bg-blue-100 text-blue-800 border-blue-300",
  "Em Andamento": "bg-orange-100 text-orange-800 border-orange-300",
  Concluída: "bg-green-100 text-green-800 border-green-300",
  Cancelada: "bg-gray-100 text-gray-800 border-gray-300",
}

const RouteManagement = () => {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<RouteStatus | "all">("all")
  const [driverFilter, setDriverFilter] = useState<string | "all">("all")

  const [newRoute, setNewRoute] = useState<Partial<Route>>({
    name: '',
    status: 'Planejada',
    plannedDate: new Date(),
    deliveries: [],
    startLocation: 'Depósito Central',
    endLocation: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)

  console.log("RouteManagement: isModalOpen state", isModalOpen);

  const handleInputChange = (field: keyof Route, value: string | Date | RouteStatus | string[]) => {
    setNewRoute(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveRoute = () => {
    if (!newRoute.name || !newRoute.plannedDate || (newRoute.deliveries && newRoute.deliveries.length === 0) || !newRoute.startLocation || !newRoute.endLocation) {
      toast.error("Preencha todos os campos obrigatórios (Nome, Data, Entregas, Partida, Destino).")
      return
    }

    if (editingRoute) {
      setRoutes(prev => prev.map(r => r.id === editingRoute.id ? { ...editingRoute, ...newRoute } as Route : r))
      toast.success(`Rota ${newRoute.name} atualizada com sucesso!`)
    } else {
      const newId = `ROT${String(routes.length + 1).padStart(3, '0')}`
      const routeToAdd: Route = {
        ...newRoute,
        id: newId,
        createdAt: new Date(),
      } as Route
      setRoutes(prev => [routeToAdd, ...prev])
      toast.success(`Rota ${newRoute.name} adicionada com sucesso!`)
    }
    setIsModalOpen(false)
    console.log("RouteManagement: closeModal called, setting isModalOpen to false");
    setEditingRoute(null)
  }

  const openModalForEdit = (route: Route) => {
    setEditingRoute(route)
    setNewRoute(route)
    setIsModalOpen(true)
    console.log("RouteManagement: openModalForEdit called, setting isModalOpen to true");
  }

  const openModalForNew = () => {
    setEditingRoute(null)
    setNewRoute({
      name: '',
      status: 'Planejada',
      plannedDate: new Date(),
      deliveries: [],
      startLocation: 'Depósito Central',
      endLocation: '',
    })
    setIsModalOpen(true)
    console.log("RouteManagement: openModalForNew called, setting isModalOpen to true");
  }

  const closeModal = () => {
    setIsModalOpen(false)
    console.log("RouteManagement: closeModal called, setting isModalOpen to false");
    setEditingRoute(null)
  }

  const filteredRoutes = useMemo(() => {
    return routes
      .filter(route => 
        statusFilter === "all" || route.status === statusFilter
      )
      .filter(route => 
        driverFilter === "all" || route.driverId === driverFilter
      )
      .filter(route => 
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (route.driverId && mockDriversForRoutes.find(d => d.id === route.driverId)?.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  }, [routes, searchTerm, statusFilter, driverFilter])

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <MapPin className="h-7 w-7 text-green-600" />
            <h1 className="text-3xl font-bold">Gestão de Rotas</h1>
          </div>
          <Button 
            onClick={openModalForNew}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Rota
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros de Rotas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar por ID, nome da rota, motorista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={(value: RouteStatus | "all") => setStatusFilter(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Status da Rota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  {(Object.keys(routeStatusColors) as RouteStatus[]).map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={driverFilter} onValueChange={(value: string | "all") => setDriverFilter(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Truck className="mr-2 h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Motorista" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>Não atribuído</SelectItem>
                  {mockDriversForRoutes.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Routes Display - Using Cards for a more visual approach */}
        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route) => (
              <Card key={route.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <CardDescription>ID: {route.id}</CardDescription>
                    </div>
                    <Badge variant="outline" className={`${routeStatusColors[route.status]} text-xs`}>
                      {route.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-gray-400" />
                      Motorista: {route.driverId ? mockDriversForRoutes.find(d=>d.id === route.driverId)?.name : "Não atribuído"}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                      Data: {route.plannedDate.toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <ListChecks className="h-4 w-4 mr-2 text-gray-400" />
                      Entregas: {route.deliveries.length}
                    </div>
                    {route.estimatedDuration && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        Duração: {route.estimatedDuration}
                      </div>
                    )}
                  </div>
                  {route.status === "Em Andamento" && route.progress !== undefined && (
                    <div>
                      <Label className="text-xs text-gray-500">Progresso</Label>
                      <Progress value={route.progress} className="h-2 mt-1" />
                    </div>
                  )}
                </CardContent>
                <DialogFooter className="p-4 border-t mt-auto">
                  <Button variant="ghost" size="sm" onClick={() => toast.info(`Visualizar ${route.name}`)}>
                    <Eye className="mr-2 h-4 w-4" /> Detalhes
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openModalForEdit(route)}>
                    <Edit2 className="mr-2 h-4 w-4" /> Editar
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-700 focus:bg-red-50"
                        onClick={() => {
                          setRoutes(prev => prev.filter(r => r.id !== route.id))
                          toast.success(`Rota ${route.name} removida.`)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DialogFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="h-40 flex items-center justify-center">
              <p className="text-gray-500">Nenhuma rota encontrada com os filtros aplicados.</p>
            </CardContent>
          </Card>
        )}
      </div>

      { /* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRoute ? "Editar Rota" : "Adicionar Nova Rota"}</DialogTitle>
            <DialogDescription>
              {editingRoute ? "Atualize os dados da rota." : "Preencha os detalhes da nova rota."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="routeName">Nome da Rota</Label>
              <Input id="routeName" value={newRoute.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Ex: Rota Centro - Manhã" />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="plannedDate">Data Planejada</Label>
              <DatePicker date={newRoute.plannedDate} setDate={(date) => handleInputChange('plannedDate', date || new Date())} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="routeStatus">Status</Label>
              <Select value={newRoute.status} onValueChange={(value: RouteStatus) => handleInputChange('status', value)}>
                <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(routeStatusColors) as RouteStatus[]).map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="driverId">Motorista</Label>
              <Select value={newRoute.driverId} onValueChange={(value: string) => handleInputChange('driverId', value)}>
                <SelectTrigger><SelectValue placeholder="Atribuir motorista (opcional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>Não atribuído</SelectItem>
                  {mockDriversForRoutes.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="estimatedDuration">Duração Estimada</Label>
              <Input id="estimatedDuration" value={newRoute.estimatedDuration} onChange={(e) => handleInputChange('estimatedDuration', e.target.value)} placeholder="Ex: 2h 30m (opcional)" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="totalDistance">Distância Total</Label>
              <Input id="totalDistance" value={newRoute.totalDistance} onChange={(e) => handleInputChange('totalDistance', e.target.value)} placeholder="Ex: 55 km (opcional)" />
            </div>

            {newRoute.status === "Em Andamento" && (
              <div className="space-y-1">
                <Label htmlFor="progress">Progresso (%)</Label>
                <Input id="progress" type="number" min="0" max="100" value={newRoute.progress || 0} onChange={(e) => handleInputChange('progress', parseInt(e.target.value))} />
              </div>
            )}

            <div className="space-y-1 md:col-span-2">
              <Label>Entregas na Rota</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 border rounded-md max-h-40 overflow-y-auto">
                {mockDeliveriesForRoutes.map(del => (
                  <div key={del.id} className="flex items-center space-x-2 p-1.5 rounded hover:bg-gray-100 text-xs">
                    <input 
                      type="checkbox" 
                      id={`del-${del.id}`} 
                      checked={newRoute.deliveries?.includes(del.id)}
                      onChange={(e) => {
                        const currentDeliveries = newRoute.deliveries || []
                        if (e.target.checked) {
                          handleInputChange('deliveries', [...currentDeliveries, del.id])
                        } else {
                          handleInputChange('deliveries', currentDeliveries.filter(id => id !== del.id))
                        }
                      }}
                      className="form-checkbox h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`del-${del.id}`} className="truncate cursor-pointer" title={del.address}>{del.address}</label>
                  </div>
                ))}
              </div>
              {newRoute.deliveries?.length === 0 && <p className="text-xs text-red-500 mt-1">Selecione ao menos uma entrega.</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="startLocation">Local de Partida</Label>
              <Input id="startLocation" value={newRoute.startLocation} onChange={(e) => handleInputChange('startLocation', e.target.value)} placeholder="Endereço de partida" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="endLocation">Destino Principal/Região</Label>
              <Input id="endLocation" value={newRoute.endLocation} onChange={(e) => handleInputChange('endLocation', e.target.value)} placeholder="Região de destino" />
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="routeNotes">Notas da Rota</Label>
              <Textarea id="routeNotes" value={newRoute.notes} onChange={(e) => handleInputChange('notes', e.target.value)} placeholder="Observações adicionais (opcional)" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
            <Button type="button" onClick={handleSaveRoute}>Salvar Rota</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RouteManagement