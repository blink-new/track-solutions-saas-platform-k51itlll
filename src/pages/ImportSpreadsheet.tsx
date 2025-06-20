import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileDown, Upload, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

const ImportSpreadsheet = () => {
  const navigate = useNavigate()
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  const handleDownloadTemplate = () => {
    const csvContent = "customerName,address,deliveryDate,items,notes,driverId,status\n"
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'template_entregas.csv'
    link.click()
    URL.revokeObjectURL(link.href)
    toast.success('Template CSV baixado com sucesso!')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name)
      toast.info(`Arquivo selecionado: ${file.name}. Validação e importação serão implementadas.`)
      // Aqui você pode implementar a lógica de validação e importação
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/entregas')}>
          <ArrowLeft className="w-5 h-5" /> Voltar para Entregas
        </Button>
        <h1 className="text-3xl font-bold">Importar Planilha</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Importar Entregas em Lote</CardTitle>
          <CardDescription>
            Baixe o template CSV, preencha com seus dados seguindo o formato especificado e faça o upload.
            O sistema validará os dados e importará as entregas automaticamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="mb-2 block">1. Baixe o Template CSV</Label>
            <Button variant="outline" onClick={handleDownloadTemplate}>
              <FileDown className="mr-2 h-5 w-5" /> Baixar Template
            </Button>
          </div>

          <div>
            <Label className="mb-2 block" htmlFor="file-upload">2. Faça o Upload da Planilha Preenchida</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
              />
              <Button disabled>
                <Upload className="mr-2 h-5 w-5" /> Upload
              </Button>
            </div>
            {selectedFileName && (
              <p className="mt-2 text-sm text-gray-700">
                Arquivo selecionado: <span className="font-medium">{selectedFileName}</span>
              </p>
            )}
          </div>

          {/* Placeholder para mensagens de validação e importação */}
          <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md text-gray-600">
            Resultados da validação aparecerão aqui.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImportSpreadsheet
