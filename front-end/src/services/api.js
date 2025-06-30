export async function postJSON(url, data) {
    const response = await fetch(url, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

if(!response.ok){
const text = await response.text();
throw new Error(text || `Erro na requisição para ${url}`);
}

return response.json().catch(() => ({}));  // caso não tenha corpo JSON
}
    