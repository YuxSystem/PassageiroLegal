
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, PlaneTakeoff, PlaneLanding, ArrowRight, Loader2, ArrowLeft, UserPlus, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/hooks/use-toast";

// Sample flight data
const SAMPLE_FLIGHTS = [
  { id: 'fl1', number: 'LA3476', departure: '07:15', arrival: '09:05', from: 'GRU', to: 'GIG' },
  { id: 'fl2', number: 'LA3512', departure: '10:30', arrival: '12:15', from: 'GRU', to: 'GIG' },
  { id: 'fl3', number: 'LA3498', departure: '13:45', arrival: '15:30', from: 'GRU', to: 'GIG' },
  { id: 'fl4', number: 'LA3520', departure: '17:20', arrival: '19:05', from: 'GRU', to: 'GIG' },
];

// Airlines
const AIRLINES = [
  { value: 'latam', label: 'LATAM' },
  { value: 'gol', label: 'GOL' },
  { value: 'azul', label: 'Azul' },
  { value: 'tam', label: 'TAM' },
  { value: 'avianca', label: 'Avianca' },
  { value: 'tap', label: 'TAP Portugal' },
  { value: 'american', label: 'American Airlines' },
];

const ClaimForm = () => {
  // const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const [formData, setFormData] = useState({
    flightNumber: '',
    airline: '',
    flightId: '',
    problem: '',
    voluntaryGaveUpSeat: '',
    travelingWithOthers: 'no',
    companions: [{ name: '', email: '' }],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    hasCPF: 'yes',
    cpf: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  // Update progress whenever step changes
  useEffect(() => {
    const totalSteps = 7;
    const progressValue = ((currentStep - 1) / totalSteps) * 100;
    setProgress(progressValue);
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleAddCompanion = () => {
    setFormData(prev => ({
      ...prev,
      companions: [...prev.companions, { name: '', email: '' }]
    }));
  };

  const handleCompanionChange = (index: number, field: string, value: string) => {
    const updatedCompanions = [...formData.companions];
    updatedCompanions[index] = { ...updatedCompanions[index], [field]: value };
    setFormData(prev => ({ ...prev, companions: updatedCompanions }));
  };

  const handleRemoveCompanion = (index: number) => {
    const updatedCompanions = formData.companions.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, companions: updatedCompanions }));
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(prev => prev + 1);
    }, 500);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validating if the user has accepted terms and privacy policy
    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      // toast({
      //   title: "Erro",
      //   description: "Você precisa aceitar os termos e a política de privacidade para continuar.",
      //   variant: "destructive",
      // });
      setLoading(false);
      return;
    }

    // Simulation of form submission
    setTimeout(() => {
      setLoading(false);
      // toast({
      //   title: "Solicitação enviada com sucesso!",
      //   description: "Analisaremos seu caso e entraremos em contato em breve.",
      // });
      // Reset form
      setCurrentStep(1);
      setFormData({
        flightNumber: '',
        airline: '',
        flightId: '',
        problem: '',
        voluntaryGaveUpSeat: '',
        travelingWithOthers: 'no',
        companions: [{ name: '', email: '' }],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        hasCPF: 'yes',
        cpf: '',
        acceptTerms: false,
        acceptPrivacy: false,
      });
      setDate(undefined);
    }, 1500);
  };

  const navButtonStyles = "sm:min-w-[120px]";

  return (
    <section id="claim-form" className="section bg-sky-50 py-16">
      <div className="page-container">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Verificação de Elegibilidade</h2>
          <p className="text-lg text-muted-foreground">
            Descubra se você tem direito a indenização pelo seu voo atrasado,
            cancelado ou com overbooking.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Progress bar and steps indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Verificação', 'Informações', 'Documentos', 'Finalização'].map((label, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1",
                      currentStep > (index + 1) * 2
                        ? "bg-green-500 text-white"
                        : currentStep >= (index + 1) * 2 - 1
                          ? "bg-sky-600 text-white"
                          : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {currentStep > (index + 1) * 2 ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={cn(
                    "text-xs hidden sm:block",
                    currentStep >= (index + 1) * 2 - 1 ? "text-sky-600 font-medium" : "text-muted-foreground"
                  )}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Initial verification */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Insira seu número de voo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="flightNumber">Número do Voo</Label>
                      <Input
                        id="flightNumber"
                        name="flightNumber"
                        value={formData.flightNumber}
                        onChange={handleInputChange}
                        placeholder="Ex: LA1234"
                        className="w-full"
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={cn("bg-sky-600 hover:bg-sky-700", navButtonStyles)}
                        disabled={!formData.flightNumber || loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Verificar Indenização
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Date of departure */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Data de Partida</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Qual era a data de partida?</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {date && (
                      <div className="space-y-2 animate-fade-in pt-4">
                        <Label htmlFor="airline">Com que companhia aérea você voou?</Label>
                        <Select
                          value={formData.airline}
                          onValueChange={(value) => handleSelectChange('airline', value)}
                        >
                          <SelectTrigger id="airline">
                            <SelectValue placeholder="Selecione a companhia" />
                          </SelectTrigger>
                          <SelectContent>
                            {AIRLINES.map((airline) => (
                              <SelectItem key={airline.value} value={airline.value}>
                                {airline.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className={navButtonStyles}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={cn("bg-sky-600 hover:bg-sky-700", navButtonStyles)}
                        disabled={!date || !formData.airline || loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Flight Selection */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Seleção do Voo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">A seguir, selecione seu voo na lista abaixo:</p>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Seleção</TableHead>
                            <TableHead>Número do Voo</TableHead>
                            <TableHead>Horário de Partida</TableHead>
                            <TableHead>Horário de Chegada</TableHead>
                            <TableHead>Rota</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {SAMPLE_FLIGHTS.map((flight) => (
                            <TableRow key={flight.id} className={formData.flightId === flight.id ? "bg-sky-50" : ""}>
                              <TableCell>
                                <RadioGroup
                                  value={formData.flightId}
                                  onValueChange={(value) => handleSelectChange('flightId', value)}
                                  className="flex"
                                >
                                  <RadioGroupItem value={flight.id} id={flight.id} />
                                </RadioGroup>
                              </TableCell>
                              <TableCell>{flight.number}</TableCell>
                              <TableCell>{flight.departure}</TableCell>
                              <TableCell>{flight.arrival}</TableCell>
                              <TableCell>{flight.from} → {flight.to}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <RadioGroup
                        value={formData.flightId}
                        onValueChange={(value) => handleSelectChange('flightId', value)}
                        className="flex"
                      >
                        <RadioGroupItem value="not-found" id="not-found" />
                      </RadioGroup>
                      <Label htmlFor="not-found" className="cursor-pointer">
                        Não consigo encontrar meu voo
                      </Label>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className={navButtonStyles}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={cn("bg-sky-600 hover:bg-sky-700", navButtonStyles)}
                        disabled={!formData.flightId || loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Flight Problem */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Problema com o Voo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Agora vamos falar sobre o problema com o voo em si. O que aconteceu de fato?</p>

                    <RadioGroup
                      value={formData.problem}
                      onValueChange={(value) => handleSelectChange('problem', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cancelled" id="cancelled" />
                        <Label htmlFor="cancelled" className="cursor-pointer">Meu voo foi cancelado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="denied-boarding" id="denied-boarding" />
                        <Label htmlFor="denied-boarding" className="cursor-pointer">Meu embarque foi negado (overbooking)</Label>
                      </div>
                    </RadioGroup>

                    {formData.problem === 'denied-boarding' && (
                      <div className="pt-4 pl-6 space-y-3 animate-fade-in">
                        <p className="text-sm text-muted-foreground">Você se ofereceu como voluntário para abrir mão do seu assento em troca de outros benefícios da companhia aérea?</p>

                        <RadioGroup
                          value={formData.voluntaryGaveUpSeat}
                          onValueChange={(value) => handleSelectChange('voluntaryGaveUpSeat', value)}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="voluntary-yes" />
                            <Label htmlFor="voluntary-yes" className="cursor-pointer">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="voluntary-no" />
                            <Label htmlFor="voluntary-no" className="cursor-pointer">Não</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className={navButtonStyles}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={cn("bg-sky-600 hover:bg-sky-700", navButtonStyles)}
                        disabled={!formData.problem || (formData.problem === 'denied-boarding' && !formData.voluntaryGaveUpSeat) || loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 5: Passenger Information */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Informações do Passageiro</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Seu sobrenome"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 98765-4321"
                      />
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className={navButtonStyles}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={cn("bg-sky-600 hover:bg-sky-700", navButtonStyles)}
                        disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 6: Travel Companions */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Companheiros de Viagem</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Seus companheiros de viagem também podem receber indenização. Você estava viajando com mais alguém?</p>

                    <RadioGroup
                      value={formData.travelingWithOthers}
                      onValueChange={(value) => handleSelectChange('travelingWithOthers', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="companions-yes" />
                        <Label htmlFor="companions-yes" className="cursor-pointer">Sim, eu estava viajando acompanhado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="companions-no" />
                        <Label htmlFor="companions-no" className="cursor-pointer">Não, estava viajando sem acompanhantes</Label>
                      </div>
                    </RadioGroup>

                    {formData.travelingWithOthers === 'yes' && (
                      <div className="space-y-4 pt-4 animate-fade-in">
                        <h3 className="text-base font-medium">Adicione seus companheiros de viagem:</h3>

                        {formData.companions.map((companion, index) => (
                          <div key={index} className="space-y-3 p-4 border rounded-md relative">
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7 rounded-full"
                                onClick={() => handleRemoveCompanion(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}

                            <div className="space-y-2">
                              <Label htmlFor={`companion-name-${index}`}>Nome Completo</Label>
                              <Input
                                id={`companion-name-${index}`}
                                value={companion.name}
                                onChange={(e) => handleCompanionChange(index, 'name', e.target.value)}
                                placeholder="Nome do companheiro"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`companion-email-${index}`}>Email</Label>
                              <Input
                                id={`companion-email-${index}`}
                                type="email"
                                value={companion.email}
                                onChange={(e) => handleCompanionChange(index, 'email', e.target.value)}
                                placeholder="email.do.companheiro@exemplo.com"
                              />
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddCompanion}
                          className="w-full"
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Adicionar outro companheiro
                        </Button>
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className={navButtonStyles}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={cn("bg-sky-600 hover:bg-sky-700", navButtonStyles)}
                        disabled={
                          !formData.travelingWithOthers ||
                          (formData.travelingWithOthers === 'yes' &&
                            formData.companions.some(c => !c.name || !c.email)) ||
                          loading
                        }
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 7: Documents and Summary */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Documentos e Finalização</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Vou precisar dos números dos seus documentos de identificação para fazer seu pedido de indenização com a companhia aérea.</p>

                    <div className="space-y-3">
                      <p className="text-sm font-medium">Você tem CPF?</p>
                      <RadioGroup
                        value={formData.hasCPF}
                        onValueChange={(value) => handleSelectChange('hasCPF', value)}
                        className="space-x-4 flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="cpf-yes" />
                          <Label htmlFor="cpf-yes" className="cursor-pointer">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="cpf-no" />
                          <Label htmlFor="cpf-no" className="cursor-pointer">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.hasCPF === 'yes' && (
                      <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleInputChange}
                          placeholder="123.456.789-00"
                        />
                      </div>
                    )}

                    <div className="pt-4 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleCheckboxChange('acceptTerms', checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm cursor-pointer">
                          Li e aceito os <a href="#" className="text-sky-600 hover:underline">Termos e Condições</a>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="privacy"
                          checked={formData.acceptPrivacy}
                          onCheckedChange={(checked) => handleCheckboxChange('acceptPrivacy', checked as boolean)}
                        />
                        <Label htmlFor="privacy" className="text-sm cursor-pointer">
                          Li e aceito a <a href="#" className="text-sky-600 hover:underline">Política de Privacidade</a>
                        </Label>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className={navButtonStyles}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        className={cn("bg-sky-600 hover:bg-sky-700", navButtonStyles)}
                        disabled={
                          (formData.hasCPF === 'yes' && !formData.cpf) ||
                          !formData.acceptTerms ||
                          !formData.acceptPrivacy ||
                          loading
                        }
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Enviar Solicitação
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ClaimForm;
