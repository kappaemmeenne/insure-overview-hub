import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle, User, Calendar, DollarSign, MapPin, Phone, Download, Upload, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockPratica = {
  id: "AUTO-2024-001",
  title: "Sinistro Auto - Incidente stradale",
  description: "Via Roma, 15 - Milano",
  status: "in_progress",
  statusText: "In Lavorazione",
  date: "2024-01-10",
  amount: "€ 2.500,00",
  progress: 65,
  steps: [
    { id: 1, name: "Denuncia ricevuta", completed: true, date: "10/01/2024" },
    { id: 2, name: "Documenti verificati", completed: true, date: "12/01/2024" },
    { id: 3, name: "Perizia tecnica", completed: true, date: "15/01/2024" },
    { id: 4, name: "Valutazione danni", completed: false, inProgress: true, date: "In corso" },
    { id: 5, name: "Liquidazione", completed: false, date: "In attesa" },
  ],
  details: {
    cliente: "Mario Rossi",
    polizza: "POL-AUTO-123456",
    dataIncidente: "08/01/2024",
    luogoIncidente: "Via Roma, 15 - Milano (MI)",
    veicolo: "Fiat Punto - AB123CD",
    contraente: "Mario Rossi",
    telefono: "+39 333 123 4567",
  },
  actions: [
    { 
      id: 1, 
      title: "Carica foto aggiuntive", 
      description: "Foto del veicolo dannegiato da angolazioni diverse",
      urgent: true,
      deadline: "20/01/2024"
    },
    { 
      id: 2, 
      title: "Firma documenti perizia", 
      description: "Rapporto tecnico del perito assicurativo",
      urgent: false,
      deadline: "25/01/2024"
    }
  ],
  documents: [
    { name: "Denuncia sinistro", date: "10/01/2024", status: "uploaded" },
    { name: "Foto incidente", date: "10/01/2024", status: "uploaded" },
    { name: "Verbale polizia", date: "12/01/2024", status: "uploaded" },
    { name: "Perizia tecnica", date: "15/01/2024", status: "pending" },
  ]
};

const PraticaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "primary";
      case "pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getStepIcon = (step: any) => {
    if (step.completed) {
      return <CheckCircle className="h-5 w-5 text-success" />;
    } else if (step.inProgress) {
      return <Clock className="h-5 w-5 text-primary" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/assicurato")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna alla Dashboard
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {mockPratica.title}
              </h1>
              <p className="text-muted-foreground mb-2">{mockPratica.description}</p>
              <p className="text-sm text-muted-foreground">ID: {mockPratica.id}</p>
            </div>
            <Badge 
              className={`bg-${getStatusColor(mockPratica.status)} text-${getStatusColor(mockPratica.status)}-foreground`}
            >
              {mockPratica.statusText}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Progress Section - Uber Style */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Stato della Pratica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progresso</span>
                <span className="text-sm text-muted-foreground">{mockPratica.progress}%</span>
              </div>
              <Progress value={mockPratica.progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {mockPratica.steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {getStepIcon(step)}
                    {index < mockPratica.steps.length - 1 && (
                      <div className={`w-0.5 h-8 mt-2 ${
                        step.completed ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className={`font-medium ${
                      step.completed ? 'text-foreground' : 
                      step.inProgress ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Required */}
        {mockPratica.actions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="h-5 w-5" />
                Azioni Richieste
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPratica.actions.map((action) => (
                  <div 
                    key={action.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      action.urgent ? 'border-l-warning bg-warning/5' : 'border-l-primary bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          {action.title}
                          {action.urgent && (
                            <Badge variant="destructive" className="text-xs">Urgente</Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Scadenza: {action.deadline}
                        </p>
                      </div>
                      <Button size="sm" className="ml-4">
                        Completa Ora
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Details Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Dettagli</TabsTrigger>
            <TabsTrigger value="documents">Documenti</TabsTrigger>
            <TabsTrigger value="communication">Comunicazioni</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informazioni Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cliente:</span>
                    <span className="font-medium">{mockPratica.details.cliente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Polizza:</span>
                    <span className="font-medium">{mockPratica.details.polizza}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telefono:</span>
                    <span className="font-medium">{mockPratica.details.telefono}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Dettagli Sinistro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Incidente:</span>
                    <span className="font-medium">{mockPratica.details.dataIncidente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Luogo:</span>
                    <span className="font-medium">{mockPratica.details.luogoIncidente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Veicolo:</span>
                    <span className="font-medium">{mockPratica.details.veicolo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Importo:</span>
                    <span className="font-medium text-primary">{mockPratica.amount}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPratica.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === 'uploaded' ? 'default' : 'secondary'}>
                          {doc.status === 'uploaded' ? 'Caricato' : 'In Attesa'}
                        </Badge>
                        {doc.status === 'uploaded' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 border-2 border-dashed border-muted rounded-lg text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Trascina i file qui o clicca per caricare
                  </p>
                  <Button variant="outline" size="sm">
                    Carica Documenti
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Centro Messaggi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">AS</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Assicurazioni Sicure</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          La perizia tecnica è stata completata. Il veicolo presenta danni per un totale di €2.500. Procediamo con la liquidazione.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">15/01/2024 - 14:30</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg ml-8">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">MR</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Mario Rossi</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Perfetto, grazie per l'aggiornamento. Quando posso aspettarmi la liquidazione?
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">15/01/2024 - 15:45</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Scrivi un messaggio..." 
                    className="flex-1 px-3 py-2 border border-input rounded-md text-sm"
                  />
                  <Button size="sm">Invia</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PraticaDetail;