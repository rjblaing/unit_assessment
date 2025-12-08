import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const rows = await sql`
      SELECT 
        s.id,
        s.student_id,
        s.first_name,
        s.last_name,
        s.year_group,
        s.created_at,
        COUNT(ua.id) as units_count
      FROM students s
      LEFT JOIN unit_achievements ua ON s.id = ua.student_id
      WHERE s.year_group IN ('S1', 'S2', 'S3')
      GROUP BY s.id, s.student_id, s.first_name, s.last_name, s.year_group, s.created_at
      ORDER BY s.year_group, s.last_name, s.first_name
    `;

    return Response.json(rows);
  } catch (error) {
    console.error("Error fetching students:", error);
    return Response.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}
