import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Calendar, CreditCard, Download, ChevronDown, Check } from 'lucide-react';

// --- BASE DE DATOS HISTÓRICA ---

const dataSeptiembre = [
  { date: '13 Sep', ventas: 1953000, base: 0, gastos: 290000, nomina: 170000, proveedores: 633000, totalPagos: 1093000 },
  { date: '14 Sep', ventas: 1759000, base: 0, gastos: 74000, nomina: 295000, proveedores: 180000, totalPagos: 549000 },
  { date: '15 Sep', ventas: 308000, base: 189000, gastos: 149000, nomina: 90000, proveedores: 0, totalPagos: 239000 },
  { date: '16 Sep', ventas: 328000, base: 89000, gastos: 158600, nomina: 40000, proveedores: 0, totalPagos: 198600 },
  { date: '17 Sep', ventas: 359760, base: 140000, gastos: 140000, nomina: 1116800, proveedores: 0, totalPagos: 1256800 },
  { date: '18 Sep', ventas: 360000, base: 170000, gastos: 4000, nomina: 106500, proveedores: 126500, totalPagos: 237000 },
  { date: '19 Sep', ventas: 386500, base: 221000, gastos: 0, nomina: 225000, proveedores: 530000, totalPagos: 755000 },
  { date: '20 Sep', ventas: 1788500, base: 0, gastos: 40000, nomina: 330000, proveedores: 305000, totalPagos: 675000 },
  { date: '21 Sep', ventas: 865000, base: 85000, gastos: 0, nomina: 220000, proveedores: 229200, totalPagos: 449200 },
  { date: '22 Sep', ventas: 0, base: 0, gastos: 0, nomina: 0, proveedores: 0, totalPagos: 0 },
  { date: '23 Sep', ventas: 178500, base: 200000, gastos: 25000, nomina: 20000, proveedores: 182500, totalPagos: 227500 },
  { date: '24 Sep', ventas: 383000, base: 0, gastos: 315000, nomina: 380000, proveedores: 835000, totalPagos: 1530000 },
  { date: '25 Sep', ventas: 312000, base: 0, gastos: 31000, nomina: 147000, proveedores: 69000, totalPagos: 247000 },
  { date: '26 Sep', ventas: 252000, base: 101000, gastos: 28000, nomina: 100000, proveedores: 426500, totalPagos: 554500 },
  { date: '27 Sep', ventas: 1412000, base: 114000, gastos: 0, nomina: 390000, proveedores: 639800, totalPagos: 1029800 },
  { date: '28 Sep', ventas: 1155000, base: 87000, gastos: 0, nomina: 235000, proveedores: 514100, totalPagos: 749100 },
  { date: '29 Sep', ventas: 363000, base: 100000, gastos: 12000, nomina: 50000, proveedores: 588600, totalPagos: 650600 },
  { date: '30 Sep', ventas: 331000, base: 0, gastos: 0, nomina: 100000, proveedores: 61000, totalPagos: 161000 },
];

const dataOctubre = [
  { date: '1 Oct', ventas: 514000, base: 430000, gastos: 0, nomina: 180000, proveedores: 121650, totalPagos: 301650 },
  { date: '2 Oct', ventas: 396500, base: 400000, gastos: 0, nomina: 90000, proveedores: 169500, totalPagos: 259500 },
  { date: '3 Oct', ventas: 365000, base: 377000, gastos: 0, nomina: 95000, proveedores: 1426600, totalPagos: 1521600 },
  { date: '4 Oct', ventas: 1751000, base: 346000, gastos: 0, nomina: 210000, proveedores: 1210700, totalPagos: 1420700 },
  { date: '5 Oct', ventas: 1310000, base: 396000, gastos: 400000, nomina: 280000, proveedores: 370000, totalPagos: 1050000 },
  { date: '6 Oct', ventas: 0, base: 0, gastos: 0, nomina: 0, proveedores: 0, totalPagos: 0 },
  { date: '7 Oct', ventas: 435000, base: 396000, gastos: 172000, nomina: 50000, proveedores: 836500, totalPagos: 1058500 },
  { date: '8 Oct', ventas: 334000, base: 363000, gastos: 99500, nomina: 100000, proveedores: 220300, totalPagos: 419800 },
  { date: '9 Oct', ventas: 577200, base: 330000, gastos: 15000, nomina: 135000, proveedores: 0, totalPagos: 150000 },
  { date: '10 Oct', ventas: 266500, base: 284000, gastos: 570700, nomina: 80000, proveedores: 298000, totalPagos: 948700 },
  { date: '11 Oct', ventas: 1518000, base: 262000, gastos: 42000, nomina: 345000, proveedores: 469000, totalPagos: 856000 },
  { date: '12 Oct', ventas: 1130000, base: 300000, gastos: 79300, nomina: 345000, proveedores: 242300, totalPagos: 666600 },
  { date: '13 Oct', ventas: 607000, base: 335000, gastos: 30300, nomina: 120000, proveedores: 295000, totalPagos: 445300 },
  { date: '14 Oct', ventas: 332000, base: 319000, gastos: 35000, nomina: 80000, proveedores: 210800, totalPagos: 325800 },
  { date: '15 Oct', ventas: 160500, base: 288000, gastos: 68500, nomina: 85000, proveedores: 124000, totalPagos: 277500 },
  { date: '16 Oct', ventas: 270500, base: 175000, gastos: 0, nomina: 40000, proveedores: 34000, totalPagos: 74000 },
  { date: '17 Oct', ventas: 420000, base: 245000, gastos: 0, nomina: 110000, proveedores: 85200, totalPagos: 195200 },
  { date: '18 Oct', ventas: 1390000, base: 440000, gastos: 160300, nomina: 245000, proveedores: 781000, totalPagos: 1186300 },
  { date: '19 Oct', ventas: 977500, base: 475000, gastos: 6000, nomina: 215000, proveedores: 253400, totalPagos: 474400 },
  { date: '20 Oct', ventas: 401000, base: 475000, gastos: 135300, nomina: 125000, proveedores: 572800, totalPagos: 833100 },
  { date: '21 Oct', ventas: 327500, base: 250000, gastos: 51000, nomina: 90000, proveedores: 244000, totalPagos: 385000 },
  { date: '22 Oct', ventas: 281500, base: 309000, gastos: 0, nomina: 23000, proveedores: 502200, totalPagos: 525200 },
  { date: '23 Oct', ventas: 310500, base: 455000, gastos: 13000, nomina: 96000, proveedores: 241000, totalPagos: 350000 },
  { date: '24 Oct', ventas: 431000, base: 386000, gastos: 70000, nomina: 373000, proveedores: 0, totalPagos: 443000 },
  { date: '25 Oct', ventas: 1313400, base: 374000, gastos: 28200, nomina: 315000, proveedores: 460200, totalPagos: 803400 },
  { date: '26 Oct', ventas: 1310000, base: 884000, gastos: 24000, nomina: 266000, proveedores: 242000, totalPagos: 532000 },
  { date: '27 Oct', ventas: 327500, base: 390000, gastos: 0, nomina: 80000, proveedores: 63400, totalPagos: 143400 },
  { date: '28 Oct', ventas: 311500, base: 380000, gastos: 7000, nomina: 90000, proveedores: 122000, totalPagos: 219000 },
  { date: '29 Oct', ventas: 195000, base: 380000, gastos: 0, nomina: 98000, proveedores: 801000, totalPagos: 899000 },
  { date: '30 Oct', ventas: 455000, base: 184000, gastos: 420000, nomina: 130000, proveedores: 733500, totalPagos: 1283500 },
  { date: '31 Oct', ventas: 625300, base: 340000, gastos: 0, nomina: 130000, proveedores: 635300, totalPagos: 765300 },
];

const dataNoviembre = [
  { date: '1 Nov', ventas: 2369700, base: 545000, gastos: 16000, nomina: 185000, proveedores: 2020700, totalPagos: 2221700 },
  { date: '2 Nov', ventas: 1338000, base: 493000, gastos: 0, nomina: 320000, proveedores: 409000, totalPagos: 729000 },
  { date: '3 Nov', ventas: 627600, base: 252000, gastos: 0, nomina: 190000, proveedores: 19600, totalPagos: 209600 },
  { date: '4 Nov', ventas: 389800, base: 320000, gastos: 0, nomina: 120000, proveedores: 118800, totalPagos: 238800 },
  { date: '5 Nov', ventas: 493450, base: 320000, gastos: 0, nomina: 120000, proveedores: 113450, totalPagos: 233450 },
  { date: '6 Nov', ventas: 267300, base: 320000, gastos: 0, nomina: 95000, proveedores: 82300, totalPagos: 177300 },
  { date: '7 Nov', ventas: 320000, base: 0, gastos: 0, nomina: 80000, proveedores: 1024200, totalPagos: 1104200 },
  { date: '8 Nov', ventas: 1141300, base: 210000, gastos: 50000, nomina: 240000, proveedores: 221300, totalPagos: 511300 },
  { date: '9 Nov', ventas: 1343600, base: 300000, gastos: 0, nomina: 230000, proveedores: 103600, totalPagos: 333600 },
  { date: '10 Nov', ventas: 208000, base: 300000, gastos: 0, nomina: 40000, proveedores: 185000, totalPagos: 225000 },
  { date: '11 Nov', ventas: 234000, base: 283000, gastos: 10000, nomina: 90000, proveedores: 40000, totalPagos: 140000 },
  { date: '12 Nov', ventas: 0, base: 0, gastos: 0, nomina: 0, proveedores: 0, totalPagos: 0 }, // Datos ajustados (sin información de movimientos)
  { date: '13 Nov', ventas: 358000, base: 280000, gastos: 0, nomina: 50000, proveedores: 187000, totalPagos: 237000 },
  { date: '14 Nov', ventas: 399000, base: 300000, gastos: 40000, nomina: 61000, proveedores: 583600, totalPagos: 684600 },
  { date: '15 Nov', ventas: 1064500, base: 310000, gastos: 170000, nomina: 380000, proveedores: 750200, totalPagos: 1300200 },
  { date: '16 Nov', ventas: 1313800, base: 300000, gastos: 26000, nomina: 240000, proveedores: 452800, totalPagos: 718800 },
  { date: '17 Nov', ventas: 598700, base: 195000, gastos: 26000, nomina: 155000, proveedores: 102700, totalPagos: 283700 },
  { date: '18 Nov', ventas: 476500, base: 310000, gastos: 0, nomina: 105000, proveedores: 455500, totalPagos: 560500 },
  { date: '19 Nov', ventas: 358000, base: 326000, gastos: 2285800, nomina: 80000, proveedores: 569450, totalPagos: 2935250 },
  { date: '20 Nov', ventas: 197000, base: 356000, gastos: 2500, nomina: 80000, proveedores: 177600, totalPagos: 260100 },
  { date: '21 Nov', ventas: 248500, base: 300000, gastos: 0, nomina: 80000, proveedores: 327000, totalPagos: 407000 },
  { date: '22 Nov', ventas: 1317500, base: 107000, gastos: 15000, nomina: 209000, proveedores: 416000, totalPagos: 640000 },
  { date: '23 Nov', ventas: 876000, base: 380000, gastos: 0, nomina: 215000, proveedores: 897700, totalPagos: 1112700 },
  { date: '24 Nov', ventas: 277500, base: 158000, gastos: 0, nomina: 140000, proveedores: 69600, totalPagos: 209600 },
  { date: '25 Nov', ventas: 341500, base: 150000, gastos: 0, nomina: 140000, proveedores: 78200, totalPagos: 218200 },
  { date: '26 Nov', ventas: 283500, base: 195000, gastos: 2000, nomina: 110000, proveedores: 201000, totalPagos: 313000 },
  { date: '27 Nov', ventas: 203000, base: 165000, gastos: 0, nomina: 170000, proveedores: 263700, totalPagos: 433700 },
  { date: '28 Nov', ventas: 401000, base: 112000, gastos: 106000, nomina: 110000, proveedores: 173500, totalPagos: 389500 },
  { date: '29 Nov', ventas: 1594000, base: 180000, gastos: 0, nomina: 200000, proveedores: 1298000, totalPagos: 1498000 },
  { date: '30 Nov', ventas: 1134000, base: 216000, gastos: 0, nomina: 340000, proveedores: 653000, totalPagos: 993000 }
];

const dataDiciembre = [
  { date: '1 Dic', ventas: 250600, base: 207000, gastos: 0, nomina: 130000, proveedores: 125900, totalPagos: 255900 },
  { date: '2 Dic', ventas: 717500, base: 180000, gastos: 12000, nomina: 165000, proveedores: 156500, totalPagos: 333500 },
  { date: '3 Dic', ventas: 404000, base: 204000, gastos: 13700, nomina: 135000, proveedores: 592200, totalPagos: 740900 },
  { date: '4 Dic', ventas: 215000, base: 175000, gastos: 3000, nomina: 105000, proveedores: 81600, totalPagos: 189600 },
  { date: '5 Dic', ventas: 456000, base: 170000, gastos: 81000, nomina: 170000, proveedores: 630500, totalPagos: 881500 },
  { date: '6 Dic', ventas: 1487800, base: 90000, gastos: 50000, nomina: 255000, proveedores: 558300, totalPagos: 863300 },
  { date: '7 Dic', ventas: 1042000, base: 120000, gastos: 3900, nomina: 245000, proveedores: 866000, totalPagos: 1114900 },
  { date: '8 Dic', ventas: 314000, base: 70000, gastos: 0, nomina: 200000, proveedores: 65000, totalPagos: 265000 },
  { date: '9 Dic', ventas: 114500, base: 150000, gastos: 24000, nomina: 105000, proveedores: 304600, totalPagos: 433600 },
  { date: '10 Dic', ventas: 439900, base: 170000, gastos: 0, nomina: 165000, proveedores: 275800, totalPagos: 440800 },
  { date: '11 Dic', ventas: 447500, base: 200000, gastos: 0, nomina: 110000, proveedores: 179600, totalPagos: 289600 },
  { date: '12 Dic', ventas: 755000, base: 235000, gastos: 2800, nomina: 185000, proveedores: 544500, totalPagos: 732300 },
  { date: '13 Dic', ventas: 1511500, base: 220000, gastos: 114000, nomina: 136000, proveedores: 1307700, totalPagos: 1557700 },
  { date: '14 Dic', ventas: 1386500, base: 280000, gastos: 0, nomina: 508000, proveedores: 209200, totalPagos: 717200 },
  { date: '15 Dic', ventas: 445500, base: 300000, gastos: 0, nomina: 117000, proveedores: 326600, totalPagos: 443600 },
  { date: '16 Dic', ventas: 318500, base: 300000, gastos: 15000, nomina: 135000, proveedores: 253250, totalPagos: 403250 },
  { date: '17 Dic', ventas: 338000, base: 300000, gastos: 0, nomina: 90000, proveedores: 229000, totalPagos: 319000 },
  { date: '18 Dic', ventas: 442500, base: 300000, gastos: 0, nomina: 140000, proveedores: 214900, totalPagos: 354900 },
  { date: '19 Dic', ventas: 567500, base: 300000, gastos: 10000, nomina: 195000, proveedores: 814980, totalPagos: 1019980 },
  { date: '20 Dic', ventas: 1525000, base: 300000, gastos: 32000, nomina: 200000, proveedores: 602100, totalPagos: 834100 },
  { date: '21 Dic', ventas: 1157500, base: 300000, gastos: 0, nomina: 335000, proveedores: 678600, totalPagos: 1013600 },
  { date: '22 Dic', ventas: 299500, base: 300000, gastos: 0, nomina: 145000, proveedores: 579900, totalPagos: 724900 },
  { date: '23 Dic', ventas: 376000, base: 300000, gastos: 12500, nomina: 185000, proveedores: 144200, totalPagos: 341700 },
  { date: '24 Dic', ventas: 629000, base: 300000, gastos: 7000, nomina: 137000, proveedores: 200846, totalPagos: 344846 },
  { date: '25 Dic', ventas: 0, base: 0, gastos: 0, nomina: 0, proveedores: 0, totalPagos: 0 },
  { date: '26 Dic', ventas: 689000, base: 300000, gastos: 0, nomina: 293000, proveedores: 669050, totalPagos: 962050 },
  { date: '27 Dic', ventas: 1436500, base: 300000, gastos: 0, nomina: 196000, proveedores: 821630, totalPagos: 1017630 },
  { date: '28 Dic', ventas: 1319000, base: 300000, gastos: 0, nomina: 265000, proveedores: 191700, totalPagos: 456700 },
  { date: '29 Dic', ventas: 773000, base: 300000, gastos: 493100, nomina: 107000, proveedores: 685947, totalPagos: 1286047 },
  { date: '30 Dic', ventas: 599000, base: 300000, gastos: 1526636, nomina: 236000, proveedores: 123900, totalPagos: 1886536 },
  { date: '31 Dic', ventas: 519000, base: 300000, gastos: 0, nomina: 150000, proveedores: 249500, totalPagos: 399500 },
];

// PASO 1: Combinar todos los arrays de datos en uno solo
const combinedData = [
  ...dataSeptiembre, 
  ...dataOctubre, 
  ...dataNoviembre,
  ...dataDiciembre,
];

const db = {
  sep: { id: 'sep', label: 'Septiembre 2025', shortLabel: 'Sep 2025', data: dataSeptiembre, range: '13 Sep - 30 Sep' },
  oct: { id: 'oct', label: 'Octubre 2025', shortLabel: 'Oct 2025', data: dataOctubre, range: '1 Oct - 31 Oct' },
  nov: { id: 'nov', label: 'Noviembre 2025', shortLabel: 'Nov 2025', data: dataNoviembre, range: '1 Nov - 30 Nov' },
  dic: { id: 'dic', label: 'Diciembre 2025', shortLabel: 'Dic 2025', data: dataDiciembre, range: '1 Dic - 31 Dic' },
  all: { id: 'all', label: 'Todo el Historial', shortLabel: 'Total', data: combinedData, range: '13 Sep - 31 Dic' }


};

// --- CONFIGURACIÓN VISUAL ---

const COLORS = {
  ventas: '#10b981', 
  gastos: '#f59e0b', 
  nomina: '#3b82f6', 
  proveedores: '#ef4444', 
  totalPagos: '#6366f1', 
  base: '#8b5cf6', 
};

const PIE_COLORS = [COLORS.gastos, COLORS.nomina, COLORS.proveedores];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Card = ({ title, value, icon: Icon, colorClass, subtext }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 print:border-slate-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <div className={`p-2 rounded-full ${colorClass} bg-opacity-10 print:bg-opacity-100 print:text-white`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-200 shadow-lg rounded-lg text-sm z-50">
        <p className="font-bold text-slate-700 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="capitalize">{entry.name}:</span>
            <span className="font-mono font-medium">{formatCurrency(entry.value)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FinancialDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('dic');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const currentData = db[selectedMonth];

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Cálculos Totales Dinámicos
  const totals = useMemo(() => {
    return currentData.data.reduce((acc, curr) => ({
      ventas: acc.ventas + curr.ventas,
      gastos: acc.gastos + curr.gastos,
      nomina: acc.nomina + curr.nomina,
      proveedores: acc.proveedores + curr.proveedores,
      totalPagos: acc.totalPagos + curr.totalPagos,
    }), { ventas: 0, gastos: 0, nomina: 0, proveedores: 0, totalPagos: 0 });
  }, [currentData]);

  const netBalance = totals.ventas - totals.totalPagos;
  const pieData = [
    { name: 'Gastos Varios', value: totals.gastos },
    { name: 'Nómina', value: totals.nomina },
    { name: 'Proveedores', value: totals.proveedores },
  ];

  const handleDownload = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans print:bg-white print:p-0">
      {/* Estilos para el PDF */}
      <style>{`
        @media print {
          @page { size: landscape; margin: 10mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-break-inside-avoid { break-inside: avoid; }
          .print-only { display: block !important; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8" id="report-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Reporte Financiero</h1>
            <p className="text-slate-500">Análisis de datos: {currentData.range}</p>
          </div>
          
          <div className="flex items-center gap-3 z-50">
            
            {/* Dropdown de Meses */}
            <div className="relative no-print" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm border border-slate-200 transition-all"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="font-medium min-w-[110px] text-left">{currentData.label}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Seleccionar Periodo</p>
                  </div>
                  {Object.values(db).map((month) => (
                    <button
                      key={month.id}
                      onClick={() => {
                        setSelectedMonth(month.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                    >
                      <span className={`text-sm font-medium ${selectedMonth === month.id ? 'text-indigo-600' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {month.label}
                      </span>
                      {selectedMonth === month.id && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Etiqueta estática para Impresión (reemplaza al dropdown en PDF) */}
            <div className="hidden print:flex gap-2 text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 print:border-0">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 font-medium">{currentData.label}</span>
            </div>
            
            <button 
              onClick={handleDownload}
              className="no-print flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Descargar</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 print-break-inside-avoid">
          <Card 
            title="Total Ventas" 
            value={formatCurrency(totals.ventas)} 
            icon={DollarSign} 
            colorClass="text-emerald-600 bg-emerald-600" 
          />
          <Card 
            title="Total Pagos" 
            value={formatCurrency(totals.totalPagos)} 
            icon={TrendingDown} 
            colorClass="text-indigo-600 bg-indigo-600" 
          />
          <Card 
            title="Balance Neto" 
            value={formatCurrency(netBalance)} 
            icon={Wallet} 
            colorClass={netBalance >= 0 ? "text-emerald-600 bg-emerald-600" : "text-red-600 bg-red-600"}
            subtext={netBalance >= 0 ? "Superávit" : "Déficit"}
          />
          <Card 
            title="Mayor Egreso" 
            value={formatCurrency(totals.proveedores)} 
            icon={CreditCard} 
            colorClass="text-red-500 bg-red-500"
            subtext="Proveedores"
          />
        </div>

        {/* Main Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto print-break-inside-avoid">
          
          {/* Chart: Ventas vs Pagos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2 print:border-slate-300">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">Flujo de Caja Diario</h2>
              <p className="text-sm text-slate-500">Comparativa de Ingresos por Ventas vs Total de Salidas</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.ventas} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={COLORS.ventas} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPagos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.totalPagos} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={COLORS.totalPagos} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="ventas" name="Ventas" stroke={COLORS.ventas} strokeWidth={3} fillOpacity={1} fill="url(#colorVentas)" />
                  <Area type="monotone" dataKey="totalPagos" name="Total Pagos" stroke={COLORS.totalPagos} strokeWidth={3} fillOpacity={1} fill="url(#colorPagos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart: Distribución de Gastos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 print:border-slate-300">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">Distribución de Salidas</h2>
              <p className="text-sm text-slate-500">¿En qué se gastó el dinero?</p>
            </div>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text for Donut */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                   <span className="block text-2xl font-bold text-slate-700">100%</span>
                 </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }}></div>
                      <span className="text-slate-600">{entry.name}</span>
                    </div>
                    <span className="font-medium text-slate-800">{((entry.value / totals.totalPagos) * 100).toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* New Chart: Ventas Diarias (Ingresos Exclusivamente) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 print:break-inside-avoid print:border-slate-300">
           <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">Evolución de Ventas Diarias</h2>
              <p className="text-sm text-slate-500">Análisis detallado del ingreso bruto día por día</p>
           </div>
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="ventas" name="Ventas del Día" fill={COLORS.ventas} radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Detailed Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 print:break-before-page print:border-slate-300">
           <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Detalle de Egresos por Día</h2>
                <p className="text-sm text-slate-500">Composición de pagos (Gastos vs Nómina vs Proveedores)</p>
              </div>
           </div>
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="proveedores" name="Proveedores" stackId="a" fill={COLORS.proveedores} radius={[0,0,4,4]} />
                  <Bar dataKey="nomina" name="Nómina" stackId="a" fill={COLORS.nomina} />
                  <Bar dataKey="gastos" name="Gastos Varios" stackId="a" fill={COLORS.gastos} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Footer for PDF only */}
        <div className="print-only mt-8 pt-8 border-t border-slate-300">
          <div className="flex justify-between items-center text-slate-500 text-sm">
            <p>Generado automáticamente el {today}</p>
            <p className="font-mono">Reporte CONFIDENCIAL - {currentData.label}</p>
          </div>
        </div>

      </div>
    </div>
  );
}