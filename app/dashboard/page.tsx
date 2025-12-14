import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect("/auth/login")

  return (
    <div className="min-h-screen">
      <h1>Dashboard</h1>
      <p>Logged in as: {user.email}</p>
    </div>
  )
}
