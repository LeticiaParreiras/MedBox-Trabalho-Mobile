import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@farmacia_produtos";

export interface produto {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  receita: boolean;
  imagem?: string;
}

let produtosInicial: produto[] = [
  {
    id: 0,
    nome: "Dipirona 500mg",
    quantidade: 20,
    preco: 12.5,
    receita: false,
    imagem: "",
  },
  {
    id: 1,
    nome: "Amoxicilina 500mg",
    quantidade: 20,
    preco: 25.9,
    receita: false,
    imagem: "",
  },
  {
    id: 2,
    nome: "Paracetamol 500mg",
    quantidade: 20,
    preco: 8.9,
    receita: false,
    imagem: "",
  },
];

let proximoId = 3;

// =========================
// 📌 CARREGAR
// =========================
export const carregarProdutos = async (): Promise<produto[]> => {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);

    if (!dados) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtosInicial));
      console.log("✅ Produtos inicializados");
      return produtosInicial;
    }

    return JSON.parse(dados) ?? [];
  } catch (error) {
    console.error("❌ Erro ao carregar produtos:", error);
    return [];
  }
};

// =========================
// 📌 SALVAR
// =========================
const salvarProdutos = async (produtos: produto[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  } catch (e) {
    console.error("❌ Erro ao salvar produtos:", e);
  }
};

// =========================
// 📌 BUSCAR UM PRODUTO
// =========================
export const buscarProduto = async (id: number) => {
  const produtos = await carregarProdutos();
  return produtos.find((p) => p.id === id) || null;
};

// =========================
// 📌 CRIAR
// =========================
export const criarProduto = async (dados: produto) => {
  const produtos = await carregarProdutos();

  const novoProduto: produto = {
    id: proximoId++,
    nome: dados.nome,
    quantidade: dados.quantidade,
    preco: dados.preco,
    receita: dados.receita,
    imagem: dados.imagem ?? "",
  };

  produtos.push(novoProduto);

  await salvarProdutos(produtos);

  return novoProduto;
};

// =========================
// 📌 ATUALIZAR
// =========================
export const atualizarProduto = async (id: number, dados: produto) => {
  const produtos = await carregarProdutos();

  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) return null;

  produtos[index] = { ...produtos[index], ...dados };

  await salvarProdutos(produtos);
  return produtos[index];
};

// =========================
// 📌 DELETAR
// =========================
export const deletarProduto = async (id: number) => {
  const produtos = await carregarProdutos();

  const novaLista = produtos.filter((p) => p.id !== id);

  await salvarProdutos(novaLista);

  return true;
};
