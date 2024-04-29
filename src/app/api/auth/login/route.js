import { NextResponse } from "next/server";
import prisma from "../../../../helpers/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json({
        code: 400,
        message: "All fields are required!",
      });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ code: 400, message: "Invalid credentials" });
    }

    if (password !== user.password) {
      return NextResponse.json({ code: 400, message: "Invalid credentials" });
    }

    const tokenData = {
      name: user.name,
      id: user.id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    cookies().set("token", token, { httpOnly: true, secure: true });

    return NextResponse.json({ code: 200, message: "Successfully logged in" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ code: 500, message: "something went wrong" });
  }
}
