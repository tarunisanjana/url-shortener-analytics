const pool = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {

    const { code } = req.query;

    // Get URL info
    const urlResult = await pool.query(
      `SELECT * FROM urls
       WHERE short_code = $1`,
      [code]
    );

    if (urlResult.rows.length === 0) {
      return res.status(404).json({
        error: 'URL not found'
      });
    }

    const url = urlResult.rows[0];

    // Browser analytics
    const browserStats = await pool.query(
      `SELECT browser, COUNT(*) as clicks
       FROM clicks
       WHERE url_id = $1
       GROUP BY browser`,
      [url.id]
    );

    // Device analytics
    const deviceStats = await pool.query(
      `SELECT device, COUNT(*) as clicks
       FROM clicks
       WHERE url_id = $1
       GROUP BY device`,
      [url.id]
    );

    // Recent clicks
    const recentClicks = await pool.query(
      `SELECT clicked_at, browser, device
       FROM clicks
       WHERE url_id = $1
       ORDER BY clicked_at DESC
       LIMIT 10`,
      [url.id]
    );

    return res.status(200).json({
      url,
      browser_stats: browserStats.rows,
      device_stats: deviceStats.rows,
      recent_clicks: recentClicks.rows
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });
  }
};