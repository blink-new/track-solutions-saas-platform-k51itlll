import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings as SettingsIcon } from 'lucide-react'

const Settings = () => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <SettingsIcon className="h-6 w-6 text-gray-600" />
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Esta página estará disponível em breve com configurações de conta e sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings