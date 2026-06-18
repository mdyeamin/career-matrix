import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });
  return session?.user || null;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = session?.session?.token || null;
  console.log("Token  ", token);
  return token;
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin");
  }
  if (user?.role !== role) {
    // await auth.api.signOut({
    //   headers: await headers(),
    // });
    redirect("/unauthorized");
  }
  return user;
};
