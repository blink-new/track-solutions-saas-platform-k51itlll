import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Users,
  PlusCircle,
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  Phone,
  Mail,
  Truck
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export type DriverStatus = "Ativo" | "Inativo" | "Férias";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: DriverStatus;
  vehicle: string; 
  companyId?: string; 
  avatarUrl?: string;
  deliveriesCompleted: number;
  averageRating: number; 
  createdAt: Date;
}

const mockDrivers: Driver[] = [
  {
    id: "DRV001",
    name: "Carlos Alberto",
    phone: "(11) 98765-4321",
    email: "carlos.alberto@example.com",
    status: "Ativo",
    vehicle: "Moto Honda CG 160 - XYZ1234",
    companyId: "COMP001",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    deliveriesCompleted: 125,
    averageRating: 4.8,
    createdAt: new Date(2023, 0, 15)
  },
  {
    id: "DRV002",
    name: "Fernanda Lima",
    phone: "(21) 91234-5678",
    email: "fernanda.lima@example.com",
    status: "Inativo",
    vehicle: "Van Fiat Ducato - ABC5678",
    companyId: "COMP002",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    deliveriesCompleted: 88,
    averageRating: 4.5,
    createdAt: new Date(2023, 2, 10)
  },
  {
    id: "DRV003",
    name: "Ricardo Souza",
    phone: "(31) 99999-8888",
    email: "ricardo.souza@example.com",
    status: "Férias",
    vehicle: "Carro Fiat Strada - DEF9012",
    companyId: "COMP001",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    deliveriesCompleted: 210,
    averageRating: 4.9,
    createdAt: new Date(2022, 10, 5)
  },
];

const statusColors: Record<DriverStatus, string> = {
  Ativo: "bg-green-100 text-green-800 border-green-300",
  Inativo: "bg-red-100 text-red-800 border-red-300",
  Férias: "bg-blue-100 text-blue-800 border-blue-300",
};

const DriverManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverStatus | "all">("all");

  const [newDriver, setNewDriver] = useState<Partial<Driver>>({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    status: 'Ativo',
    deliveriesCompleted: 0,
    averageRating: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const handleInputChange = (field: keyof Driver, value: string | number | DriverStatus) => {
    setNewDriver(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDriver = () => {
    if (!newDriver.name || !newDriver.email || !newDriver.phone || !newDriver.vehicle) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (editingDriver) {
      setDrivers(prev => prev.map(d => d.id === editingDriver.id ? { ...editingDriver, ...newDriver } as Driver : d));
      toast.success(`Motorista ${newDriver.name} atualizado com sucesso!`);
    } else {
      const newId = `DRV${String(drivers.length + 1).padStart(3, '0')}`;
      const driverToAdd: Driver = {
        ...newDriver,
        id: newId,
        createdAt: new Date(),
      } as Driver;
      setDrivers(prev => [driverToAdd, ...prev]);
      toast.success(`Motorista ${newDriver.name} adicionado com sucesso!`);
    }
    closeModal();
  };

  const openModalForEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setNewDriver(driver);
    setIsModalOpen(true);
  };

  const openModalForNew = () => {
    setEditingDriver(null);
    setNewDriver({
      name: '',
      phone: '',
      email: '',
      vehicle: '',
      status: 'Ativo',
      deliveriesCompleted: 0,
      averageRating: 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDriver(null);
  };

  const filteredDrivers = useMemo(() => {
    return drivers
      .filter(driver => 
        statusFilter === "all" || driver.status === statusFilter
      )
      .filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm) ||
        driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [drivers, searchTerm, statusFilter]);

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Users className="h-7 w-7 text-purple-600" />
            <h1 className="text-3xl font-bold">Gestão de Entregadores</h1>
          </div>
          <Button 
            onClick={openModalForNew}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Entregador
          </Button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Buscar por ID, nome, email, telefone, veículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={(value: DriverStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                {(Object.keys(statusColors) as DriverStatus[]).map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]"></TableHead> {/* Avatar */}
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={driver.avatarUrl} alt={driver.name} />
                        <AvatarFallback>{driver.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> {driver.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> {driver.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-gray-400" />
                        {driver.vehicle}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${statusColors[driver.status]} text-xs`}>
                        {driver.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      <div>Entregas: {driver.deliveriesCompleted}</div>
                      <div>Avaliação: {driver.averageRating.toFixed(1)} ★</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Visualizar ${driver.name}`)}>
                            <Eye className="mr-2 h-4 w-4" /> Visualizar Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openModalForEdit(driver)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-700 focus:bg-red-50"
                            onClick={() => {
                              setDrivers(prev => prev.filter(d => d.id !== driver.id))
                              toast.success(`Motorista ${driver.name} removido.`)
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
                    Nenhum entregador encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingDriver ? "Editar Entregador" : "Adicionar Novo Entregador"}</DialogTitle>
              <DialogDescription>
                {editingDriver ? "Atualize os dados do entregador." : "Preencha os detalhes do novo entregador."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input id="name" value={newDriver.name} onChange={(e) => handleInputChange('name', e.target.value)} className="col-span-3" placeholder="Nome completo" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={newDriver.email} onChange={(e) => handleInputChange('email', e.target.value)} className="col-span-3" placeholder="email@example.com" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Telefone</Label>
                <Input id="phone" value={newDriver.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="col-span-3" placeholder="(XX) XXXXX-XXXX" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vehicle" className="text-right">Veículo</Label>
                <Input id="vehicle" value={newDriver.vehicle} onChange={(e) => handleInputChange('vehicle', e.target.value)} className="col-span-3" placeholder="Ex: Moto Honda CG - ABC1234" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={newDriver.status} onValueChange={(value: DriverStatus) => handleInputChange('status', value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(statusColors) as DriverStatus[]).map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avatarUrl" className="text-right">URL Avatar</Label>
                <Input id="avatarUrl" value={newDriver.avatarUrl} onChange={(e) => handleInputChange('avatarUrl', e.target.value)} className="col-span-3" placeholder="https://url.to/image.png (opcional)" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
              <Button type="button" onClick={handleSaveDriver}>Salvar Entregador</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DriverManagement;
