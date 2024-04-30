import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import prisma from "../../helpers/db";
import { getUserFromSession } from "../../helpers/session";

export default async function Dashboard() {
  const user = await getUserFromSession();
  if (!user) {
    return redirect("/login");
  }

  const handleLogout = async () => {
    "use server";
    cookies().set("token", "", { expires: new Date(0) });
  };

  return (
    <div>
      <div className="flex justify-between px-10 screen ">
        <h3>Dashboard</h3>
        <p>{user.name}</p>
      </div>
      <form action={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
