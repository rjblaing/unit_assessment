import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const rows = await sql`
      SELECT 
        ua.id,
        ua.subject,
        ua.unit_name,
        ua.status,
        ua.created_at,
        s.first_name || ' ' || s.last_name as student_name,
        s.year_group
      FROM unit_achievements ua
      JOIN students s ON ua.student_id = s.id
      ORDER BY ua.created_at DESC
      LIMIT 10
    `;

    return Response.json(rows);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return Response.json(
      { error: "Failed to fetch recent activity" },
      { status: 500 },
    );
  }
}
