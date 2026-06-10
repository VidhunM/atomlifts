export default async function handler(req, res) {
  // Use targetPath from the query, or fallback to req.url if not found
  const targetPath = req.query.targetPath || req.url.replace('/api/proxy', '');
  const finalPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  const targetUrl = `http://3.6.89.246${finalPath}`;

  const options = {
    method: req.method,
    headers: { ...req.headers },
  };

  // Remove headers that might cause issues when proxying
  delete options.headers.host;
  delete options.headers['x-target-path'];

  // Manually pass the body for POST/PUT requests
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, options);
    
    // Copy the response headers back to the client
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
}
