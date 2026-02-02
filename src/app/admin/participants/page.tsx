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
import { ArrowUpDown, ChevronDown } from "lucide-react"
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
    DialogTrigger,
} from "@/components/ui/dialog"
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import Image from "next/image";
import QrScanner from '@/components/QrCodeScanner'
import QrModal from '@/components/QRMode'
import { QRCodeCanvas } from 'qrcode.react';

// ---------------------- TYPES ----------------------

export type user = {
    id: string,
    email: string,
    userName: string,
    isVerified: boolean,
    mobileNo: string,
    collegeName: string,
    mealPending: number,
    dateTime: Date,
    paymentStatus: "Pending" | "Completed"
}


// ---------------------- COLUMNS ----------------------
const columns: ColumnDef<user>[] = [
    {
        accessorKey: "id",
        header: "id",
        enableHiding: false,
    },
    {
        accessorKey: "userName",
        header: "userName",
        cell: ({ row }) => <div>{row.getValue("userName")}</div>
    },
    {
        accessorKey: "isVerified",
        header: "isVerified",
        cell: ({ row }) => (
            <div>
                {row.getValue("isVerified") ? "Yes" : "No"}
            </div>
        )
    }
    ,
    {
        accessorKey: "mobileNo",
        header: "mobileNo",
        cell: ({ row }) => <div>{row.getValue("mobileNo")}</div>
    },
    {
        accessorKey: "collegeName",
        header: "collegeName",
        cell: ({ row }) => <div>{row.getValue("collegeName")}</div>
    },
    {
        accessorKey: "mealPending",
        header: "mealPending",
        cell: ({ row }) => <div>{row.getValue("mealPending")}</div>
    },
    {
        accessorKey: "dateTime",
        header: "Date & Time",
        cell: ({ row }) => {
            const value = row.getValue("dateTime") as Date;

            return (
                <div>
                    {value.toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: "paymentStatus",
        header: "paymentStatus",
        cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>
    },
];


type ScanResult =
    | { success: true; data: user }
    | { success: false; error: string };

// ---------------------- MAIN COMPONENT ----------------------
export default function PaticipantPage() {
    const [loading, setLoading] = useState(true)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ id: false })
    const [rowSelection, setRowSelection] = useState({})
    const [participantsList, setParticipantsList] = useState<user[]>([]);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [qrCodeLoading, setQRCodeLoading] = useState(false);
    const [qr, setQr] = useState('');


    const table = useReactTable({
        data: participantsList,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    useEffect(() => {
        // axios.get("/api/participant/getAllParticipants")
        //     .then((response) => setParticipantsList(response.data.data))
        //     .catch((error) => toast.error(error.response.data.message))
        //     .finally(() => setLoading(false))

        const usersList: user[] = [
            {
                id: "1",
                email: "example@example.com",
                userName: "John Doe",
                isVerified: true,
                mobileNo: "9087654321",
                collegeName: "ABC College",
                mealPending: 3,
                dateTime: new Date(),
                paymentStatus: "Pending",
            },
        ];


        setParticipantsList(usersList)
        setLoading(false)

    }, [])


    // ---------------------- PDF DOWNLOAD ----------------------
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const rows = table.getRowModel().rows;

        const headers = [
            "ID",
            "Name",
            "Email",
            "Mobile",
            "College",
            "Meal Pending",
            "Date & Time",
            "Payment Status",
            "isVerified"
        ];

        const body: RowInput[] = [];

        rows.forEach((row) => {
            const user = row.original as user;

            const dateTime = new Date(user.dateTime).toLocaleString();

            body.push([
                { content: user.id, styles: { halign: "center" } },
                { content: user.userName },
                { content: user.email },
                { content: user.mobileNo },
                { content: user.collegeName },
                { content: String(user.mealPending), styles: { halign: "center" } },
                { content: dateTime },
                { content: user.paymentStatus, styles: { halign: "center" } },
                { content: user.isVerified ? "Yes" : "No" }
            ]);
        });

        doc.setFontSize(14);
        doc.text("Participants Report", 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [headers],
            body,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
            columnStyles: { 0: { halign: "center" }, 5: { halign: "center" }, 7: { halign: "center" } },
        });

        doc.save("participants-report.pdf");
    };

    const generateQRCode = async () => {
        setQRCodeLoading(true);
        await axios.post(`/api/admin/generateQRCode`, {
            id: 1,
            email: "example@example.com",

        })
            .then((response) => {
                console.log(response.data)
                setQr(response.data.data)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
            .finally(() => setQRCodeLoading(false))

    }

    const handleScan = async (qrData: string) => {
        try {
            const res = await axios.post("/api/admin/verifyQRCode", {
                QRCodeData: qrData,
            });

            const data: user = res.data.data;

            setScanResult({ success: true, data });
            setIsOpen(true);
        } catch (err: any) {
            setScanResult({ success: false, error: err?.message || "Scan failed" });
            setIsOpen(true);
        }
    };


    if (loading) return <LoaderOne />;

    return (
        <div>
            <AdminNavbar />

            <div className='w-50 mt-30'>
                <QrScanner onScan={handleScan} />
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => generateQRCode()}>QR</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center font-bold">QR Code</DialogTitle>
                        <DialogDescription className="font-bold text-center">
                            This QR Code is Required during event.
                        </DialogDescription>
                        {qrCodeLoading ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 dark:border-orange-200"></div>
                        ) : (
                            <QRCodeCanvas
                                value={qr}
                                size={window.innerWidth < 640 ? 200 : 300}
                            />

                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            {isOpen && (
                <div className="qr-modal-overlay">
                    <div className="qr-modal">
                        {scanResult?.success ? (
                            <>
                                <h2 className="qr-modal-title">Scan Successful ✅</h2>

                                <div className="qr-modal-body">
                                    <p><strong>ID:</strong> {scanResult.data.id}</p>
                                    <p><strong>Email:</strong> {scanResult.data.email}</p>
                                    <p><strong>Username:</strong> {scanResult.data.userName}</p>
                                    <p><strong>Verified:</strong> {scanResult.data.isVerified ? "True" : "False"}</p>
                                    <p><strong>Mobile:</strong> {scanResult.data.mobileNo}</p>
                                    <p><strong>College:</strong> {scanResult.data.collegeName}</p>
                                    <p><strong>Meal Pending:</strong> {scanResult.data.mealPending}</p>
                                    <p><strong>DateTime:</strong> {new Date(scanResult.data.dateTime).toLocaleString()}</p>
                                    <p><strong>Payment:</strong> {scanResult.data.paymentStatus}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="qr-modal-title">Scan Failed ❌</h2>
                                <p className="qr-modal-error">{scanResult?.error || "Invalid QR code"}</p>
                            </>
                        )}

                        <button className="qr-modal-close" onClick={() => setIsOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}



            <div className="mt-32 m-4">
                <h1 className="text-center font-bold text-2xl italic">
                    Participants Entries
                </h1>

                <div className="w-full">
                    <div className="flex items-center py-4 justify-between gap-10">
                        <Input
                            placeholder="Filter User..."
                            value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
                            onChange={(e) =>
                                table.getColumn("userName")?.setFilterValue(e.target.value)
                            }
                            className="max-w-sm"
                        />

                        <Button onClick={handleDownloadPdf}>
                            Download as PDF
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Columns <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                {table.getAllColumns()
                                    .filter(col => col.getCanHide())
                                    .map(col => (
                                        <DropdownMenuCheckboxItem
                                            key={col.id}
                                            className="capitalize"
                                            checked={col.getIsVisible()}
                                            onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                        >
                                            {col.id}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>

                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
