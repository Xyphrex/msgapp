import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();


    if (email === "test@example.com" && password === "123456") {
      return NextResponse.json({ success: true, message: "Login successful" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
