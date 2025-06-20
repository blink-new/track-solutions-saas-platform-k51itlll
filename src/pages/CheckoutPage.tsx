import { useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'starter';
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <Card className="max-w-md w-full shadow-xl border-0">
        <CardHeader className="flex flex-col items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="self-start mb-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
          </Button>
          <CardTitle className="text-2xl font-bold mb-2">Checkout do Plano</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4 text-lg">Você está contratando o plano <span className="font-semibold capitalize">{plan}</span>.</div>
          <div className="mb-6 text-gray-500">(Integração Stripe será implementada aqui)</div>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" disabled>
            Finalizar Pagamento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
