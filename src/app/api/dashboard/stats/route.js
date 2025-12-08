import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const [studentStats] = await sql`
      SELECT COUNT(*) as total_students
      FROM students
      WHERE year_group IN ('S1', 'S2', 'S3')
    `;

    const [monthlyStats] = await sql`
      SELECT COUNT(*) as units_this_month
      FROM unit_achievements
      WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
    `;

    const [totalPassStats] = await sql`
      SELECT COUNT(*) as total_passed
      FROM unit_achievements
      WHERE status = 'Pass'
    `;

    const pendingReviews = 0;

    return Response.json({
      total_students: parseInt(studentStats.total_students),
      units_this_month: parseInt(monthlyStats.units_this_month),
      pending_reviews: pendingReviews,
      total_passed: parseInt(totalPassStats.total_passed),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return Response.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
