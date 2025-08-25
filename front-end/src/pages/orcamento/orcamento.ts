type BRLString = string;

interface Orcamento {
    id: number;
    mesRef: string;
    nome: string;
    essenciais: string;
    naoEssenciais: string;
    imprevistos: string;
    reservaEmergencia: string;
    total: BRLString;
    dataCriacao: string;
    dataAtualizacao: string;
}

const STORAGE_KEY = 'orcamentos:v1';

const dom = {
    form: document.getElementById("formOrcamento") as HTMLFormElement,
    mesRef: document.getElementById("mesRef") as HTMLInputElement,
    nome: document.getElementById("nome") as HTMLInputElement,
    essenciais: document.getElementById("essenciais") as HTMLInputElement,
    naoEssenciais: document.getElementById("naoEssenciais") as HTMLInputElement,
    imprevistos: document.getElementById("imprevistos") as HTMLInputElement,
    reserva: document.getElementById("reservaEmergencia") as HTMLInputElement,
    lista: document.getElementById("listaOrcamentos") as HTMLTableSectionElement,
    templateLinhaTabela: document.getElementById("templateLinhaTabelaOrcamento") as HTMLTemplateElement,
    chips: document.getElementById("chipsResumo") as HTMLDivElement,
    btnAtualizar: document.getElementById("btnAtualizar") as HTMLButtonElement,
    btnExportar: document.getElementById("btnExportar") as HTMLButtonElement,
}

const brl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function parseBRLToCents(value: string): number {
    if (!value) return 0;
    const digits = value.replace(/\D/g, '');
    if (!digits) return 0;
    const cents = parseInt(digits, 10);
    return isNaN(cents) ? 0 : cents;
}

function centsToBRL(cents: number): BRLString {
    return brl.format((cents || 0) / 100);
}

function attachBRLMask(input: HTMLInputElement) {
    input.addEventListener('input', () => {
        const cents = parseBRLToCents(input.value);
        input.value = centsToBRL(cents);
    });
    input.addEventListener('blur', () => {
        const cents = parseBRLToCents(input.value);
        input.value = centsToBRL(cents);
    }
    }

//Storage

function readAll(): Orcamento[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw) as Orcamento[];
        return Array.isArray(arr) ? arr : [];
    } catch {
        return [];
    }
}
function writeAll(list: Orcamento[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

