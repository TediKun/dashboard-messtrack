import ExcelJS from 'exceljs';
import { FinanceTransaction, Arrear, User } from '@/types/database';

export async function exportFinanceExcel(
  transactions: FinanceTransaction[],
  arrears: Arrear[],
  users: User[],
  currentBalance: number
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'MessTrack AI & Finance System';
  workbook.lastModifiedBy = 'MessTrack';
  workbook.created = new Date();
  workbook.modified = new Date();

  const userMap = new Map<string, string>();
  users.forEach((u) => userMap.set(u.id, u.name));

  // ---------------------------------------------------------------------------
  // SHEET 1: Pemasukan Kas
  // ---------------------------------------------------------------------------
  const sheetIncome = workbook.addWorksheet('Pemasukan Kas', {
    views: [{ showGridLines: true }],
  });

  sheetIncome.columns = [
    { header: 'No', key: 'no', width: 6 },
    { header: 'Tanggal', key: 'date', width: 16 },
    { header: 'Penghuni / Sumber', key: 'user', width: 26 },
    { header: 'Jenis', key: 'type', width: 18 },
    { header: 'Keterangan', key: 'desc', width: 36 },
    { header: 'Nominal (Rp)', key: 'amount', width: 20 },
  ];

  // Header styling
  const incomeHeaderRow = sheetIncome.getRow(1);
  incomeHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  incomeHeaderRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF10B981' }, // Emerald-500
  };
  incomeHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
  incomeHeaderRow.height = 28;

  const incomeTxs = transactions.filter(
    (t) => t.type === 'income' || t.type === 'fine_payment'
  );

  let totalIncome = 0;
  incomeTxs.forEach((tx, idx) => {
    totalIncome += Number(tx.amount);
    const dateFormatted = new Date(tx.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const userName = tx.user_id ? userMap.get(tx.user_id) || 'Penghuni Mess' : 'Umum / Kas';
    const typeLabel = tx.type === 'fine_payment' ? 'Bayar Denda' : 'Uang Kas / WiFi';

    const row = sheetIncome.addRow({
      no: idx + 1,
      date: dateFormatted,
      user: userName,
      type: typeLabel,
      desc: tx.description,
      amount: Number(tx.amount),
    });

    row.getCell('amount').numFmt = '#,##0';
    row.alignment = { vertical: 'middle' };
  });

  // Total Row for Income
  const totalIncomeRow = sheetIncome.addRow({
    no: '',
    date: '',
    user: '',
    type: '',
    desc: 'TOTAL PEMASUKAN',
    amount: totalIncome,
  });
  totalIncomeRow.font = { bold: true };
  totalIncomeRow.getCell('amount').numFmt = '#,##0';
  totalIncomeRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE6F4EA' },
  };

  // ---------------------------------------------------------------------------
  // SHEET 2: Pengeluaran
  // ---------------------------------------------------------------------------
  const sheetExpense = workbook.addWorksheet('Pengeluaran', {
    views: [{ showGridLines: true }],
  });

  sheetExpense.columns = [
    { header: 'No', key: 'no', width: 6 },
    { header: 'Tanggal', key: 'date', width: 16 },
    { header: 'Dicatat Oleh', key: 'user', width: 26 },
    { header: 'Keterangan Pengeluaran', key: 'desc', width: 38 },
    { header: 'Nominal (Rp)', key: 'amount', width: 20 },
  ];

  const expenseHeaderRow = sheetExpense.getRow(1);
  expenseHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  expenseHeaderRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFEF4444' }, // Red-500
  };
  expenseHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
  expenseHeaderRow.height = 28;

  const expenseTxs = transactions.filter((t) => t.type === 'expense');
  let totalExpense = 0;
  expenseTxs.forEach((tx, idx) => {
    totalExpense += Number(tx.amount);
    const dateFormatted = new Date(tx.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const userName = tx.user_id ? userMap.get(tx.user_id) || 'Penghuni' : 'Kas Mess';

    const row = sheetExpense.addRow({
      no: idx + 1,
      date: dateFormatted,
      user: userName,
      desc: tx.description,
      amount: Number(tx.amount),
    });

    row.getCell('amount').numFmt = '#,##0';
    row.alignment = { vertical: 'middle' };
  });

  // Total Row for Expense
  const totalExpenseRow = sheetExpense.addRow({
    no: '',
    date: '',
    user: '',
    desc: 'TOTAL PENGELUARAN',
    amount: totalExpense,
  });
  totalExpenseRow.font = { bold: true };
  totalExpenseRow.getCell('amount').numFmt = '#,##0';
  totalExpenseRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFCE8E6' },
  };

  // ---------------------------------------------------------------------------
  // SHEET 3: Rekap Denda / Tunggakan
  // ---------------------------------------------------------------------------
  const sheetArrears = workbook.addWorksheet('Rekap Denda & Tunggakan', {
    views: [{ showGridLines: true }],
  });

  sheetArrears.columns = [
    { header: 'No', key: 'no', width: 6 },
    { header: 'Nama Penghuni', key: 'name', width: 26 },
    { header: 'Jenis Tagihan', key: 'type', width: 20 },
    { header: 'Periode (Bulan/Tahun)', key: 'period', width: 24 },
    { header: 'Nominal Tagihan (Rp)', key: 'amount', width: 22 },
    { header: 'Status Pembayaran', key: 'status', width: 20 },
  ];

  const arrearsHeaderRow = sheetArrears.getRow(1);
  arrearsHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  arrearsHeaderRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF8B5CF6' }, // Violet-500
  };
  arrearsHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
  arrearsHeaderRow.height = 28;

  let totalUnpaidArrears = 0;
  arrears.forEach((arr, idx) => {
    if (!arr.is_paid) {
      totalUnpaidArrears += Number(arr.amount_due);
    }
    const userName = userMap.get(arr.user_id) || 'Penghuni';
    const typeLabel = arr.type === 'kas_wifi' ? 'Kas Mess + WiFi (65k)' : 'Denda Piket';
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
    const period = `${monthNames[arr.month - 1] || arr.month} ${arr.year}`;

    const row = sheetArrears.addRow({
      no: idx + 1,
      name: userName,
      type: typeLabel,
      period: period,
      amount: Number(arr.amount_due),
      status: arr.is_paid ? 'LUNAS' : 'BELUM DIBAYAR',
    });

    row.getCell('amount').numFmt = '#,##0';
    row.getCell('status').font = {
      bold: true,
      color: { argb: arr.is_paid ? 'FF10B981' : 'FFEF4444' },
    };
    row.alignment = { vertical: 'middle' };
  });

  const totalArrearsRow = sheetArrears.addRow({
    no: '',
    name: '',
    type: '',
    period: 'TOTAL BELUM DIBAYAR',
    amount: totalUnpaidArrears,
    status: '',
  });
  totalArrearsRow.font = { bold: true };
  totalArrearsRow.getCell('amount').numFmt = '#,##0';
  totalArrearsRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF3E8FF' },
  };

  // Generate buffer and trigger browser download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Laporan_Keuangan_MessTrack_${new Date().toISOString().split('T')[0]}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}

