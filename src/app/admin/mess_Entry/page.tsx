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
  id: string                // accomodationDetails.id (UUID)
  entryId: number           // response.data.data id (1,2,3...)
  userName: string
  email: string
  mobileNo: string
  collegeName: string
  paymentVerified: boolean
  paymentMade: number
  mealsLeft: number
  mealTaken: number
  dateTime: string
}


export type Response = {
  id: number
  accomodationDetails: User
  mealsLeft: number,
  createdAt: string
  updatedAt: string
}

type ScanResult =
  | { success: true; data: Response }
  | { success: false; error: string }

/* ================= TABLE COLUMNS ================= */

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    enableHiding: true
  },
  {
    accessorKey: 'entryId',
    header: 'id',
  },
  {
    accessorKey: 'userName',
    header: 'Name',
  },
  {
    accessorKey: 'paymentVerified',
    header: 'Payment Verified',
    cell: ({ row }) => (row.getValue('paymentVerified') ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'mobileNo',
    header: 'Mobile',
  },
  {
    accessorKey: 'collegeName',
    header: 'College',
  },
  {
    accessorKey: 'mealsLeft',
    header: 'Meals Left',
  },
  {
    accessorKey: 'mealTaken',
    header: 'Meals Taken',
  },
  {
    accessorKey: 'dateTime',
    header: 'Date & Time',
    cell: ({ row }) => {
      const value = row.getValue('dateTime') as string
      const date = new Date(value)

      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      return `${day}/${month}/${year} ${hours}:${minutes}`
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
    id: false
  })
  const [rowSelection, setRowSelection] = useState({})

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
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  })

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const fetchMessEntries = async () => {
      try {
        const res = await axios.get('/api/admin/getMessEntries')

        const mappedUsers: User[] = res.data.data.map((entry: any) => {
          const u = entry.accomodationDetails

          return {
            id: u.id,             // UUID used for update
            entryId: entry.id,    // Display ID
            userName: u.userName,
            email: u.email.trim(),
            mobileNo: u.mobileNo,
            collegeName: u.collegeName,
            paymentVerified: u.paymentVerified,
            paymentMade: u.paymentMade,
            mealTaken: u.mealTaken,
            mealsLeft: entry.mealsLeft,
            dateTime: entry.createdAt,
          }
        })



        setParticipantsList(mappedUsers)
      } catch (error) {
        console.error(error)
        toast.error('Error while fetching the entries')
      } finally {
        setLoading(false)
      }
    }
    fetchMessEntries()
  }, [])

  useEffect(() => {
    // jump to last page whenever participantsList changes
    table.setPageIndex(table.getPageCount() - 1)
  }, [participantsList])



  /* ================= PDF ================= */

  const handleDownloadPdf = () => {
    const doc = new jsPDF()

    // ALL rows (with filtering + sorting, without pagination)
    const rows = table.getSortedRowModel().rows

    const title = "Mess Entries Report"
    doc.setFontSize(16)
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    })

    const body: RowInput[] = rows.map(row => {
      const u = row.original
      return [
        u.entryId,
        u.userName,
        u.email,
        u.mobileNo,
        u.collegeName,
        u.mealsLeft.toString(),
        (() => {
          const date = new Date(u.dateTime)

          const day = String(date.getDate()).padStart(2, '0')
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const year = date.getFullYear()

          const hours = String(date.getHours()).padStart(2, '0')
          const minutes = String(date.getMinutes()).padStart(2, '0')
          const seconds = String(date.getSeconds()).padStart(2, '0')

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
        })(),
        u.paymentMade,
        u.paymentVerified ? 'Yes' : 'No',
      ]
    })

    autoTable(doc, {
      startY: 25,
      head: [['ID', 'Name', 'Email', 'Mobile', 'College', 'Meals Left', 'Date', 'Payment', 'Verified']],
      body,
    })

    doc.save('Mess_Entries.pdf')
  }




  /* ================= QR ================= */

  const generateQRCode = async () => {
    setQrLoading(true)
    try {
      const res = await axios.post('/api/admin/generateQRCode', {
        id: 'cba92ac3-4ea9-4f56-96a2-a2f299750041',
      })
      setQr(res.data.data)
      setQrDialogOpen(true)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'QR generation failed')
    } finally {
      setQrLoading(false)
    }
  }

  const handleScan = async (qrData: string) => {
    try {
      const res = await axios.post('/api/admin/verifyMessEntry', {
        QRCodeData: qrData,
      })

      const scanData = res.data.data

      // Append NEW entry to table
      setParticipantsList(prev => [
        ...prev,
        {
          id: scanData.accomodationDetails.id,
          entryId: scanData.id,                       // top-level entry id
          userName: scanData.accomodationDetails.userName,
          email: scanData.accomodationDetails.email.trim(),
          mobileNo: scanData.accomodationDetails.mobileNo,
          collegeName: scanData.accomodationDetails.collegeName,
          paymentVerified: scanData.accomodationDetails.paymentVerified,
          paymentMade: scanData.accomodationDetails.paymentMade,
          mealTaken: scanData.accomodationDetails.mealTaken,
          mealsLeft: scanData.mealsLeft,
          dateTime: scanData.createdAt,
        }
      ])

      setScanResult({ success: true, data: scanData })
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Invalid QR Code')
      setScanResult({
        success: false,
        error: error?.response?.data?.message || 'Invalid QR Code',
      })
    } finally {
      setScanModalOpen(true)
    }
  }



  if (loading) return <LoaderOne />

  /* ================= JSX ================= */

  return (
    <div>
      <AdminNavbar />

      <div className="w-1/2 lg:w-full mt-33 text-center mx-auto">
        <QrScanner onScan={handleScan} />
      </div>

      <Button className="m-4" onClick={generateQRCode} disabled={qrLoading}>
        Generate QR
      </Button>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-center">QR Code</DialogTitle>
            <DialogDescription className="text-center">
              Required during event entry
            </DialogDescription>
          </DialogHeader>

          {qrLoading ? (
            <div className="animate-spin h-10 w-10 border-2 border-blue-500 rounded-full mx-auto" />
          ) : (
            qr && <QRCodeCanvas value={qr} size={260} className="bg-white" />
          )}
        </DialogContent>
      </Dialog>

      {scanModalOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 text-black">
            {scanResult?.success ? (
              <>
                <h2 className="font-bold text-green-600">Scan Successful ✅</h2>
                <p>Name: {scanResult.data.accomodationDetails.userName}</p>
                <p>Email: {scanResult.data.accomodationDetails.email}</p>
                <p>College: {scanResult.data.accomodationDetails.collegeName}</p>
                <p>Payment Verified: {scanResult.data.accomodationDetails.paymentVerified ? 'Yes' : 'No'}</p>
                <p>Payment Made: {scanResult.data.accomodationDetails.paymentMade}</p>
                <p>Meals Left: {scanResult.data.mealsLeft}</p>
              </>
            ) : (
              <>
                <h2 className="font-bold text-red-600">Scan Failed ❌</h2>
                <p className="font-bold text-red-600">{scanResult?.error}</p>
              </>
            )}
            <Button className="mt-4 w-full" onClick={() => setScanModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="m-6">
        <div className="flex flex-col gap-4 mb-4 lg:flex-row lg:items-center lg:justify-between">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn('userName')?.getFilterValue() as string) ?? ''}
            onChange={e =>
              table.getColumn('userName')?.setFilterValue(e.target.value)
            }
            className="sm:w-full md:w-3/4"
          />

          <div className="flex gap-2">
            <Button onClick={handleDownloadPdf}>Download PDF</Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {table.getAllColumns().map(col => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={v => col.toggleVisibility(!!v)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

      <div className="m-6 flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          First
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span className="text-sm font-medium">
          Page{" "}
          <span className="text-blue-600">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="text-blue-600">
            {table.getPageCount()}
          </span>
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last
        </Button>

        <span className="flex items-center gap-2">
          <span className="text-sm">Show</span>
          <select
            className="border rounded px-2 py-1"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </span>
      </div>


    </div>
  )
}
