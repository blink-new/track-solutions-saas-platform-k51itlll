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
  Building2,
  PlusCircle,
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  MapPin as MapPinIcon 
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export type CompanyStatus = "Ativa" | "Inativa" | "Pendente";

export interface TransportCompany {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  status: CompanyStatus;
  logoUrl?: string;
  responsibleName: string;
  driverCount: number;
  activeRoutes: number;
  createdAt: Date;
}

const mockCompanies: TransportCompany[] = [
  {
    id: "COMP001",
    name: "Logística Rápida Ltda.",
    cnpj: "12.345.678/0001-99",
    email: "contato@logisticarapida.com.br",
    phone: "(11) 3333-4444",
    address: "Rua das Indústrias, 500",
    city: "São Paulo",
    state: "SP",
    status: "Ativa",
    logoUrl: "https://logo.clearbit.com/uber.com",
    responsibleName: "Ana Pereira",
    driverCount: 15,
    activeRoutes: 8,
    createdAt: new Date(2022, 0, 10)
  },
  {
    id: "COMP002",
    name: "Transportes Veloz S.A.",
    cnpj: "98.765.432/0001-11",
    email: "adm@veloztrans.com",
    phone: "(21) 2222-1111",
    address: "Av. Brasil, 15000",
    city: "Rio de Janeiro",
    state: "RJ",
    status: "Pendente",
    logoUrl: "https://logo.clearbit.com/lyft.com",
    responsibleName: "Marcos Rocha",
    driverCount: 8,
    activeRoutes: 3,
    createdAt: new Date(2023, 5, 20)
  },
  {
    id: "COMP003",
    name: "Cargas Sul Transportadora",
    cnpj: "55.444.333/0001-22",
    email: "financeiro@cargassul.com",
    phone: "(51) 3030-2020",
    address: "Rodovia RS-118, Km 10",
    city: "Porto Alegre",
    state: "RS",
    status: "Inativa",
    responsibleName: "Juliana Costa",
    driverCount: 22,
    activeRoutes: 0,
    createdAt: new Date(2021, 8, 1)
  },
];

const companyStatusColors: Record<CompanyStatus, string> = {
  Ativa: "bg-green-100 text-green-800 border-green-300",
  Inativa: "bg-red-100 text-red-800 border-red-300",
  Pendente: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

const CompanyManagement = () => {
  const [companies, setCompanies] = useState<TransportCompany[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CompanyStatus | "all">("all");
  const [stateFilter, setStateFilter] = useState<string | "all">("all");

  const [newCompany, setNewCompany] = useState<Partial<TransportCompany>>({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    responsibleName: '',
    status: 'Ativa',
    driverCount: 0,
    activeRoutes: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<TransportCompany | null>(null);

  const handleInputChange = (field: keyof TransportCompany, value: string | number | CompanyStatus) => {
    setNewCompany(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCompany = () => {
    if (!newCompany.name || !newCompany.cnpj || !newCompany.email || !newCompany.phone || !newCompany.address || !newCompany.city || !newCompany.state || !newCompany.responsibleName) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(newCompany.cnpj || '')) {
      toast.error("Formato de CNPJ inválido. Use XX.XXX.XXX/XXXX-XX.");
      return;
    }

    if (editingCompany) {
      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? { ...editingCompany, ...newCompany } as TransportCompany : c));
      toast.success(`Transportadora ${newCompany.name} atualizada com sucesso!`);
    } else {
      const newId = `COMP${String(companies.length + 1).padStart(3, '0')}`;
      const companyToAdd: TransportCompany = {
        ...newCompany,
        id: newId,
        createdAt: new Date(),
      } as TransportCompany;
      setCompanies(prev => [companyToAdd, ...prev]);
      toast.success(`Transportadora ${newCompany.name} adicionada com sucesso!`);
    }
    closeModal();
  };

  const openModalForEdit = (company: TransportCompany) => {
    setEditingCompany(company);
    setNewCompany(company);
    setIsModalOpen(true);
  };

  const openModalForNew = () => {
    setEditingCompany(null);
    setNewCompany({
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      responsibleName: '',
      status: 'Ativa',
      driverCount: 0,
      activeRoutes: 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const brazilianStates = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
    "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", 
    "SC", "SP", "SE", "TO"
  ];

  const filteredCompanies = useMemo(() => {
    return companies
      .filter(company => 
        statusFilter === "all" || company.status === statusFilter
      )
      .filter(company => 
        stateFilter === "all" || company.state === stateFilter
      )
      .filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.cnpj.includes(searchTerm) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.responsibleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [companies, searchTerm, statusFilter, stateFilter]);

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Building2 className="h-7 w-7 text-orange-600" />
            <h1 className="text-3xl font-bold">Gestão de Transportadoras</h1>
          </div>
          <Button 
            onClick={openModalForNew}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Transportadora
          </Button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Buscar por ID, nome, CNPJ, email, cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={(value: CompanyStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                {(Object.keys(companyStatusColors) as CompanyStatus[]).map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stateFilter} onValueChange={(value: string | "all") => setStateFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <MapPinIcon className="mr-2 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Estado (UF)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Estados</SelectItem>
                {brazilianStates.map(uf => (
                  <SelectItem key={uf} value={uf}>{uf}</SelectItem>
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
                <TableHead className="w-[80px]"></TableHead> {/* Logo */}
                <TableHead>Nome da Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage src={company.logoUrl} alt={company.name} />
                        <AvatarFallback className="rounded-md bg-gray-200">
                          <Building2 className="h-5 w-5 text-gray-500" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{company.cnpj}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {company.city}, {company.state}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${companyStatusColors[company.status]} text-xs`}>
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{company.responsibleName}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Visualizar ${company.name}`)}>
                            <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openModalForEdit(company)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-700 focus:bg-red-50"
                            onClick={() => {
                              setCompanies(prev => prev.filter(c => c.id !== company.id))
                              toast.success(`Transportadora ${company.name} removida.`)
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
                    Nenhuma transportadora encontrada.
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
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCompany ? "Editar Transportadora" : "Adicionar Nova Transportadora"}</DialogTitle>
              <DialogDescription>
                {editingCompany ? "Atualize os dados da transportadora." : "Preencha os detalhes da nova transportadora."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Empresa</Label>
                <Input id="name" value={newCompany.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Nome Fantasia Ltda." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" value={newCompany.cnpj} onChange={(e) => handleInputChange('cnpj', e.target.value)} placeholder="XX.XXX.XXX/XXXX-XX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email de Contato</Label>
                <Input id="email" type="email" value={newCompany.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="contato@empresa.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" value={newCompany.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="(XX) XXXX-XXXX" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" value={newCompany.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Rua, Número, Bairro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" value={newCompany.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="Nome da Cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado (UF)</Label>
                <Select value={newCompany.state} onValueChange={(value: string) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map(uf => (
                      <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsibleName">Nome do Responsável</Label>
                <Input id="responsibleName" value={newCompany.responsibleName} onChange={(e) => handleInputChange('responsibleName', e.target.value)} placeholder="Nome completo do responsável" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newCompany.status} onValueChange={(value: CompanyStatus) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(companyStatusColors) as CompanyStatus[]).map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="logoUrl">URL do Logo</Label>
                <Input id="logoUrl" value={newCompany.logoUrl} onChange={(e) => handleInputChange('logoUrl', e.target.value)} placeholder="https://url.to/logo.png (opcional)" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
              <Button type="button" onClick={handleSaveCompany}>Salvar Transportadora</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CompanyManagement;
