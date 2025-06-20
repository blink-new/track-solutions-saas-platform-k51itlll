import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Truck,
  LayoutDashboard,
  Package,
  MapPin,
  Users,
  Building2,
  Settings,
  HelpCircle,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User
} from 'lucide-react'

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [notifications] = useState(3)

  const getMenuItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Entregas",
        url: "/entregas",
        icon: Package,
      },
      {
        title: "Rotas",
        url: "/rotas",
        icon: MapPin,
      }
    ]

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        {
          title: "Entregadores",
          url: "/entregadores",
          icon: Users,
        },
        {
          title: "Transportadoras",
          url: "/transportadoras",
          icon: Building2,
        }
      ]
    }

    if (user?.role === 'transport_company') {
      return [
        ...baseItems,
        {
          title: "Entregadores",
          url: "/entregadores",
          icon: Users,
        }
      ]
    }

    return baseItems
  }

  const supportItems = [
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: Settings,
    },
    {
      title: "Ajuda",
      url: "/ajuda",
      icon: HelpCircle,
    }
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleBadge = () => {
    const roleLabels = {
      admin: { label: 'Administrador', variant: 'default' as const },
      transport_company: { label: 'Transportadora', variant: 'secondary' as const },
      driver: { label: 'Entregador', variant: 'outline' as const }
    }
    
    return roleLabels[user?.role || 'driver']
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-sidebar-foreground">Track Solutions</span>
                <Badge variant={getRoleBadge().variant} className="text-xs w-fit">
                  {getRoleBadge().label}
                </Badge>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {getMenuItems().map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        isActive={location.pathname === item.url}
                      >
                        <a href={item.url} onClick={(e) => {
                          e.preventDefault()
                          navigate(item.url)
                        }}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Suporte</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {supportItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        isActive={location.pathname === item.url}
                      >
                        <a href={item.url} onClick={(e) => {
                          e.preventDefault()
                          navigate(item.url)
                        }}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user?.avatar_url} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-sm font-medium truncate w-full text-left">
                      {user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full text-left">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-white flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout