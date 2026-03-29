import {
  ClauseList,
  MissingClausesCard,
  SummaryCard,
  WarningBanner,
} from '@/components/reports'
import { AnomaliesCard } from '@/components/reports/AnomaliesCard/AnomaliesCard'
import { PayslipHeader } from '@/components/reports/PayslipHeader/PayslipHeader'
import { PayslipItems } from '@/components/reports/PayslipItems/PayslipItems'
import { ScoreBar } from '@/components/reports/ScoreBar/ScoreBar'
import { Badge, Button, Card } from '@/components/ui'
import { Logo, LogoWithText } from '@/components/ui/Logo/Logo'
import { colors } from '@/constants/colors'
import { useToastContext } from '@/contexts/ToastContext'
import { useTheme } from '@/hooks/useTheme'
import { useHistoryStore } from '@/stores'
import { ContractResult, PayslipResult } from '@/types'
import { AlertTriangle, CheckCircle } from 'lucide-react-native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// ─── Mock data ───────────────────────────────────────────────────────────────

const MOCK_CONTRACT: ContractResult = {
  documentType: 'contract',
  contractType: 'Tempo Determinato',
  ccnl: 'CCNL Metalmeccanico Industria Liv. 3',
  globalStatus: 'critical',
  summary:
    'Il contratto presenta alcune criticità importanti. Il periodo di prova supera il massimo consentito dal CCNL e la clausola di non concorrenza è molto ampia senza un compenso adeguato. La retribuzione è nella norma. Leggi con attenzione prima di firmare.',
  clauses: [
    {
      id: '1',
      title: 'Durata e tipo contratto',
      summary:
        'Contratto a tempo determinato di 12 mesi con possibilità di proroga.',
      detail:
        'Il contratto ha durata di 12 mesi a partire dal 01/04/2025. È ammessa una proroga fino a un massimo di 24 mesi complessivi ai sensi del D.Lgs. 81/2015.',
      status: 'green',
    },
    {
      id: '2',
      title: 'Periodo di prova',
      summary: 'Periodo di prova di 6 mesi: supera il massimo CCNL.',
      detail:
        'Il contratto prevede un periodo di prova di 6 mesi. Il CCNL Metalmeccanico per il 3° livello prevede un massimo di 3 mesi. Il periodo è il doppio di quello consentito ed è nullo per la parte eccedente.',
      status: 'red',
    },
    {
      id: '3',
      title: 'Retribuzione',
      summary:
        'Stipendio mensile di €1.750 lordi, in linea con i minimi tabellari.',
      detail:
        'La retribuzione lorda mensile è di €1.750,00. Il minimo tabellare CCNL è di €1.698,00. Lo stipendio proposto è superiore al minimo di circa €52.',
      status: 'green',
    },
    {
      id: '4',
      title: 'Orario di lavoro',
      summary: '40 ore settimanali su 5 giorni, nella norma.',
      detail:
        "L'orario di lavoro è di 40 ore settimanali distribuite su 5 giorni (lunedì-venerdì). In linea con il CCNL.",
      status: 'green',
    },
    {
      id: '5',
      title: 'Clausola di non concorrenza',
      summary:
        'Divieto di lavorare nel settore per 2 anni: compenso inadeguato.',
      detail:
        'La clausola vieta attività in aziende concorrenti per 24 mesi su tutto il territorio nazionale. Il compenso previsto è di soli €500 una tantum, del tutto sproporzionato.',
      status: 'red',
    },
    {
      id: '6',
      title: 'Luogo di lavoro e trasferte',
      summary:
        'Sede fissa con possibilità di trasferte non specificate: da verificare.',
      detail:
        'Il contratto prevede trasferte su tutto il territorio nazionale senza specificare rimborso o indennità. Il CCNL prevede il rimborso delle spese documentate.',
      status: 'yellow',
    },
  ],
  missingClauses: [
    {
      id: '1',
      title: 'Patto di stabilità',
      description:
        'Il contratto non menziona alcun patto di stabilità. Il datore può recedere liberamente durante il periodo di prova senza motivazione.',
    },
    {
      id: '2',
      title: 'Modalità di rimborso trasferte',
      description:
        'Non sono specificate le modalità di rimborso per le trasferte previste. Potresti sostenere spese non rimborsate.',
    },
  ],
}

const MOCK_PAYSLIP: PayslipResult = {
  documentType: 'payslip',
  period: 'Marzo 2025',
  ccnl: 'CCNL Commercio Terziario',
  globalStatus: 'warning',
  summary:
    'La busta paga presenta alcune voci da verificare. Lo stipendio base è in linea con i minimi CCNL, ma sono stati rilevati straordinari non maggiorati correttamente.',
  grossSalary: '€2.100,00',
  netSalary: '€1.560,00',
  items: [
    {
      id: '1',
      label: 'Stipendio base',
      value: '€1.800,00',
      note: 'Retribuzione base mensile in linea con i minimi tabellari CCNL Commercio 3° livello.',
      status: 'green',
    },
    {
      id: '2',
      label: 'Straordinari (8 ore)',
      value: '€120,00',
      note: 'Maggiorazione applicata 15%, ma il CCNL prevede il 25% per ore feriali. Potrebbero mancarti circa €13.',
      status: 'yellow',
    },
    {
      id: '3',
      label: 'Rateo tredicesima',
      value: '€175,00',
      note: 'Quota mensile della tredicesima mensilità accantonata. Importo corretto.',
      status: 'green',
    },
    {
      id: '4',
      label: 'TFR accantonato',
      value: '€121,00',
      note: 'Trattamento di Fine Rapporto maturato questo mese. Circa 6,91% della retribuzione utile. Nella norma.',
      status: 'green',
    },
    {
      id: '5',
      label: 'Trattenuta IRPEF',
      value: '€380,00',
      note: 'Sembra leggermente alta. Verifica se hai comunicato al datore le detrazioni per lavoro dipendente.',
      status: 'yellow',
    },
    {
      id: '6',
      label: 'Contributi INPS lavoratore',
      value: '€189,00',
      note: 'Aliquota 9,19%. Importo corretto.',
      status: 'green',
    },
  ],
  anomalies: [
    {
      id: '1',
      title: 'Straordinari non maggiorati correttamente',
      description:
        'Le 8 ore di straordinario feriale sono state retribuite con una maggiorazione del 15%, mentre il CCNL Commercio prevede il 25%. La differenza stimata è di circa €13,00 a tuo favore.',
    },
  ],
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Playground() {
  const { spacing } = useTheme()
  const insets = useSafeAreaInsets()
  const toast = useToastContext()
  const { clearHistory } = useHistoryStore()
  const [showContract, setShowContract] = useState(true)

  if (!__DEV__) return null

  const activeAnalysis = showContract ? MOCK_CONTRACT : MOCK_PAYSLIP

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={{
          padding: spacing[6],
          gap: spacing[8],
        }}
      >
        {/* ── UI Components ── */}
        <Section title="Logo">
          <LogoWithText size={44} />
          <LogoWithText size={36} />
          <LogoWithText size={28} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Logo size={56} />
            <Logo size={44} />
            <Logo size={36} />
            <Logo size={28} />
            <Logo size={22} />
          </View>
        </Section>

        <Section title="Buttons">
          <Button label="Primary" onPress={() => {}} />
          <Button label="Secondary" variant="secondary" onPress={() => {}} />
          <Button label="Ghost" variant="ghost" onPress={() => {}} />
          <Button label="Loading" loading onPress={() => {}} />
          <Button label="Disabled" disabled onPress={() => {}} />
          <Button label="Auto width" fullWidth={false} onPress={() => {}} />
        </Section>

        <Section title="Cards">
          <Card>
            <Text>Default Card</Text>
          </Card>
          <Card variant="surface">
            <Text>Surface Card</Text>
          </Card>
          <Card variant="warning">
            <Text>Warning Card</Text>
          </Card>
          <Card variant="success">
            <Text>Success Card</Text>
          </Card>
          <Card variant="error">
            <Text>Error Card</Text>
          </Card>
          <Card loading />
        </Section>

        <Section title="Badges">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Badge label="Tempo Determinato" />
            <Badge
              label="OK"
              variant="success"
              icon={<CheckCircle size={12} color={colors.success} />}
            />
            <Badge
              label="2 clausole"
              variant="warning"
              icon={<AlertTriangle size={12} color={colors.warning} />}
            />
            <Badge label="Non concorrenza" variant="error" />
            <Badge loading label="" />
          </View>
        </Section>

        <Section title="Toast">
          <Button
            label="Error"
            onPress={() => toast.error('File troppo grande. Massimo 10MB.')}
          />
          <Button
            label="Success"
            variant="secondary"
            onPress={() => toast.success('Analisi completata!')}
          />
          <Button
            label="Warning"
            variant="secondary"
            onPress={() => toast.warning('Connessione lenta, riprova.')}
          />
          <Button
            label="Info"
            variant="ghost"
            onPress={() => toast.info('Contratto già analizzato.')}
          />
        </Section>

        {/* ── Report Components ── */}
        <Section title="Report — toggle">
          <View style={{ flexDirection: 'row', gap: spacing[3] }}>
            <Button
              label="Contratto"
              variant={showContract ? 'primary' : 'secondary'}
              fullWidth={false}
              onPress={() => setShowContract(true)}
            />
            <Button
              label="Busta Paga"
              variant={!showContract ? 'primary' : 'secondary'}
              fullWidth={false}
              onPress={() => setShowContract(false)}
            />
          </View>
        </Section>

        <Section title="WarningBanner">
          <WarningBanner status="positive" />
          <WarningBanner status="warning" />
          <WarningBanner status="critical" />
        </Section>

        <Section title="ScoreBar">
          <ScoreBar analysis={MOCK_CONTRACT} />
          <ScoreBar analysis={MOCK_PAYSLIP} />
        </Section>

        <Section
          title={`Report Preview — ${showContract ? 'Contratto' : 'Busta Paga'}`}
        >
          <WarningBanner status={activeAnalysis.globalStatus} />
          <ScoreBar
            analysis={activeAnalysis}
            style={{ marginTop: spacing[3] }}
          />
          <SummaryCard
            summary={activeAnalysis.summary}
            style={{ marginTop: spacing[3] }}
          />

          {showContract && (
            <>
              <ClauseList
                clauses={(activeAnalysis as ContractResult).clauses}
              />
              <MissingClausesCard
                clauses={(activeAnalysis as ContractResult).missingClauses}
                style={{ marginTop: spacing[4] }}
              />
            </>
          )}

          {!showContract && (
            <>
              <PayslipHeader
                grossSalary={(activeAnalysis as PayslipResult).grossSalary}
                netSalary={(activeAnalysis as PayslipResult).netSalary}
                ccnl={(activeAnalysis as PayslipResult).ccnl}
                style={{ marginTop: spacing[3] }}
              />
              <PayslipItems items={(activeAnalysis as PayslipResult).items} />
              <AnomaliesCard
                anomalies={(activeAnalysis as PayslipResult).anomalies}
                style={{ marginTop: spacing[4] }}
              />
            </>
          )}
        </Section>

        <Button label="Clear History" onPress={clearHistory} />
      </ScrollView>
    </View>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const { spacing, typography } = useTheme()
  return (
    <View style={{ gap: spacing[4], width: 300 }}>
      <Text style={[typography.h2, styles.sectionTitle]}>{title}</Text>
      <View style={{ gap: spacing[3] }}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
    lineHeight: 32,
  },
})
