const db = require('../config/config');

// Helper function to run queries safely
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error('SQL Error:', err.message, '| SQL:', sql);
        resolve(0); // Return 0 on error instead of crashing
      } else {
        resolve(results[0]?.count ?? results[0] ?? results ?? 0);
      }
    });
  });
};

// Helper to get single row
const runQueryRow = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error('SQL Error:', err.message, '| SQL:', sql);
        resolve(null);
      } else {
        resolve(results[0] || null);
      }
    });
  });
};

// GET /api/dashboard/stats
async function getDashboardStats(req, res) {
  try {
    const [
      totalUsers,
      totalPosts,
      upcomingEvents,
      recentComments,
      pendingComments,
      totalGalleryItems,
      unreadMessages,
      approvedTestimonials,
    ] = await Promise.all([
      runQuery("SELECT COUNT(*) as count FROM users WHERE role != 'admin'"),
      runQuery("SELECT COUNT(*) as count FROM posts WHERE status = 'published'"),
      runQuery("SELECT COUNT(*) as count FROM events WHERE event_date >= CURDATE()"),
      runQuery("SELECT COUNT(*) as count FROM comments WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
      runQuery("SELECT COUNT(*) as count FROM comments WHERE status = 'pending'"),
      runQuery("SELECT COUNT(*) as count FROM gallery"),
      runQuery("SELECT COUNT(*) as count FROM messages WHERE is_read = 0"),
      runQuery("SELECT COUNT(*) as count FROM testimonials WHERE status = 'published'"),
    ]);

    const nextEvent = await runQueryRow(
      "SELECT title, event_date FROM events WHERE event_date >= CURDATE() ORDER BY event_date ASC LIMIT 1"
    );

    return res.json({
      totalUsers,
      totalPosts,
      upcomingEvents,
      recentComments,
      pendingComments,
      totalGalleryItems,
      unreadMessages,
      approvedTestimonials,
      nextEvent,
      recentCommentsList: [],
      recentMessagesList: [],
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return res.status(500).json({
      message: 'Failed to fetch dashboard stats',
      error: err.message,
    });
  }
}

module.exports = { getDashboardStats };