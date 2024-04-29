import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../../helpers/session";
export default async function Layout({ children }) {
  const user = await getUserFromSession();
  if (user) {
    return redirect("/dashboard");
  }
  return <div>{children}</div>;
}
