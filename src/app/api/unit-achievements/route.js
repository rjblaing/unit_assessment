import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const rows = await sql`
      SELECT 
        ua.id,
        ua.subject,
        ua.unit_name,
        ua.unit_code,
        ua.status,
        ua.file_url,
        ua.created_at,
        s.first_name || ' ' || s.last_name as student_name,
        s.year_group,
        s.student_id as student_code
      FROM unit_achievements ua
      JOIN students s ON ua.student_id = s.id
      ORDER BY ua.created_at DESC
    `;

    return Response.json(rows);
  } catch (error) {
    console.error("Error fetching unit achievements:", error);
    return Response.json(
      { error: "Failed to fetch unit achievements" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { student_id, subject, unit_name, unit_code, status, file_url } =
      body;

    if (!student_id || !subject || !unit_name || !unit_code || !status) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!["Pass", "Fail"].includes(status)) {
      return Response.json(
        { error: "Status must be either Pass or Fail" },
        { status: 400 },
      );
    }

    const rows = await sql`
      INSERT INTO unit_achievements (student_id, subject, unit_name, unit_code, status, file_url)
      VALUES (${student_id}, ${subject}, ${unit_name}, ${unit_code}, ${status}, ${file_url || null})
      RETURNING id, student_id, subject, unit_name, unit_code, status, file_url, created_at
    `;

    return Response.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating unit achievement:", error);
    return Response.json(
      { error: "Failed to create unit achievement" },
      { status: 500 },
    );
  }
}
