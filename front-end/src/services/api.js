export async function postJSON(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Erro na requisição para ${url}`);
    }

    return response.json().catch(() => ({}));
}

// Novo helper para requisições GET
export async function getJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Erro na requisição GET para ${url}`);
    }
    return response.json();
}
