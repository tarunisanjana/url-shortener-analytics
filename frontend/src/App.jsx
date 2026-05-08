import { useState } from 'react';
import axios from 'axios';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

function App() {

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [analytics, setAnalytics] = useState(null);

  // Create short URL
  const handleShorten = async () => {

    try {

      const res = await axios.post(
        'http://localhost:3000/api/shorten',
        { url }
      );

      setShortUrl(res.data.short_code);

    } catch (err) {

      console.error(err);
      alert('Error shortening URL');

    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        `http://localhost:3000/api/analytics?code=${shortUrl}`
      );

      setAnalytics(res.data);

    } catch (err) {

      console.error(err);
      alert('Error fetching analytics');

    }
  };

  // Copy link
  const copyLink = async () => {

    await navigator.clipboard.writeText(
      `http://localhost:3000/api/redirect?code=${shortUrl}`
    );

    alert('Copied to clipboard!');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial'
      }}
    >
      <div
        style={{
          background: '#1e293b',
          padding: '40px',
          borderRadius: '16px',
          width: '500px',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)'
        }}
      >

        <h1
  style={{
    marginBottom: '50px',
    fontSize: '43px'
  }}
>
  URL Shortener Analytics
</h1>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}

          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleShorten();
            }
          }}

          style={{
          width: '95%',
          padding: '12px',
          borderRadius: '8px',
  border: 'none',
  marginBottom: '25px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
}}
        />

        <button
          onClick={handleShorten}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: '#3b82f6',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Shorten
        </button>

        {shortUrl && (
          <div style={{ marginTop: '25px' }}>

            <h3>Short URL</h3>

            <a
              href={`http://localhost:3000/api/redirect?code=${shortUrl}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#60a5fa' }}
            >
              {`http://localhost:3000/api/redirect?code=${shortUrl}`}
            </a>

            <br />
            <br />

            <button
              onClick={copyLink}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '15px'
              }}
            >
              Copy Link
            </button>

            <br />

            <button
              onClick={fetchAnalytics}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: '#22c55e',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              View Analytics
            </button>
          </div>
        )}

        {analytics && (
          <div style={{ marginTop: '30px' }}>

            <h2>Analytics</h2>

            <p>
              Total Clicks: {analytics.url.click_count}
            </p>

            <h3>Browser Stats</h3>

            <ul>
              {analytics.browser_stats.map((item, index) => (
                <li key={index}>
                  {item.browser}: {item.clicks}
                </li>
              ))}
            </ul>

            <PieChart width={300} height={300}>
              <Pie
                data={analytics.browser_stats}
                dataKey="clicks"
                nameKey="browser"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {analytics.browser_stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <h3>Device Stats</h3>

            <ul>
              {analytics.device_stats.map((item, index) => (
                <li key={index}>
                  {item.device}: {item.clicks}
                </li>
              ))}
            </ul>

            <BarChart
              width={400}
              height={300}
              data={analytics.device_stats}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" />
            </BarChart>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;