import { DashboardResponse } from '../models/dashboard-data.model';

// Snapshot of the real backend's /dashboard/{report}/sample responses, captured verbatim
// (same 10-day Kajian Risiko / 7-month Profil KLN bundled sample data the backend serves —
// see SampleData/*.xlsx and DashboardController.cs). Temporary: MiddleOfficeDataService reads
// these instead of calling the backend for now. To go back to live data, restore the
// this.http.get(...) call in getKajianRisikoDashboard()/getProfilKlnDashboard().

export const KAJIAN_RISIKO_DASHBOARD_SAMPLE: DashboardResponse = {
  "message": "Berhasil membangun dashboard dari 10 periode.",
  "periodsRequested": 10,
  "periodsProcessed": 10,
  "warnings": [],
  "cards": [
    {
      "key": "kasRupiah",
      "label": "Kas Rupiah",
      "category": "kasRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 9026825.246248988,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 8936556.993786499,
      "previousText": null,
      "deltaAbsolute": 90268.252462489,
      "deltaPercent": 1.0101010101010002
    },
    {
      "key": "paguKasRupiahBniWide",
      "label": "Pagu Kas Rupiah BNI Wide",
      "category": "kasRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 8303691.000000001,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 8220654.090000001,
      "previousText": null,
      "deltaAbsolute": 83036.91,
      "deltaPercent": 1.01010101010101
    },
    {
      "key": "rataRataRealisasiKasRupiah",
      "label": "Rata-rata Realisasi Kas Rupiah",
      "category": "kasRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 8633834.875579389,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 8547496.526823595,
      "previousText": null,
      "deltaAbsolute": 86338.348755794,
      "deltaPercent": 1.0101010101010115
    },
    {
      "key": "kondisiKasRupiah",
      "label": "Kondisi",
      "category": "kasRupiah",
      "unit": "Juta Rupiah",
      "latestValue": null,
      "latestText": "Normal",
      "latestPeriod": "2026-07-24",
      "previousValue": null,
      "previousText": "Normal",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "rcBiRupiah",
      "label": "R/C BI",
      "category": "gwmRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 54167675,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 53625998.25,
      "previousText": null,
      "deltaAbsolute": 541676.75,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "dpkRupiah",
      "label": "DPK",
      "category": "gwmRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 851255168.7333333,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 842742617.046,
      "previousText": null,
      "deltaAbsolute": 8512551.6873333,
      "deltaPercent": 1.0101010101010062
    },
    {
      "key": "excessReserveRupiah",
      "label": "Excess Reserve",
      "category": "gwmRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 23494642.657040007,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 23259696.230469607,
      "previousText": null,
      "deltaAbsolute": 234946.4265704,
      "deltaPercent": 1.0101010101010097
    },
    {
      "key": "sbiSdbiSbnRupiah",
      "label": "SBI, SDBI, dan SBN",
      "category": "gwmRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 159222081.96486214,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 157629861.1452135,
      "previousText": null,
      "deltaAbsolute": 1592220.81964864,
      "deltaPercent": 1.010101010101022
    },
    {
      "key": "kasValas",
      "label": "Kas Valas",
      "category": "kasValas",
      "unit": "Ribu USD",
      "latestValue": 101194.17534341416,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 100182.23358998001,
      "previousText": null,
      "deltaAbsolute": 1011.94175343415,
      "deltaPercent": 1.0101010101010186
    },
    {
      "key": "paguKasValasBniWide",
      "label": "Pagu Kas Valas BNI Wide",
      "category": "kasValas",
      "unit": "Ribu USD",
      "latestValue": 87230.14153754566,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 86357.8401221702,
      "previousText": null,
      "deltaAbsolute": 872.30141537546,
      "deltaPercent": 1.0101010101010142
    },
    {
      "key": "rataRataRealisasiKasValas",
      "label": "Rata-rata Realisasi Kas Valas",
      "category": "kasValas",
      "unit": "Ribu USD",
      "latestValue": 97371.17502213901,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 96397.46327191762,
      "previousText": null,
      "deltaAbsolute": 973.71175022139,
      "deltaPercent": 1.01010101010101
    },
    {
      "key": "trafficLightKasValas",
      "label": "Traffic Light",
      "category": "kasValas",
      "unit": "Ribu USD",
      "latestValue": null,
      "latestText": "DARK YELLOW",
      "latestPeriod": "2026-07-24",
      "previousValue": null,
      "previousText": "DARK YELLOW",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "rcBiValas",
      "label": "R/C BI Valas",
      "category": "gwmValas",
      "unit": null,
      "latestValue": 574622,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 568875.78,
      "previousText": null,
      "deltaAbsolute": 5746.22,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "dpkValas",
      "label": "DPK Valas",
      "category": "gwmValas",
      "unit": null,
      "latestValue": 14353031.666666666,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 14209501.35,
      "previousText": null,
      "deltaAbsolute": 143530.316666666,
      "deltaPercent": 1.0101010101010055
    },
    {
      "key": "gwmValas",
      "label": "GWM Valas",
      "category": "gwmValas",
      "unit": null,
      "latestValue": 4.003488693852019,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 3.9634538069134986,
      "previousText": null,
      "deltaAbsolute": 0.0400348869385204,
      "deltaPercent": 1.0101010101010155
    },
    {
      "key": "tightNormalRupiah",
      "label": "Tight/Normal",
      "category": "safetyLevelRupiah",
      "unit": "Juta Rupiah",
      "latestValue": null,
      "latestText": "Moderate",
      "latestPeriod": "2026-07-24",
      "previousValue": null,
      "previousText": "Moderate",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trLiquidRupiah",
      "label": "TR Liquid",
      "category": "safetyLevelRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 57731140.27719605,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 57153828.874424085,
      "previousText": null,
      "deltaAbsolute": 577311.402771965,
      "deltaPercent": 1.0101010101010182
    },
    {
      "key": "cadanganLikuiditasRupiah",
      "label": "Cadangan Likuiditas",
      "category": "safetyLevelRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 23250000,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 23017500,
      "previousText": null,
      "deltaAbsolute": 232500,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "safetyLevelRupiah",
      "label": "Safety Level",
      "category": "safetyLevelRupiah",
      "unit": "Juta Rupiah",
      "latestValue": 15500000,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 15345000,
      "previousText": null,
      "deltaAbsolute": 155000,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "tightNormalValas",
      "label": "Tight/Normal",
      "category": "safetyLevelValas",
      "unit": "Ribu USD",
      "latestValue": null,
      "latestText": "Moderate",
      "latestPeriod": "2026-07-24",
      "previousValue": null,
      "previousText": "Moderate",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trLiquidValas",
      "label": "TR Liquid",
      "category": "safetyLevelValas",
      "unit": "Ribu USD",
      "latestValue": 373584.98061478,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 369849.1308086322,
      "previousText": null,
      "deltaAbsolute": 3735.8498061478,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "cadanganLikuiditasValas",
      "label": "Cadangan Likuiditas",
      "category": "safetyLevelValas",
      "unit": "Ribu USD",
      "latestValue": 2520000,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 2494800,
      "previousText": null,
      "deltaAbsolute": 25200,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "safetyLevelValas",
      "label": "Safety Level",
      "category": "safetyLevelValas",
      "unit": "Ribu USD",
      "latestValue": 1200000,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 1188000,
      "previousText": null,
      "deltaAbsolute": 12000,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "rimKredit",
      "label": "Kredit",
      "category": "rimKredit",
      "unit": "Juta Rupiah",
      "latestValue": 951702791.30228,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 942185763.3892572,
      "previousText": null,
      "deltaAbsolute": 9517027.9130228,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "rimWeselEkspor",
      "label": "Wesel Ekspor",
      "category": "rimKredit",
      "unit": "Juta Rupiah",
      "latestValue": 1757891.897523,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 1740312.9785477698,
      "previousText": null,
      "deltaAbsolute": 17578.9189752302,
      "deltaPercent": 1.0101010101010217
    },
    {
      "key": "rimSuratBerhargaDimiliki",
      "label": "Surat Berharga yang Dimiliki",
      "category": "rimKredit",
      "unit": "Juta Rupiah",
      "latestValue": 5790088.609498,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 5732187.72340302,
      "previousText": null,
      "deltaAbsolute": 57900.88609498,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "rimDpk",
      "label": "DPK",
      "category": "rimDpk",
      "unit": "Juta Rupiah",
      "latestValue": 1086076595.80838,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 1075215829.850296,
      "previousText": null,
      "deltaAbsolute": 10860765.958084,
      "deltaPercent": 1.0101010101010288
    },
    {
      "key": "rimSuratBerhargaDiterbitkan",
      "label": "Surat Berharga yang Diterbitkan",
      "category": "rimDpk",
      "unit": "Juta Rupiah",
      "latestValue": 8973995.9,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 8884255.941,
      "previousText": null,
      "deltaAbsolute": 89739.959,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "rimPinjamanYangDiterima",
      "label": "Pinjaman yang Diterima",
      "category": "rimDpk",
      "unit": "Juta Rupiah",
      "latestValue": 25414543.37724,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 25160397.9434676,
      "previousText": null,
      "deltaAbsolute": 254145.4337724,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "rimPercent",
      "label": "RIM",
      "category": "rimRasio",
      "unit": "%",
      "latestValue": 85.61183581459679,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 84.75571745645082,
      "previousText": null,
      "deltaAbsolute": 0.85611835814597,
      "deltaPercent": 1.0101010101010126
    },
    {
      "key": "rimPosisi",
      "label": "Posisi RIM",
      "category": "rimRasio",
      "unit": "%",
      "latestValue": null,
      "latestText": "Dalam Range Risk Appetite",
      "latestPeriod": "2026-07-24",
      "previousValue": null,
      "previousText": "Dalam Range Risk Appetite",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "rimDisinsentif",
      "label": "Disinsentif RIM",
      "category": "rimRasio",
      "unit": "%",
      "latestValue": 0,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 0,
      "previousText": null,
      "deltaAbsolute": 0,
      "deltaPercent": null
    },
    {
      "key": "insentifKlm",
      "label": "Insentif KLM",
      "category": "insentifKlm",
      "unit": "%",
      "latestValue": 5.4,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 5.346,
      "previousText": null,
      "deltaAbsolute": 0.054,
      "deltaPercent": 1.0101010101010102
    },
    {
      "key": "ldrRupiah",
      "label": "LDR Rupiah",
      "category": "ldr",
      "unit": "%",
      "latestValue": 89.17461687022431,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 88.28287070152207,
      "previousText": null,
      "deltaAbsolute": 0.89174616870224,
      "deltaPercent": 1.0101010101010066
    },
    {
      "key": "ldrValas",
      "label": "LDR Valas",
      "category": "ldr",
      "unit": "%",
      "latestValue": 75.01558987241441,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 74.26543397369026,
      "previousText": null,
      "deltaAbsolute": 0.75015589872415,
      "deltaPercent": 1.0101010101010182
    },
    {
      "key": "ldrTotal",
      "label": "LDR Total",
      "category": "ldr",
      "unit": "%",
      "latestValue": 86.31014150320588,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 85.44704008817382,
      "previousText": null,
      "deltaAbsolute": 0.86310141503206,
      "deltaPercent": 1.0101010101010115
    },
    {
      "key": "alNcd",
      "label": "AL/NCD",
      "category": "alRatio",
      "unit": "%",
      "latestValue": 91.80540698600264,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 90.8873529161426,
      "previousText": null,
      "deltaAbsolute": 0.91805406986004,
      "deltaPercent": 1.0101010101010253
    },
    {
      "key": "alDpk",
      "label": "AL/DPK",
      "category": "alRatio",
      "unit": "%",
      "latestValue": 21.40696875681275,
      "latestText": null,
      "latestPeriod": "2026-07-24",
      "previousValue": 21.19289906924462,
      "previousText": null,
      "deltaAbsolute": 0.21406968756813,
      "deltaPercent": 1.010101010101022
    }
  ],
  "charts": [
    {
      "key": "kasRupiah",
      "title": "Kas Rupiah",
      "group": "A",
      "groupLabel": "A. Primary Reserve Rupiah",
      "unit": "Juta Rupiah",
      "series": [
        {
          "key": "kasRupiah",
          "label": "Kas Rupiah",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 8214410.97408658
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 8304679.226549069
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 8394947.47901156
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 8485215.73147405
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 8575483.983936539
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 8665752.236399028
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 8756020.488861518
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 8846288.74132401
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 8936556.993786499
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 9026825.246248988
            }
          ]
        },
        {
          "key": "paguKasRupiahBniWide",
          "label": "Pagu Kas Rupiah BNI Wide",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 7556358.810000001
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 7639395.720000002
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 7722432.630000001
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 7805469.54
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 7888506.45
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 7971543.36
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 8054580.2700000005
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 8137617.180000001
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 8220654.090000001
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 8303691.000000001
            }
          ]
        },
        {
          "key": "rataRataRealisasiKasRupiah",
          "label": "Rata-rata Realisasi Kas Rupiah",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 7856789.736777244
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 7943128.085533038
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 8029466.434288832
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 8115804.783044625
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 8202143.131800419
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 8288481.480556213
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 8374819.829312007
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 8461158.178067802
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 8547496.526823595
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 8633834.875579389
            }
          ]
        }
      ]
    },
    {
      "key": "gwmRupiah",
      "title": "GWM Rupiah",
      "group": "A",
      "groupLabel": "A. Primary Reserve Rupiah",
      "unit": "Juta Rupiah",
      "series": [
        {
          "key": "rcBiRupiah",
          "label": "R/C BI",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 49292584.25
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 49834261
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 50375937.75
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 50917614.5
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 51459291.25
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 52000968
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 52542644.75
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 53084321.5
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 53625998.25
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 54167675
            }
          ]
        },
        {
          "key": "dpkRupiah",
          "label": "DPK",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 774642203.5473334
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 783154755.2346667
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 791667306.922
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 800179858.6093333
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 808692410.2966666
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 817204961.984
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 825717513.6713333
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 834230065.3586667
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 842742617.046
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 851255168.7333333
            }
          ]
        },
        {
          "key": "excessReserveRupiah",
          "label": "Excess Reserve",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 21380124.817906406
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 21615071.244476806
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 21850017.671047207
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 22084964.097617608
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 22319910.524188004
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 22554856.950758405
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 22789803.377328806
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 23024749.803899206
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 23259696.230469607
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 23494642.657040007
            }
          ]
        },
        {
          "key": "sbiSdbiSbnRupiah",
          "label": "SBI, SDBI, dan SBN",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 144892094.58802456
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 146484315.40767318
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 148076536.2273218
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 149668757.0469704
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 151260977.86661902
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 152853198.68626764
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 154445419.50591627
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 156037640.3255649
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 157629861.1452135
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 159222081.96486214
            }
          ]
        }
      ]
    },
    {
      "key": "kasValas",
      "title": "Kas Valas",
      "group": "B",
      "groupLabel": "B. Primary Reserve Valas",
      "unit": "Ribu USD",
      "series": [
        {
          "key": "kasValas",
          "label": "Kas Valas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 92086.69956250688
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 93098.64131594103
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 94110.58306937518
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 95122.5248228093
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 96134.46657624345
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 97146.4083296776
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 98158.35008311173
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 99170.29183654588
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 100182.23358998001
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 101194.17534341416
            }
          ]
        },
        {
          "key": "paguKasValasBniWide",
          "label": "Pagu Kas Valas BNI Wide",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 79379.42879916655
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 80251.73021454201
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 81124.03162991746
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 81996.33304529291
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 82868.63446066837
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 83740.93587604383
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 84613.23729141928
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 85485.53870679474
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 86357.8401221702
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 87230.14153754566
            }
          ]
        },
        {
          "key": "rataRataRealisasiKasValas",
          "label": "Rata-rata Realisasi Kas Valas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 88607.7692701465
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 89581.4810203679
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 90555.19277058929
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 91528.90452081067
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 92502.61627103205
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 93476.32802125344
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 94450.03977147484
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 95423.75152169623
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 96397.46327191762
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 97371.17502213901
            }
          ]
        }
      ]
    },
    {
      "key": "gwmValas",
      "title": "GWM Valas",
      "group": "B",
      "groupLabel": "B. Primary Reserve Valas",
      "unit": null,
      "series": [
        {
          "key": "rcBiValas",
          "label": "R/C BI Valas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 522906.02
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 528652.24
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 534398.4600000001
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 540144.6799999999
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 545890.9
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 551637.12
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 557383.34
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 563129.5599999999
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 568875.78
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 574622
            }
          ]
        },
        {
          "key": "dpkValas",
          "label": "DPK Valas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 13061258.816666666
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 13204789.133333333
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 13348319.45
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 13491849.766666666
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 13635380.083333332
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 13778910.399999999
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 13922440.716666665
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 14065971.033333333
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 14209501.35
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 14353031.666666666
            }
          ]
        },
        {
          "key": "gwmValas",
          "label": "GWM Valas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 3.643174711405338
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 3.6832095983438577
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 3.723244485282378
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 3.763279372220898
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 3.8033142591594182
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 3.843349146097938
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 3.8833840330364584
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 3.9234189199749787
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 3.9634538069134986
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 4.003488693852019
            }
          ]
        }
      ]
    },
    {
      "key": "safetyLevelRupiah",
      "title": "Safety Level Rupiah",
      "group": "C",
      "groupLabel": "C. Safety Level Rupiah",
      "unit": "Juta Rupiah",
      "series": [
        {
          "key": "trLiquidRupiah",
          "label": "TR Liquid",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 52535337.652248405
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 53112649.05502037
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 53689960.45779233
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 54267271.860564284
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 54844583.26333624
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 55421894.666108206
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 55999206.06888016
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 56576517.47165213
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 57153828.874424085
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 57731140.27719605
            }
          ]
        },
        {
          "key": "cadanganLikuiditasRupiah",
          "label": "Cadangan Likuiditas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 21157500
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 21390000
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 21622500
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 21855000
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 22087500
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 22320000
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 22552500
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 22785000
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 23017500
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 23250000
            }
          ]
        },
        {
          "key": "safetyLevelRupiah",
          "label": "Safety Level",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 14105000
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 14260000
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 14415000
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 14570000
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 14725000
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 14880000
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 15035000
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 15190000
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 15345000
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 15500000
            }
          ]
        }
      ]
    },
    {
      "key": "safetyLevelValas",
      "title": "Safety Level Valas",
      "group": "D",
      "groupLabel": "D. Safety Level Valas",
      "unit": "Ribu USD",
      "series": [
        {
          "key": "trLiquidValas",
          "label": "TR Liquid",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 339962.3323594498
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 343698.1821655976
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 347434.0319717454
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 351169.88177789317
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 354905.731584041
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 358641.5813901888
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 362377.4311963366
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 366113.2810024844
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 369849.1308086322
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 373584.98061478
            }
          ]
        },
        {
          "key": "cadanganLikuiditasValas",
          "label": "Cadangan Likuiditas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 2293200
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 2318400
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 2343600
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 2368800
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 2394000
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 2419200
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 2444400
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 2469600
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 2494800
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 2520000
            }
          ]
        },
        {
          "key": "safetyLevelValas",
          "label": "Safety Level",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 1092000
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 1104000
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 1116000
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 1128000
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 1140000
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 1152000
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 1164000
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 1176000
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 1188000
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 1200000
            }
          ]
        }
      ]
    },
    {
      "key": "rimKredit",
      "title": "RIM - Kredit",
      "group": "E",
      "groupLabel": "E. Rasio Intermediasi Makroprudensial (RIM)",
      "unit": "Juta Rupiah",
      "series": [
        {
          "key": "rimKredit",
          "label": "Kredit",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 866049540.0850748
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 875566567.9980975
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 885083595.9111204
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 894600623.824143
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 904117651.7371659
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 913634679.6501887
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 923151707.5632116
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 932668735.4762343
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 942185763.3892572
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 951702791.30228
            }
          ]
        },
        {
          "key": "rimWeselEkspor",
          "label": "Wesel Ekspor",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 1599681.62674593
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 1617260.54572116
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 1634839.46469639
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 1652418.38367162
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 1669997.3026468498
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 1687576.2216220798
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 1705155.14059731
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 1722734.05957254
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 1740312.9785477698
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 1757891.897523
            }
          ]
        },
        {
          "key": "rimSuratBerhargaDimiliki",
          "label": "Surat Berharga yang Dimiliki",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 5268980.63464318
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 5326881.52073816
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 5384782.40683314
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 5442683.292928119
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 5500584.179023099
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 5558485.06511808
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 5616385.95121306
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 5674286.83730804
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 5732187.72340302
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 5790088.609498
            }
          ]
        }
      ]
    },
    {
      "key": "rimDpk",
      "title": "RIM - DPK",
      "group": "E",
      "groupLabel": "E. Rasio Intermediasi Makroprudensial (RIM)",
      "unit": "Juta Rupiah",
      "series": [
        {
          "key": "rimDpk",
          "label": "DPK",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 988329702.1856258
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 999190468.1437095
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 1010051234.1017934
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 1020912000.059877
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 1031772766.0179608
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 1042633531.9760447
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 1053494297.9341284
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 1064355063.8922123
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 1075215829.850296
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 1086076595.80838
            }
          ]
        },
        {
          "key": "rimSuratBerhargaDiterbitkan",
          "label": "Surat Berharga yang Diterbitkan",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 8166336.269
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 8256076.228000001
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 8345816.187000001
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 8435556.146
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 8525296.105
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 8615036.064
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 8704776.023
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 8794515.982
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 8884255.941
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 8973995.9
            }
          ]
        },
        {
          "key": "rimPinjamanYangDiterima",
          "label": "Pinjaman yang Diterima",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 23127234.4732884
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 23381379.9070608
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 23635525.3408332
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 23889670.7746056
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 24143816.208378
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 24397961.6421504
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 24652107.0759228
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 24906252.5096952
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 25160397.9434676
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 25414543.37724
            }
          ]
        }
      ]
    },
    {
      "key": "rimRasio",
      "title": "RIM - Rasio",
      "group": "E",
      "groupLabel": "E. Rasio Intermediasi Makroprudensial (RIM)",
      "unit": "%",
      "series": [
        {
          "key": "rimPercent",
          "label": "RIM",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 77.90677059128306
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 78.76288894942904
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 79.619007307575
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 80.47512566572097
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 81.33124402386694
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 82.1873623820129
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 83.04348074015888
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 83.89959909830485
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 84.75571745645082
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 85.61183581459679
            }
          ]
        },
        {
          "key": "rimDisinsentif",
          "label": "Disinsentif RIM",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 0
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 0
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 0
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 0
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 0
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 0
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 0
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 0
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 0
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 0
            }
          ]
        }
      ]
    },
    {
      "key": "insentifKlm",
      "title": "Insentif KLM",
      "group": "F",
      "groupLabel": "F. Insentif KLM",
      "unit": "%",
      "series": [
        {
          "key": "insentifKlm",
          "label": "Insentif KLM",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 4.914000000000001
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 4.968
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 5.022
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 5.076
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 5.13
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 5.183999999999999
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 5.2379999999999995
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 5.292
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 5.346
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 5.4
            }
          ]
        }
      ]
    },
    {
      "key": "ldr",
      "title": "Loan to Deposit Ratio",
      "group": "G",
      "groupLabel": "G. Loan to Deposit Ratio (LDR)",
      "unit": "%",
      "series": [
        {
          "key": "ldrRupiah",
          "label": "LDR Rupiah",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 81.14890135190413
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 82.04064752060637
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 82.93239368930861
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 83.82413985801085
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 84.7158860267131
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 85.60763219541533
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 86.49937836411758
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 87.39112453281982
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 88.28287070152207
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 89.17461687022431
            }
          ]
        },
        {
          "key": "ldrValas",
          "label": "LDR Valas",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 68.26418678389712
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 69.01434268262126
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 69.7644985813454
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 70.51465448006954
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 71.26481037879368
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 72.01496627751783
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 72.76512217624199
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 73.51527807496612
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 74.26543397369026
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 75.01558987241441
            }
          ]
        },
        {
          "key": "ldrTotal",
          "label": "LDR Total",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 78.54222876791735
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 79.40533018294941
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 80.26843159798148
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 81.13153301301352
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 81.99463442804559
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 82.85773584307763
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 83.7208372581097
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 84.58393867314177
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 85.44704008817382
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 86.31014150320588
            }
          ]
        }
      ]
    },
    {
      "key": "alRatio",
      "title": "AL/DPK & AL/NCD",
      "group": "H",
      "groupLabel": "H. AL:DPK dan AL:NCD",
      "unit": "%",
      "series": [
        {
          "key": "alNcd",
          "label": "AL/NCD",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 83.54292035726239
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 84.46097442712242
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 85.37902849698246
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 86.29708256684248
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 87.2151366367025
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 88.13319070656253
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 89.05124477642255
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 89.96929884628258
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 90.8873529161426
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 91.80540698600264
            }
          ]
        },
        {
          "key": "alDpk",
          "label": "AL/DPK",
          "points": [
            {
              "period": "2026-07-15",
              "sortKey": "2026-07-15",
              "value": 19.480341568699604
            },
            {
              "period": "2026-07-16",
              "sortKey": "2026-07-16",
              "value": 19.69441125626773
            },
            {
              "period": "2026-07-17",
              "sortKey": "2026-07-17",
              "value": 19.90848094383586
            },
            {
              "period": "2026-07-18",
              "sortKey": "2026-07-18",
              "value": 20.122550631403985
            },
            {
              "period": "2026-07-19",
              "sortKey": "2026-07-19",
              "value": 20.336620318972113
            },
            {
              "period": "2026-07-20",
              "sortKey": "2026-07-20",
              "value": 20.55069000654024
            },
            {
              "period": "2026-07-21",
              "sortKey": "2026-07-21",
              "value": 20.764759694108367
            },
            {
              "period": "2026-07-22",
              "sortKey": "2026-07-22",
              "value": 20.978829381676494
            },
            {
              "period": "2026-07-23",
              "sortKey": "2026-07-23",
              "value": 21.19289906924462
            },
            {
              "period": "2026-07-24",
              "sortKey": "2026-07-24",
              "value": 21.40696875681275
            }
          ]
        }
      ]
    }
  ]
};

export const PROFIL_KLN_DASHBOARD_SAMPLE: DashboardResponse = {
  "message": "Berhasil membangun dashboard Profil KLN dari 7 periode.",
  "periodsRequested": 7,
  "periodsProcessed": 7,
  "warnings": [],
  "cards": [
    {
      "key": "totalAset",
      "label": "Total Aset (semua cabang)",
      "category": "",
      "unit": null,
      "latestValue": 3423984.2858563,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": null,
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "totalKewajiban",
      "label": "Total Kewajiban (semua cabang)",
      "category": "",
      "unit": null,
      "latestValue": 2627142.1799742,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": null,
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "cabangNotOk",
      "label": "Cabang Reserve Requirement NOT OK",
      "category": "",
      "unit": null,
      "latestValue": 0,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": null,
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "aset",
      "label": "Aset",
      "category": "hongkong",
      "unit": null,
      "latestValue": 686411.57,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 676415.285,
      "previousText": null,
      "deltaAbsolute": 9996.285,
      "deltaPercent": 1.477832512315271
    },
    {
      "key": "kewajiban",
      "label": "Kewajiban",
      "category": "hongkong",
      "unit": null,
      "latestValue": 286687.32,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 283876.66,
      "previousText": null,
      "deltaAbsolute": 2810.66,
      "deltaPercent": 0.9900990099009901
    },
    {
      "key": "selisih",
      "label": "Selisih",
      "category": "hongkong",
      "unit": null,
      "latestValue": 399724.25,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 392538.625,
      "previousText": null,
      "deltaAbsolute": 7185.625,
      "deltaPercent": 1.8305523437343267
    },
    {
      "key": "profilMaturitasPercent",
      "label": "Profil Maturitas",
      "category": "hongkong",
      "unit": "%",
      "latestValue": 239.428646512863,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 238.27787920289,
      "previousText": null,
      "deltaAbsolute": 1.150767309973,
      "deltaPercent": 0.48295180141046123
    },
    {
      "key": "reserveRequirement",
      "label": "Reserve Requirement",
      "category": "hongkong",
      "unit": null,
      "latestValue": null,
      "latestText": "OK",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "OK",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trafficLight",
      "label": "Traffic Light",
      "category": "hongkong",
      "unit": null,
      "latestValue": null,
      "latestText": "Green",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "Green",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "aset",
      "label": "Aset",
      "category": "london",
      "unit": null,
      "latestValue": 91099.38,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 89772.69,
      "previousText": null,
      "deltaAbsolute": 1326.69,
      "deltaPercent": 1.477832512315271
    },
    {
      "key": "kewajiban",
      "label": "Kewajiban",
      "category": "london",
      "unit": null,
      "latestValue": 66063.36,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 65415.68,
      "previousText": null,
      "deltaAbsolute": 647.68,
      "deltaPercent": 0.9900990099009901
    },
    {
      "key": "selisih",
      "label": "Selisih",
      "category": "london",
      "unit": null,
      "latestValue": 25036.02,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 24357.01,
      "previousText": null,
      "deltaAbsolute": 679.01,
      "deltaPercent": 2.7877395460280225
    },
    {
      "key": "profilMaturitasPercent",
      "label": "Profil Maturitas",
      "category": "london",
      "unit": "%",
      "latestValue": 137.896982533132,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 137.234207456072,
      "previousText": null,
      "deltaAbsolute": 0.66277507706,
      "deltaPercent": 0.48295180141011934
    },
    {
      "key": "reserveRequirement",
      "label": "Reserve Requirement",
      "category": "london",
      "unit": null,
      "latestValue": null,
      "latestText": "OK",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "OK",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trafficLight",
      "label": "Traffic Light",
      "category": "london",
      "unit": null,
      "latestValue": null,
      "latestText": "Green",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "Green",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "aset",
      "label": "Aset",
      "category": "new-york",
      "unit": null,
      "latestValue": 1487935.5158563,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 1466266.55203315,
      "previousText": null,
      "deltaAbsolute": 21668.96382315,
      "deltaPercent": 1.477832512315271
    },
    {
      "key": "kewajiban",
      "label": "Kewajiban",
      "category": "new-york",
      "unit": null,
      "latestValue": 1345119.4799742,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 1331932.0340921,
      "previousText": null,
      "deltaAbsolute": 13187.4458821,
      "deltaPercent": 0.9900990099009901
    },
    {
      "key": "selisih",
      "label": "Selisih",
      "category": "new-york",
      "unit": null,
      "latestValue": 142816.0358821,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 134334.51794105,
      "previousText": null,
      "deltaAbsolute": 8481.51794105,
      "deltaPercent": 6.3137293906633465
    },
    {
      "key": "profilMaturitasPercent",
      "label": "Profil Maturitas",
      "category": "new-york",
      "unit": "%",
      "latestValue": 110.617349462877,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 110.085688646464,
      "previousText": null,
      "deltaAbsolute": 0.531660816413,
      "deltaPercent": 0.48295180141027094
    },
    {
      "key": "reserveRequirement",
      "label": "Reserve Requirement",
      "category": "new-york",
      "unit": null,
      "latestValue": null,
      "latestText": "OK",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "OK",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trafficLight",
      "label": "Traffic Light",
      "category": "new-york",
      "unit": null,
      "latestValue": null,
      "latestText": "Green",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "Green",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "aset",
      "label": "Aset",
      "category": "seoul",
      "unit": null,
      "latestValue": 38871.17,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 38305.085,
      "previousText": null,
      "deltaAbsolute": 566.085,
      "deltaPercent": 1.477832512315271
    },
    {
      "key": "kewajiban",
      "label": "Kewajiban",
      "category": "seoul",
      "unit": null,
      "latestValue": 2577.54,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 2552.27,
      "previousText": null,
      "deltaAbsolute": 25.27,
      "deltaPercent": 0.9900990099009901
    },
    {
      "key": "selisih",
      "label": "Selisih",
      "category": "seoul",
      "unit": null,
      "latestValue": 36293.63,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 35752.815,
      "previousText": null,
      "deltaAbsolute": 540.815,
      "deltaPercent": 1.5126501227945268
    },
    {
      "key": "profilMaturitasPercent",
      "label": "Profil Maturitas",
      "category": "seoul",
      "unit": "%",
      "latestValue": 1508.07242564616,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 1500.8241682894,
      "previousText": null,
      "deltaAbsolute": 7.24825735676,
      "deltaPercent": 0.4829518014106458
    },
    {
      "key": "reserveRequirement",
      "label": "Reserve Requirement",
      "category": "seoul",
      "unit": null,
      "latestValue": null,
      "latestText": "OK",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "OK",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trafficLight",
      "label": "Traffic Light",
      "category": "seoul",
      "unit": null,
      "latestValue": null,
      "latestText": "Green",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "Green",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "aset",
      "label": "Aset",
      "category": "singapore",
      "unit": null,
      "latestValue": 504995.61,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 497641.305,
      "previousText": null,
      "deltaAbsolute": 7354.305,
      "deltaPercent": 1.477832512315271
    },
    {
      "key": "kewajiban",
      "label": "Kewajiban",
      "category": "singapore",
      "unit": null,
      "latestValue": 440454.36,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 436136.18,
      "previousText": null,
      "deltaAbsolute": 4318.18,
      "deltaPercent": 0.9900990099009901
    },
    {
      "key": "selisih",
      "label": "Selisih",
      "category": "singapore",
      "unit": null,
      "latestValue": 64541.25,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 61505.1249999999,
      "previousText": null,
      "deltaAbsolute": 3036.1250000001,
      "deltaPercent": 4.936377253115257
    },
    {
      "key": "profilMaturitasPercent",
      "label": "Profil Maturitas",
      "category": "singapore",
      "unit": "%",
      "latestValue": 114.6533343432,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 114.102275348952,
      "previousText": null,
      "deltaAbsolute": 0.551058994248,
      "deltaPercent": 0.48295180141038385
    },
    {
      "key": "reserveRequirement",
      "label": "Reserve Requirement",
      "category": "singapore",
      "unit": null,
      "latestValue": null,
      "latestText": "OK",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "OK",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trafficLight",
      "label": "Traffic Light",
      "category": "singapore",
      "unit": null,
      "latestValue": null,
      "latestText": "Green",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "Green",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "aset",
      "label": "Aset",
      "category": "tokyo",
      "unit": null,
      "latestValue": 614671.04,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 605719.52,
      "previousText": null,
      "deltaAbsolute": 8951.52,
      "deltaPercent": 1.477832512315271
    },
    {
      "key": "kewajiban",
      "label": "Kewajiban",
      "category": "tokyo",
      "unit": null,
      "latestValue": 486240.12,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 481473.06,
      "previousText": null,
      "deltaAbsolute": 4767.06,
      "deltaPercent": 0.9900990099009901
    },
    {
      "key": "selisih",
      "label": "Selisih",
      "category": "tokyo",
      "unit": null,
      "latestValue": 128430.92,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 124246.46,
      "previousText": null,
      "deltaAbsolute": 4184.46,
      "deltaPercent": 3.3678706017056745
    },
    {
      "key": "profilMaturitasPercent",
      "label": "Profil Maturitas",
      "category": "tokyo",
      "unit": "%",
      "latestValue": 126.413065215598,
      "latestText": null,
      "latestPeriod": "2026-08-26",
      "previousValue": 125.805485357789,
      "previousText": null,
      "deltaAbsolute": 0.607579857809,
      "deltaPercent": 0.48295180141076643
    },
    {
      "key": "reserveRequirement",
      "label": "Reserve Requirement",
      "category": "tokyo",
      "unit": null,
      "latestValue": null,
      "latestText": "OK",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "OK",
      "deltaAbsolute": null,
      "deltaPercent": null
    },
    {
      "key": "trafficLight",
      "label": "Traffic Light",
      "category": "tokyo",
      "unit": null,
      "latestValue": null,
      "latestText": "Green",
      "latestPeriod": "2026-08-26",
      "previousValue": null,
      "previousText": "Green",
      "deltaAbsolute": null,
      "deltaPercent": null
    }
  ],
  "charts": [
    {
      "key": "profilMaturitasKln",
      "title": "Profil Maturitas % per Cabang",
      "group": "",
      "groupLabel": "",
      "unit": "%",
      "series": [
        {
          "key": "hongkong",
          "label": "Hongkong",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 232.164427868662
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 234.659724417371
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 235.900522452573
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 235.912618674624
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 237.104096546719
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 238.27787920289
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 239.428646512863
            }
          ]
        },
        {
          "key": "london",
          "label": "London",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 133.71321485919
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 135.150360621002
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 135.864988162356
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 135.871954883111
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 136.55817687747
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 137.234207456072
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 137.896982533132
            }
          ]
        },
        {
          "key": "new-york",
          "label": "New York",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 107.261240559271
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 108.41408126719
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 108.987336773044
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 108.992925294056
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 109.543394613723
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 110.085688646464
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 110.617349462877
            }
          ]
        },
        {
          "key": "seoul",
          "label": "Seoul",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 1462.31780108165
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 1478.03475046814
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 1485.85007804041
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 1485.92626766599
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 1493.43094578552
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 1500.8241682894
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 1508.07242564616
            }
          ]
        },
        {
          "key": "singapore",
          "label": "Singapore",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 111.17477444201
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 112.36967769879
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 112.963849006419
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 112.969641430222
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 113.540195174819
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 114.102275348952
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 114.6533343432
            }
          ]
        },
        {
          "key": "tokyo",
          "label": "Tokyo",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 122.577717363183
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 123.895179120321
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 124.550293223115
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 124.55667976261
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 125.185753902825
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 125.805485357789
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 126.413065215598
            }
          ]
        }
      ]
    },
    {
      "key": "hongkong",
      "title": "Hongkong",
      "group": "branch",
      "groupLabel": "Cabang",
      "unit": null,
      "series": [
        {
          "key": "aset",
          "label": "Aset",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 626433.86
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 639762.24
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 653090.62
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 659754.81
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 666419
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 676415.285
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 686411.57
            }
          ]
        },
        {
          "key": "kewajiban",
          "label": "Kewajiban",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 269823.36
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 272634.02
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 276850.01
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 279660.67
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 281066
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 283876.66
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 286687.32
            }
          ]
        },
        {
          "key": "selisih",
          "label": "Selisih",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 356610.5
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 367128.22
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 376240.61
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 380094.14
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 385353
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 392538.625
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 399724.25
            }
          ]
        },
        {
          "key": "profilMaturitasPercent",
          "label": "Profil Maturitas",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 232.164427868662
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 234.659724417371
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 235.900522452573
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 235.912618674624
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 237.104096546719
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 238.27787920289
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 239.428646512863
            }
          ]
        }
      ]
    },
    {
      "key": "london",
      "title": "London",
      "group": "branch",
      "groupLabel": "Cabang",
      "unit": null,
      "series": [
        {
          "key": "aset",
          "label": "Aset",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 83139.24
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 84908.16
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 86677.08
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 87561.54
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 88446
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 89772.69
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 91099.38
            }
          ]
        },
        {
          "key": "kewajiban",
          "label": "Kewajiban",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 62177.28
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 62824.96
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 63796.48
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 64444.16
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 64768
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 65415.68
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 66063.36
            }
          ]
        },
        {
          "key": "selisih",
          "label": "Selisih",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 20961.96
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 22083.2
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 22880.6
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 23117.38
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 23678
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 24357.01
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 25036.02
            }
          ]
        },
        {
          "key": "profilMaturitasPercent",
          "label": "Profil Maturitas",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 133.71321485919
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 135.150360621002
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 135.864988162356
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 135.871954883111
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 136.55817687747
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 137.234207456072
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 137.896982533132
            }
          ]
        }
      ]
    },
    {
      "key": "new-york",
      "title": "New York",
      "group": "branch",
      "groupLabel": "Cabang",
      "unit": null,
      "series": [
        {
          "key": "aset",
          "label": "Aset",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 1357921.7329174
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 1386813.6846816
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 1415705.6364458
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 1430151.6123279
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 1444597.58821
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 1466266.55203315
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 1487935.5158563
            }
          ]
        },
        {
          "key": "kewajiban",
          "label": "Kewajiban",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 1265994.8046816
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 1279182.2505637
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 1298963.41938685
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 1312150.86526895
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 1318744.58821
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 1331932.0340921
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 1345119.4799742
            }
          ]
        },
        {
          "key": "selisih",
          "label": "Selisih",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 91926.9282358
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 107631.4341179
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 116742.21705895
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 118000.74705895
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 125853
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 134334.51794105
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 142816.0358821
            }
          ]
        },
        {
          "key": "profilMaturitasPercent",
          "label": "Profil Maturitas",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 107.261240559271
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 108.41408126719
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 108.987336773044
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 108.992925294056
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 109.543394613723
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 110.085688646464
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 110.617349462877
            }
          ]
        }
      ]
    },
    {
      "key": "seoul",
      "title": "Seoul",
      "group": "branch",
      "groupLabel": "Cabang",
      "unit": null,
      "series": [
        {
          "key": "aset",
          "label": "Aset",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 35474.66
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 36229.44
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 36984.22
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 37361.61
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 37739
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 38305.085
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 38871.17
            }
          ]
        },
        {
          "key": "kewajiban",
          "label": "Kewajiban",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 2425.92
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 2451.19
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 2489.095
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 2514.365
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 2527
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 2552.27
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 2577.54
            }
          ]
        },
        {
          "key": "selisih",
          "label": "Selisih",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 33048.74
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 33778.25
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 34495.125
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 34847.245
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 35212
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 35752.815
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 36293.63
            }
          ]
        },
        {
          "key": "profilMaturitasPercent",
          "label": "Profil Maturitas",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 1462.31780108165
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 1478.03475046814
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 1485.85007804041
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 1485.92626766599
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 1493.43094578552
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 1500.8241682894
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 1508.07242564616
            }
          ]
        }
      ]
    },
    {
      "key": "singapore",
      "title": "Singapore",
      "group": "branch",
      "groupLabel": "Cabang",
      "unit": null,
      "series": [
        {
          "key": "aset",
          "label": "Aset",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 460869.78
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 470675.52
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 480481.26
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 485384.13
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 490287
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 497641.305
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 504995.61
            }
          ]
        },
        {
          "key": "kewajiban",
          "label": "Kewajiban",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 414545.28
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 418863.46
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 425340.73
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 429658.91
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 431818
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 436136.18
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 440454.36
            }
          ]
        },
        {
          "key": "selisih",
          "label": "Selisih",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 46324.5
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 51812.06
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 55140.53
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 55725.22
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 58469
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 61505.1249999999
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 64541.25
            }
          ]
        },
        {
          "key": "profilMaturitasPercent",
          "label": "Profil Maturitas",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 111.17477444201
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 112.36967769879
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 112.963849006419
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 112.969641430222
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 113.540195174819
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 114.102275348952
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 114.6533343432
            }
          ]
        }
      ]
    },
    {
      "key": "tokyo",
      "title": "Tokyo",
      "group": "branch",
      "groupLabel": "Cabang",
      "unit": null,
      "series": [
        {
          "key": "aset",
          "label": "Aset",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 560961.92
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 572897.28
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 584832.64
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 590800.32
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 596768
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 605719.52
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 614671.04
            }
          ]
        },
        {
          "key": "kewajiban",
          "label": "Kewajiban",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 457637.76
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 462404.82
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 469555.41
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 474322.47
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 476706
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 481473.06
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 486240.12
            }
          ]
        },
        {
          "key": "selisih",
          "label": "Selisih",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 103324.16
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 110492.46
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 115277.23
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 116477.85
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 120062
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 124246.46
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 128430.92
            }
          ]
        },
        {
          "key": "profilMaturitasPercent",
          "label": "Profil Maturitas",
          "points": [
            {
              "period": "2026-02-28",
              "sortKey": "2026-02-28",
              "value": 122.577717363183
            },
            {
              "period": "2026-03-31",
              "sortKey": "2026-03-31",
              "value": 123.895179120321
            },
            {
              "period": "2026-04-30",
              "sortKey": "2026-04-30",
              "value": 124.550293223115
            },
            {
              "period": "2026-05-31",
              "sortKey": "2026-05-31",
              "value": 124.55667976261
            },
            {
              "period": "2026-06-30",
              "sortKey": "2026-06-30",
              "value": 125.185753902825
            },
            {
              "period": "2026-07-26",
              "sortKey": "2026-07-26",
              "value": 125.805485357789
            },
            {
              "period": "2026-08-26",
              "sortKey": "2026-08-26",
              "value": 126.413065215598
            }
          ]
        }
      ]
    }
  ]
};
