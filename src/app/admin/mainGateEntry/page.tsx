'use client'

import AdminNavbar from '@/components/adminNavBar'
import { LoaderOne } from '@/components/ui/loader'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import jsPDF from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { QRCodeCanvas } from 'qrcode.react'
import QrScanner from '@/components/QrCodeScanner'

/* ================= TYPES ================= */

export type User = {
  id: string
  entryId: number
  userName: string
  email: string
  mobileNo: string
  collegeName: string
  paymentVerified: boolean
  paymentMade: number
  entryType: 'Entry' | 'Exit'
  dateTime: string
}

export type Response = {
  id: number
  accomodationDetails: any
  entryType: 'Entry' | 'Exit'
  createdAt: string
  updatedAt: string
}

type ScanResult =
  | { success: true; data: Response }
  | { success: false; error: string }

/* ================= TABLE COLUMNS ================= */

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', enableHiding: true },
  { accessorKey: 'entryId', header: 'ID' },
  { accessorKey: 'userName', header: 'Name' },
  {
    accessorKey: 'entryType',
    header: 'Entry Type',
    cell: ({ row }) => (
      <span
        className={
          row.getValue('entryType') === 'Entry'
            ? 'text-green-600 font-semibold'
            : 'text-red-600 font-semibold'
        }
      >
        {row.getValue('entryType')}
      </span>
    ),
  },
  { accessorKey: 'mobileNo', header: 'Mobile' },
  { accessorKey: 'collegeName', header: 'College' },
  {
    accessorKey: 'paymentVerified',
    header: 'Payment Verified',
    cell: ({ row }) => (row.getValue('paymentVerified') ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'dateTime',
    header: 'Date & Time',
    cell: ({ row }) => {
      const d = new Date(row.getValue('dateTime'))
      return `${d.toLocaleDateString('en-GB')} ${d.toLocaleTimeString()}`
    },
  },
]

/* ================= MAIN COMPONENT ================= */

export default function ParticipantPage() {
  const [loading, setLoading] = useState(true)
  const [participantsList, setParticipantsList] = useState<User[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [entryType, setEntryType] = useState<'Entry' | 'Exit' | ''>('')

  const [qr, setQr] = useState('')
  const [qrLoading, setQrLoading] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scanModalOpen, setScanModalOpen] = useState(false)

  /* ================= TABLE ================= */

  const table = useReactTable({
    data: participantsList,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  })

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const fetchGateEntries = async () => {
      try {
        const res = await axios.get('/api/admin/getGateEntries')

        const mapped: User[] = res.data.data.map((entry: any) => {
          const u = entry.accomodationDetails
          return {
            id: u.id,
            entryId: entry.id,
            userName: u.userName,
            email: u.email.trim(),
            mobileNo: u.mobileNo,
            collegeName: u.collegeName,
            paymentVerified: u.paymentVerified,
            paymentMade: u.paymentMade,
            entryType: entry.entryType,
            dateTime: entry.createdAt,
          }
        })

        setParticipantsList(mapped)
      } catch {
        toast.error('Error while fetching gate entries')
      } finally {
        setLoading(false)
      }
    }

    fetchGateEntries()
  }, [])

  /* Jump to last page on new scan */
  useEffect(() => {
    table.setPageIndex(table.getPageCount() - 1)
  }, [participantsList])

  /* ================= PDF ================= */

  const handleDownloadPdf = () => {
    const doc = new jsPDF()
    const rows = table.getSortedRowModel().rows

    doc.setFontSize(16)
    doc.text('Gate Entries Report', doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })

    const body: RowInput[] = rows.map(row => {
      const u = row.original
      return [
        u.entryId,
        u.userName,
        u.email,
        u.mobileNo,
        u.collegeName,
        u.entryType,
        u.paymentMade,
        u.paymentVerified ? 'Yes' : 'No',
        new Date(u.dateTime).toLocaleString('en-GB'),
      ]
    })

    autoTable(doc, {
      startY: 25,
      head: [['ID', 'Name', 'Email', 'Mobile', 'College', 'Entry Type', 'Payment', 'Verified', 'Date']],
      body,
    })

    doc.save('Gate_Entries.pdf')
  }

  /* ================= QR ================= */

  const handleScan = async (qrData: string) => {
    if (!entryType) {
      toast.error('Please select Entry or Exit before scanning')
      return
    }

    try {
      const res = await axios.post('/api/admin/verifyGateEntry', {
        QRCodeData: qrData,
        entryType,
      })

      const scanData = res.data.data

      setParticipantsList(prev => [
        ...prev,
        {
          id: scanData.accomodationDetails.id,
          entryId: scanData.id,
          userName: scanData.accomodationDetails.userName,
          email: scanData.accomodationDetails.email.trim(),
          mobileNo: scanData.accomodationDetails.mobileNo,
          collegeName: scanData.accomodationDetails.collegeName,
          paymentVerified: scanData.accomodationDetails.paymentVerified,
          paymentMade: scanData.accomodationDetails.paymentMade,
          entryType: scanData.entryType,
          dateTime: scanData.createdAt,
        },
      ])

      setScanResult({ success: true, data: scanData })
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Invalid QR Code')
      setScanResult({ success: false, error: 'Invalid QR Code' })
    } finally {
      setScanModalOpen(true)
    }
  }

  if (loading) return <LoaderOne />

  /* ================= JSX ================= */

  return (
    <div>
      <AdminNavbar />

      {/* Entry Type Selector */}
      <div className="flex justify-center gap-4 my-6 mt-32 text-white">
        <span className="font-semibold mt-2">Entry Type:</span>
        <select
          className="border rounded px-3 py-2 text-black bg-white"
          value={entryType}
          onChange={e => setEntryType(e.target.value as any)}
        >
          <option value="">Select</option>
          <option value="Entry">Entry</option>
          <option value="Exit">Exit</option>
        </select>
      </div>

      {/* QR Scanner */}
      <div className="w-1/2 lg:w-full mx-auto text-center">
        <QrScanner
          onScan={(qrData: string) => {
            if (!entryType) {
              toast.error('Please select Entry or Exit before scanning')
              return
            }
            handleScan(qrData)
          }}
        />

      </div>

      {/* ================= TABLE ================= */}

      <div className="m-6">
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn('userName')?.getFilterValue() as string) ?? ''}
            onChange={e => table.getColumn('userName')?.setFilterValue(e.target.value)}
            className="w-full"
          />

          <Button onClick={handleDownloadPdf}>Download PDF</Button>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id}>
                {hg.headers.map(h => (
                  <TableHead key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getPaginationRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================= PAGINATION ================= */}

      <div className="m-6 flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
