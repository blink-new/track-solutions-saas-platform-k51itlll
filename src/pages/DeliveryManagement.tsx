// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DashboardLayout from '@/components/DashboardLayout'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/ui/date-picker'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  FileDown,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type DeliveryStatus = "Pendente" | "Em Rota" | "Entregue" | "Atrasada" | "Cancelada"

export interface Delivery {
  id: string
  customerName: string
  address: string
  status: DeliveryStatus
  driver?: string // Driver ID or name
  deliveryDate: Date
  items: string // Simple string for items for now
  notes?: string
  createdAt: Date
}

const mockDeliveries: Delivery[] = [
  {
    id: "DEL001",
    customerName: "Empresa Alpha",
    address: "Rua das Palmeiras, 123, São Paulo, SP",
    status: "Em Rota",
    driver: "João Silva",
    deliveryDate: new Date(2024, 6, 25),
    items: "Caixa de eletrônicos",
    notes: "Entregar no 3º andar",
    createdAt: new Date(2024, 6, 20)
  },
  {
    id: "DEL002",
    customerName: "Cliente Beta",
    address: "Av. Central, 456, Rio de Janeiro, RJ",
    status: "Pendente",
    deliveryDate: new Date(2024, 6, 26),
    items: "Documentos importantes",
    createdAt: new Date(2024, 6, 21)
  },
  {
    id: "DEL003",
    customerName: "Loja Gama",
    address: "Praça da Sé, 789, Salvador, BA",
    status: "Entregue",
    driver: "Maria Oliveira",
    deliveryDate: new Date(2024, 6, 22),
    items: "Material de escritório",
    createdAt: new Date(2024, 6, 18)
  },
  {
    id: "DEL004",
    customerName: "Indústria Delta",
    address: "Rodovia BR-101, Km 50, Curitiba, PR",
    status: "Atrasada",
    driver: "Carlos Pereira",
    deliveryDate: new Date(2024, 6, 20),
    items: "Peças de reposição",
    notes: "Cliente ausente na primeira tentativa",
    createdAt: new Date(2024, 6, 15)
  },
]

const statusColors: Record<DeliveryStatus, string> = {
  Pendente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Em Rota": "bg-blue-100 text-blue-800 border-blue-300",
  Entregue: "bg-green-100 text-green-800 border-green-300",
  Atrasada: "bg-red-100 text-red-800 border-red-300",
  Cancelada: "bg-gray-100 text-gray-800 border-gray-300",
}

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)

  const [newDelivery, setNewDelivery] = useState<Partial<Delivery>>({
    customerName: '',
    address: '',
    items: '',
    notes: '',
    status: 'Pendente',
    deliveryDate: new Date(),
  })

  const handleInputChange = (field: keyof Delivery, value: string | Date | DeliveryStatus) => {
    setNewDelivery(prev => ({ ...prev, [field]: value }))
  }

  const handleAddDelivery = () => {
    if (!newDelivery.customerName || !newDelivery.address || !newDelivery.items || !newDelivery.deliveryDate) {
      toast.error("Preencha todos os campos obrigatórios.")
      return
    }
    const newId = `DEL${String(deliveries.length + 1).padStart(3, '0')}`
    const deliveryToAdd: Delivery = {
      ...newDelivery,
      id: newId,
      createdAt: new Date(),
    } as Delivery // Cast because newDelivery is Partial<Delivery>
    
    setDeliveries(prev => [deliveryToAdd, ...prev])
    toast.success(`Entrega ${newId} adicionada com sucesso!`)
    // Reset form - ideally DialogClose would trigger this, or a ref to close it
    setNewDelivery({
      customerName: '',
      address: '',
      items: '',
      notes: '',
      status: 'Pendente',
      deliveryDate: new Date(),
    })
    // Manually close dialog if possible, or rely on DialogClose component
    // document.getElementById('close-dialog-button')?.click(); // This is a hack, prefer controlled dialog
  }

  const filteredDeliveries = useMemo(() => {
    return deliveries
      .filter(delivery => 
        statusFilter === "all" || delivery.status === statusFilter
      )
      .filter(delivery => 
        !dateFilter || new Date(delivery.deliveryDate).toDateString() === new Date(dateFilter).toDateString()
      )
      .filter(delivery => 
        delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (delivery.driver && delivery.driver.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  }, [deliveries, searchTerm, statusFilter, dateFilter])

  const exportData = () => {
    const csvContent = [
      ["ID", "Cliente", "Endereço", "Status", "Motorista", "Data Entrega", "Itens", "Notas", "Criado Em"].join(","),
      ...filteredDeliveries.map(d => [
        d.id,
        `"${d.customerName}"`,
        `"${d.address}"`,
        d.status,
        d.driver || 'N/A',
        d.deliveryDate.toLocaleDateString('pt-BR'),
        `"${d.items}"`,
        `"${d.notes || ''}"`,
        d.createdAt.toLocaleDateString('pt-BR')
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "entregas.csv")
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success("Dados exportados para CSV!")
    } else {
      toast.error("Seu navegador não suporta a exportação automática.")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Package className="h-7 w-7 text-blue-600" />
          <h1 className="text-3xl font-bold">Gestão de Entregas</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportData}>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Entrega
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Entrega</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da nova entrega.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerName" className="text-right">
                    Cliente
                  </Label>
                  <Input id="customerName" value={newDelivery.customerName} onChange={(e) => handleInputChange('customerName', e.target.value)} className="col-span-3" placeholder="Nome do Cliente" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Endereço
                  </Label>
                  <Textarea id="address" value={newDelivery.address} onChange={(e) => handleInputChange('address', e.target.value)} className="col-span-3" placeholder="Endereço completo" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="items" className="text-right">
                    Itens
                  </Label>
                  <Input id="items" value={newDelivery.items} onChange={(e) => handleInputChange('items', e.target.value)} className="col-span-3" placeholder="Descrição dos itens" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deliveryDate" className="text-right">
                    Data Entrega
                  </Label>
                  <DatePicker date={newDelivery.deliveryDate} setDate={(date) => handleInputChange('deliveryDate', date || new Date())} placeholder="Selecione a data" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={newDelivery.status} onValueChange={(value: DeliveryStatus) => handleInputChange('status', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(statusColors) as DeliveryStatus[]).map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notas
                  </Label>
                  <Textarea id="notes" value={newDelivery.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className="col-span-3" placeholder="Observações adicionais (opcional)" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                   <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="button" onClick={() => { handleAddDelivery(); /* Consider DialogClose here */ }}>Salvar Entrega</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Buscar por ID, cliente, endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={(value: DeliveryStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                {(Object.keys(statusColors) as DeliveryStatus[]).map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DatePicker date={dateFilter} setDate={setDateFilter} placeholder="Filtrar por data" className="w-full md:w-auto" />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Entregas</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <TableHeader className="sr-only">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Motorista</TableHead>
              <TableHead>Data Entrega</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead>Data Entrega</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>{delivery.customerName}</TableCell>
                    <TableCell className="max-w-xs truncate">{delivery.address}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${statusColors[delivery.status]} text-xs`}>
                        {delivery.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{delivery.driver || "N/A"}</TableCell>
                    <TableCell>{delivery.deliveryDate.toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Visualizar ${delivery.id}`)}>
                            <Eye className="mr-2 h-4 w-4" /> Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editar ${delivery.id}`)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-700 focus:bg-red-50"
                            onClick={() => {
                              setDeliveries(prev => prev.filter(d => d.id !== delivery.id))
                              toast.success(`Entrega ${delivery.id} removida.`)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhuma entrega encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default DeliveryManagement