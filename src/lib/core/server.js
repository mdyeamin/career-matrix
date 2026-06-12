"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const serverMutation = async (path,data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json()
};
