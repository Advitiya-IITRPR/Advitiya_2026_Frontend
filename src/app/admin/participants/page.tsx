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
} from "@tanstack/react-table"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import jsPDF from "jspdf"
import autoTable, { RowInput } from "jspdf-autotable"
import { QRCodeCanvas } from "qrcode.react"
import QrScanner from '@/components/QrCodeScanner'

/* ================= TYPES ================= */

export type User = {
  id: string
  email: string
  userName: string
  isVerified: boolean
  mobileNo: string
  collegeName: string
  mealPending: number
  dateTime: string   // ✅ FIXED (string, not Date)
  paymentStatus: "Pending" | "Completed"
}

type ScanResult =
  | { success: true; data: User }
  | { success: false; error: string }

/* ================= TABLE COLUMNS ================= */

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userName",
    header: "Name",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => (row.getValue("isVerified") ? "Yes" : "No"),
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile",
  },
  {
    accessorKey: "collegeName",
    header: "College",
  },
  {
    accessorKey: "mealPending",
    header: "Meal Pending",
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => {
      const value = row.getValue("dateTime") as string
      return new Date(value).toLocaleString()
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
  },
]

/* ================= MAIN COMPONENT ================= */

export default function ParticipantPage() {
  const [loading, setLoading] = useState(true)
  const [participantsList, setParticipantsList] = useState<User[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [qr, setQr] = useState("")
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
  })

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "1",
        email: "example@example.com",
        userName: "John Doe",
        isVerified: true,
        mobileNo: "9087654321",
        collegeName: "ABC College",
        mealPending: 3,
        dateTime: new Date().toISOString(),
        paymentStatus: "Pending",
      },
    ]

    setParticipantsList(mockUsers)
    setLoading(false)
  }, [])

  /* ================= PDF ================= */

  const handleDownloadPdf = () => {
    const doc = new jsPDF()
    const rows = table.getRowModel().rows

    const body: RowInput[] = rows.map(row => {
      const u = row.original
      return [
        u.id,
        u.userName,
        u.email,
        u.mobileNo,
        u.collegeName,
        u.mealPending.toString(),
        new Date(u.dateTime).toLocaleString(),
        u.paymentStatus,
        u.isVerified ? "Yes" : "No",
      ]
    })

    autoTable(doc, {
      head: [["ID", "Name", "Email", "Mobile", "College", "Meals", "Date", "Payment", "Verified"]],
      body,
    })

    doc.save("participants.pdf")
  }

  /* ================= QR ================= */

  const generateQRCode = async () => {
    setQrLoading(true)
    try {
      const res = await axios.post("/api/admin/generateQRCode", {
        id: "1",
        email: "example@example.com",
      })
      setQr(res.data.data)
      setQrDialogOpen(true)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "QR generation failed")
    } finally {
      setQrLoading(false)
    }
  }

  const handleScan = async (qrData: string) => {
    try {
      const res = await axios.post("/api/admin/verifyQRCode", {
        QRCodeData: qrData,
      })
      setScanResult({ success: true, data: res.data.data })
    } catch (err: any) {
      setScanResult({ success: false, error: "Invalid QR Code" })
    } finally {
      setScanModalOpen(true)
    }
  }

  if (loading) return <LoaderOne />

  /* ================= JSX ================= */

  return (
    <div>
      <AdminNavbar />

      <div className="w-1/2 mt-32 mx-auto">
        <QrScanner onScan={handleScan} />
      </div>

      <Button className="m-4" onClick={generateQRCode} disabled={qrLoading}>
        Generate QR
      </Button>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">QR Code</DialogTitle>
            <DialogDescription className="text-center">
              Required during event entry
            </DialogDescription>
          </DialogHeader>

          {qrLoading ? (
            <div className="animate-spin h-10 w-10 border-2 border-blue-500 rounded-full mx-auto" />
          ) : (
            qr && <QRCodeCanvas value={qr} size={260} />
          )}
        </DialogContent>
      </Dialog>

      {scanModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            {scanResult?.success ? (
              <>
                <h2 className="font-bold text-green-600">Scan Successful ✅</h2>
                <p>Name: {scanResult.data.userName}</p>
                <p>Email: {scanResult.data.email}</p>
                <p>Verified: {scanResult.data.isVerified ? "Yes" : "No"}</p>
              </>
            ) : (
              <h2 className="font-bold text-red-600">Scan Failed ❌</h2>
            )}
            <Button className="mt-4 w-full" onClick={() => setScanModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="m-6">
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
            onChange={e => table.getColumn("userName")?.setFilterValue(e.target.value)}
          />

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
            {table.getRowModel().rows.map(row => (
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
    </div>
  )
}
