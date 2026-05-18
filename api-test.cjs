const http = require('http');

function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8090,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const cookies = res.headers['set-cookie'];
          resolve({ status: res.statusCode, data: JSON.parse(body), cookies });
        } catch(e) {
          resolve({ status: res.statusCode, data: body, cookies: res.headers['set-cookie'] });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  // Login first
  const loginRes = await apiCall('POST', '/api/auth/signin', { username: 'admin', password: 'admin' });
  console.log('Login status:', loginRes.status);
  
  // Get the session cookie
  const cookies = loginRes.cookies || [];
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
  console.log('Cookies:', cookieStr);
  
  // Now get theme settings using the cookie
  const http2 = require('http');
  function apiWithCookie(method, path, data) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 8090,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookieStr
        }
      };
      const req = http2.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch(e) {
            resolve({ status: res.statusCode, data: body });
          }
        });
      });
      req.on('error', reject);
      if (data) req.write(JSON.stringify(data));
      req.end();
    });
  }
  
  // Get activated theme
  const themeRes = await apiWithCookie('GET', '/apis/api.console.halo.run/v1alpha1/themes?sort=creationTimestamp%2Cdesc');
  console.log('Themes status:', themeRes.status);
  
  if (themeRes.data && themeRes.data.items) {
    const activeTheme = themeRes.data.items.find(t => t.spec && t.spec.activationTime);
    if (activeTheme) {
      console.log('Active theme:', activeTheme.metadata.name);
      
      // Get theme settings
      const settingsRes = await apiWithCookie('GET', `/apis/api.console.halo.run/v1alpha1/themes/${activeTheme.metadata.name}/setting`);
      console.log('Settings status:', settingsRes.status);
      console.log('Settings:', JSON.stringify(settingsRes.data).substring(0, 500));
    }
  }
}

main().catch(console.error);
