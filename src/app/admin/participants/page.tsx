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
import Image from "next/image"; // ⭐ REQUIRED FIX

// ---------------------- TYPES ----------------------
export type event = {
    description: string,
    eventDateAndTime: Date,
    eventName: string,
    eventFees: number,
    eventImage: string,
    id: string,
    isRegistrationOpen: boolean,
    maxSize: number,
    minSize: number,
    webPageLink: string
}

export type user = {
    id: string,
    email: string,
    userName: string,
    isVerified: boolean,
    mobileNo: string,
}

export type participant = {
    id: string,
    EventParticipated: event,
    TeamName: string,
    participants: user[]
};

// ---------------------- COLUMNS ----------------------
const columns: ColumnDef<participant>[] = [
    {
        accessorKey: "id",
        header: "id",
        enableHiding: false,
    },
    {
        accessorKey: "TeamName",
        header: "Team Name",
        cell: ({ row }) => <div>{row.getValue("TeamName")}</div>
    },
    {
        accessorFn: (row) => row.EventParticipated.eventName,
        id: "EventParticipated",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Event <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => {
            const eventDetails: event = row.original.EventParticipated;
            return (
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline">{eventDetails.eventName}</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-center">
                                    {eventDetails.eventName}
                                </DialogTitle>

                                <div className="flex gap-3 items-start">
                                    <DialogDescription className="text-center">
                                        <span className="font-bold">Date:</span> {new Date(eventDetails.eventDateAndTime).toDateString()} <br />
                                        <span className="font-bold">Time:</span> {new Date(eventDetails.eventDateAndTime).toLocaleTimeString()} <br />
                                        <span className="font-bold">Event Fees:</span> {eventDetails.eventFees} <br />
                                        <span className="font-bold">Web Page Link:</span>{" "}
                                        <a
                                            href={eventDetails.webPageLink.startsWith("http")
                                                ? eventDetails.webPageLink
                                                : `http://${eventDetails.webPageLink}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline"
                                        >
                                            Link
                                        </a>
                                        <br />
                                        <span className="font-bold">Registration:</span>{" "}
                                        {eventDetails.isRegistrationOpen ? "Open" : "Closed"} <br />
                                        <span className="font-bold">Team Min Size:</span> {eventDetails.minSize} <br />
                                        <span className="font-bold">Team Max Size:</span> {eventDetails.maxSize}
                                    </DialogDescription>

                                    {/* ⭐ Next.js Optimized Image */}
                                    <Image
                                        src={eventDetails.eventImage}
                                        width={100}
                                        height={100}
                                        alt={eventDetails.eventName}
                                        className="rounded-md object-cover"
                                    />
                                </div>
                            </DialogHeader>

                            <div className="grid gap-4">
                                <div className="grid gap-3 text-center">
                                    {eventDetails.description}
                                </div>
                            </div>
                        </DialogContent>
                    </form>
                </Dialog>
            );
        },
    },
    {
        accessorKey: "participants",
        header: () => <div>Participants</div>,
        cell: ({ row }) => {
            const participantArr: user[] = row.getValue("participants");

            return (
                <div className="flex gap-x-2 flex-wrap">
                    {participantArr.map((participant) => (
                        <Dialog key={participant.id}>
                            <form>
                                <DialogTrigger asChild>
                                <Button variant="outline">{participant.userName}</Button>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-center">
                                            {participant.userName}
                                        </DialogTitle>

                                        <DialogDescription className="text-center">
                                            <span className="font-bold">Email:</span> {participant.email} <br />
                                            <span className="font-bold">Mobile:</span> {participant.mobileNo}
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </form>
                        </Dialog>
                    ))}
                </div>
            );
        },
    }
];

// ---------------------- MAIN COMPONENT ----------------------
export default function PaticipantPage() {
    const [loading, setLoading] = useState(true)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ id: false })
    const [rowSelection, setRowSelection] = useState({})
    const [participantsList, setParticipantsList] = useState([])

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
        axios.get("/api/participant/getAllParticipants")
            .then((response) => setParticipantsList(response.data.data))
            .catch((error) => toast.error(error.response.data.message))
            .finally(() => setLoading(false))
    }, [])


    // ---------------------- PDF DOWNLOAD ----------------------
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const rows = table.getRowModel().rows;

        const headers = [
            "Team Name",
            "Event Name",
            "Event Date",
            "Participant Name",
            "Email",
            "Mobile",
        ];

        const body: RowInput[] = [];

        let teamColorToggle = false;

        rows.forEach((row) => {
            const team = row.original;
            const teamName = team.TeamName;
            const event = team.EventParticipated;

            const eventName = event?.eventName || "";
            const eventDate = new Date(event?.eventDateAndTime || "").toDateString();

            const rowColor: [number, number, number] =
                teamColorToggle ? [230, 247, 255] : [255, 245, 230];

            teamColorToggle = !teamColorToggle;

            team.participants.forEach((p, index) => {
                const rowData: RowInput = [
                    { content: index === 0 ? teamName : "", styles: { halign: "center", fillColor: rowColor } },
                    { content: index === 0 ? eventName : "", styles: { fillColor: rowColor } },
                    { content: index === 0 ? eventDate : "", styles: { fillColor: rowColor } },
                    { content: p.userName, styles: { fillColor: rowColor } },
                    { content: p.email, styles: { fillColor: rowColor } },
                    { content: p.mobileNo, styles: { fillColor: rowColor } },
                ];

                body.push(rowData);
            });
        });

        doc.setFontSize(14);
        doc.text("Participants Report", 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [headers],
            body: body,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
            columnStyles: { 0: { halign: "center" } },
        });

        doc.save("participants-report.pdf");
    };

    if (loading) return <LoaderOne />;

    return (
        <div>
            <AdminNavbar />

            <div className="mt-32 m-4">
                <h1 className="text-center font-bold text-2xl italic">
                    Participants Entries
                </h1>

                <div className="w-full">
                    <div className="flex items-center py-4 justify-between gap-10">
                        <Input
                            placeholder="Filter Event..."
                            value={(table.getColumn("EventParticipated")?.getFilterValue() as string) ?? ""}
                            onChange={(e) =>
                                table.getColumn("EventParticipated")?.setFilterValue(e.target.value)
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
