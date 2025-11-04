import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import CryptoJS from "crypto-js";
import crypto from "crypto";


export async function POST(req: NextRequest) {
    try {
        const { email, username, password } = await req.json();
        var salt = crypto.randomBytes(32).toString("hex");
        console.log(password);
        console.log(salt);

        const hashedPass = CryptoJS.SHA256(password + salt).toString()

        const { error } = await supabase.from("users").insert([
            {
                email,
                username,
                password: hashedPass,
                salt
            }
        ]);

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json({ success: false, message: "Username already exists" },
                    { status: 401 });
            }
            else {
                return NextResponse.json({ success: false, message: "Database error" },
                    { status: 500 });
            }
        }
        else {
            return NextResponse.json({ success: true, message: "Signup complete"} );
        }
    }
    catch (error) {
        console.log("Error occured: ", error);
        return NextResponse.json({ success: false, message: error});
    }
}
