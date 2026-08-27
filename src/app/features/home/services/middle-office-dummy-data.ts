import { ResumeMatProfHoExtractResponse, ResumeMatProfHoSummary } from '../models/dashboard-data.model';

// Fallback for when the backend at localhost:5279 isn't reachable. Kajian Risiko and
// Profil KLN no longer need this — they read real multi-period data straight from the
// backend's dashboard endpoints. Resume HO still falls back to this bundled dummy data
// (its worksheet template is being revised, so it isn't wired to those endpoints yet).

const RESUME_HO_SUMMARY: ResumeMatProfHoSummary = {
  tipe: 'Konsolidasi',
  periode: '31 Juli 2026',

  assetIdr: 185000000,
  assetVa: 620000,
  kewajibanIdr: 172000000,
  kewajibanVa: 545000,
  selisihNeracaIdr: 13000000,
  selisihNeracaVa: 75000,
  kumulatifVa: 75000,

  tagihanRekAdmIdr: 8200000,
  tagihanRekAdmVa: 42000,
  kewajibanRekAdmIdr: 6100000,
  kewajibanRekAdmVa: 31000,
  selisihRekAdmIdr: 2100000,
  selisihRekAdmVa: 11000,

  selisihGabunganIdr: 15100000,
  selisihGabunganVa: 86000,
  selisihKumulatifIdr: 15100000,
  selisihKumulatifVa: 86000,

  gapMaturitasIdr: 8.2,
  gapMaturitasVa: 13.9,
  trafficLightIdr: 'GREEN',
  trafficLightVa: 'YELLOW'
};

export const RESUME_HO_SAMPLE: ResumeMatProfHoExtractResponse = {
  totalRows: 42,
  message: 'Dummy data (backend tidak terjangkau).',
  rows: [],
  summary: RESUME_HO_SUMMARY
};
