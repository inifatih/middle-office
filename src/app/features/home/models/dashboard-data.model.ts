export interface KajianRisikoSummary {
  periode: string | null;

  kondisiKasRupiah: string | null;
  paguKasRupiahBniWide: number | null;
  kasRupiah: number | null;
  persenTerhadapPaguRupiah: number | null;
  rataRataRealisasiKasRupiah: number | null;
  trafficLightKasRupiah: string | null;

  gwmHarianRupiah: number | null;
  gwmHarianRupiahStatus: string | null;
  rcBiRupiah: number | null;
  dpkRupiah: number | null;
  gwmAveragingRupiah: number | null;
  gwmAveragingRupiahStatus: string | null;
  pemenuhanGwmRupiah: number | null;
  excessReserveRupiah: number | null;
  gwmSekunderPlmRupiah: number | null;
  gwmSekunderPlmRupiahStatus: string | null;
  sbiSdbiSbnRupiah: number | null;
  ketentuanGwmRupiah: number | null;
  ketentuanGwmSekunderPlmRupiah: number | null;

  kasValas: number | null;
  paguKasValasBniWide: number | null;
  persenTerhadapPaguValas: number | null;
  rataRataRealisasiKasValas: number | null;
  trafficLightKasValas: string | null;
  gwmValas: number | null;
  gwmValasStatus: string | null;
  rcBiValas: number | null;
  dpkValas: number | null;
  ketentuanGwmValas: number | null;

  tightNormalRupiah: string | null;
  safetyLevelRupiah: number | null;
  cadanganLikuiditasRupiah: number | null;
  trafficLightCadanganRupiah: string | null;
  trLiquidRupiah: number | null;
  statusLikuiditasRupiah: string | null;

  tightNormalValas: string | null;
  safetyLevelValas: number | null;
  cadanganLikuiditasValas: number | null;
  trafficLightCadanganValas: string | null;
  trLiquidValas: number | null;
  statusLikuiditasValas: string | null;

  rimKredit: number | null;
  rimSuratBerhargaDimiliki: number | null;
  rimWeselEkspor: number | null;
  rimDpk: number | null;
  rimPinjamanYangDiterima: number | null;
  rimSuratBerhargaDiterbitkan: number | null;
  rimPercent: number | null;
  rimPosisi: string | null;
  rimDisinsentif: number | null;

  insentifKlm: number | null;

  ldrRupiah: number | null;
  ldrValas: number | null;
  ldrTotal: number | null;

  alNcd: number | null;
  alDpk: number | null;
}

export interface KajianRisikoExtractResponse {
  totalRows: number;
  message: string | null;
  rows: unknown[];
  summary: KajianRisikoSummary;
  unmatchedFields: string[];
}

export interface ProfilMaturitasKln {
  cabang: string;
  aset: number;
  kewajiban: number;
  selisih: number;
  profilMaturitasPercent: number;
  reserveRequirement: string | null;
  trafficLight: string | null;
}

export interface KlnExtractResponse {
  totalRows: number;
  message: string | null;
  data: ProfilMaturitasKln[];
}

export interface ResumeMatProfHoSummary {
  tipe: string;
  periode: string | null;

  assetIdr: number | null;
  assetVa: number | null;
  kewajibanIdr: number | null;
  kewajibanVa: number | null;
  selisihNeracaIdr: number | null;
  selisihNeracaVa: number | null;
  kumulatifVa: number | null;

  tagihanRekAdmIdr: number | null;
  tagihanRekAdmVa: number | null;
  kewajibanRekAdmIdr: number | null;
  kewajibanRekAdmVa: number | null;
  selisihRekAdmIdr: number | null;
  selisihRekAdmVa: number | null;

  selisihGabunganIdr: number | null;
  selisihGabunganVa: number | null;
  selisihKumulatifIdr: number | null;
  selisihKumulatifVa: number | null;

  gapMaturitasIdr: number | null;
  gapMaturitasVa: number | null;
  trafficLightIdr: string | null;
  trafficLightVa: string | null;
}

export interface ResumeMatProfHoExtractResponse {
  totalRows: number;
  message: string | null;
  rows: unknown[];
  summary: ResumeMatProfHoSummary;
}

// Multi-period, chart/card-ready payload shared by the Kajian Risiko and Profil KLN dashboards
// (backend: DashboardService/DashboardController). One "period" = one uploaded workbook.

export interface LineChartPoint {
  period: string;
  sortKey: string;
  value: number | null;
}

export interface LineChartSeries {
  key: string;
  label: string;
  points: LineChartPoint[];
}

export interface LineChart {
  key: string; // sub-category key, e.g. "kasRupiah"
  title: string; // sub-category label, e.g. "Kas Rupiah"
  group: string; // letter-group key, e.g. "A"
  groupLabel: string; // e.g. "A. Primary Reserve Rupiah"
  unit: string | null;
  series: LineChartSeries[];
}

export interface MetricCard {
  key: string;
  label: string;
  category: string; // matches a LineChart.key, or "" for an all-branches/summary card
  unit: string | null;
  latestValue: number | null;
  latestText: string | null; // for status/text-only metrics (Kondisi, Traffic Light, Posisi, ...)
  latestPeriod: string | null;
  previousValue: number | null;
  previousText: string | null;
  deltaAbsolute: number | null;
  deltaPercent: number | null;
}

export interface DashboardResponse {
  message: string;
  periodsRequested: number;
  periodsProcessed: number;
  warnings: string[];
  cards: MetricCard[];
  charts: LineChart[];
}
