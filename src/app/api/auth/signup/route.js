import prisma from "@/helpers/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" });
    }
    // Find existing email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email already exists!" });
    }

    // TODO: Save user into database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return NextResponse.json({ message: "Account registered successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Please provided some json" });
  }
}
