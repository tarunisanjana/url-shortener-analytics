const pool = require('./db');
const UAParser = require('ua-parser-js');

module.exports = async (req, res) => {
  try {

    // Get short code from URL
    const { code } = req.query;

    // Find URL in database
    const result = await pool.query(
      `SELECT * FROM urls WHERE short_code = $1`,
      [code]
    );

    // If code not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Short URL not found'
      });
    }

    const url = result.rows[0];

    // Detect browser/device
    const parser = new UAParser(req.headers['user-agent']);

    const browser = parser.getBrowser().name || 'Unknown';

    const device =
      parser.getDevice().type || 'desktop';

    // Record click analytics
    await pool.query(
      `INSERT INTO clicks (url_id, browser, device)
       VALUES ($1, $2, $3)`,
      [url.id, browser, device]
    );

    // Increment click count
    await pool.query(
      `UPDATE urls
       SET click_count = click_count + 1
       WHERE id = $1`,
      [url.id]
    );

    // Redirect user
    return res.redirect(url.original_url);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });
  }
};