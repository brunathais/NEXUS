// front-end/src/services/api.js
export const API_BASE = 'http://localhost:8080'; // back Spring Boot

async function handle(res, url){
  if(!res.ok){
    const text = await res.text().catch(()=>'');
    throw new Error(text || `Erro na requisição: ${url} (${res.status})`);
  }
  // pode não vir JSON
  try { return await res.json(); } catch { return {}; }
}

export async function getJSON(pathname){
  const url = pathname.startsWith('http') ? pathname : `${API_BASE}${pathname}`;
  const res = await fetch(url, { method:'GET' });
  return handle(res, url);
}

export async function postJSON(pathname, data){
  const url = pathname.startsWith('http') ? pathname : `${API_BASE}${pathname}`;
  const res = await fetch(url, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(data ?? {})
  });
  return handle(res, url);
}

export async function putJSON(pathname, data){
  const url = pathname.startsWith('http') ? pathname : `${API_BASE}${pathname}`;
  const res = await fetch(url, {
    method:'PUT',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(data ?? {})
  });
  return handle(res, url);
}

export async function deleteJSON(pathname){
  const url = pathname.startsWith('http') ? pathname : `${API_BASE}${pathname}`;
  const res = await fetch(url, { method:'DELETE' });
  return handle(res, url);
}
