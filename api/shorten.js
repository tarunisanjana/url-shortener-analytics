const validator = require('validator');
const { nanoid } = require('nanoid');
const pool = require('./db');

module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {

    let { url } = req.body;

// Automatically add https:// if missing
if (
  !url.startsWith('http://') &&
  !url.startsWith('https://')
) {
  url = `https://${url}`;
}

    // Check if empty
    if (!url) {
      return res.status(400).json({
        error: 'URL is required'
      });
    }

    // Check if valid URL
    if (!validator.isURL(url)) {
      return res.status(400).json({
        error: 'Invalid URL'
      });
    }

    // Generate short code
    const shortCode = nanoid(6);

    // Insert into database
    const result = await pool.query(
      `INSERT INTO urls (short_code, original_url)
       VALUES ($1, $2)
       RETURNING *`,
      [shortCode, url]
    );

    res.status(201).json({
      message: 'Short URL created successfully',
      short_code: shortCode,
      original_url: url
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
};