
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CalendarForm from "./CalendarForm";

export default async function CalendarPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/"); // localhost:3000
    }

    async function handleAction(prevState: any, formData: FormData) {
        "use server";

        const session = await getServerSession(authOptions);
        if (!session) {
          return { success: false, error: "Unauthorized" };
        }

        const text = formData.get("query") as string;

        if (!text) {
            return { success: false };
        }

        const res = await fetch("http://localhost:5555/api/summary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body is server → server so secure
            body: JSON.stringify({ text }),
            cache: "no-store",
          });

          const data = await res.json();

          console.log("Server Action Response: ", data);

          return { success: true} ;
          //revalidatePath("/calendar");
    }

    return (
        <main style={{ padding: 20 }}>
        <h1>Calendar Page</h1>
  
        <CalendarForm action={handleAction} />
      </main>
    );
  }