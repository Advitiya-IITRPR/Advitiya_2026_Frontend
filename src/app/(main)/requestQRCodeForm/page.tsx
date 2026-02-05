'use client'
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AdminNavbar from "@/components/adminNavBar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axios from "axios";

export default function EventCreation() {

    const [open, setOpen] = React.useState(false)


    const [submitButtonDisable, setSubmitButtonDisable] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;


        if (!email ) {
            toast.error("All Fields are required");
            return;
        }


        setSubmitButtonDisable(true);

        try {
            await axios.post("/api/accomodationForm/sendQRCode", {
                email:email,
            })
            .then((response) =>{
                toast.success(response.data.message)
            })
            .catch((error) =>{
                toast.error(error.response.data.message)
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong");
            } else {
                toast.error("An unexpected error occurred");
            }
        }

        setSubmitButtonDisable(false);
    };



    return (
        <div>
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-green-300 md:rounded-2xl md:p-8 dark:bg-blue-400 mt-32">
                <h2 className="text-2xl font-bold text-black dark:text-neutral-200 text-center italic ">
                    Advitiya Accomodation Registration Form
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" required />
                    </LabelInputContainer>

                


                    <button
                        className="
                            relative block h-10 w-full rounded-md
                            font-medium text-white
                            mt-2

                            bg-gray-800
                            hover:bg-gray-900

                            disabled:bg-gray-300
                            disabled:text-gray-600
                            disabled:cursor-not-allowed
                        "
                        type="submit"
                        disabled={submitButtonDisable}
                    >
                        {submitButtonDisable ? "Sending Request" : "Send Request"}
                    </button>




                </form>
            </div>
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
