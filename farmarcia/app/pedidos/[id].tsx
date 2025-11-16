import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Image
} from "react-native";
import {
  ChevronLeft,
  User,
  Package,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react-native";
import {
  buscarPedido,
  atualizarStatusPedido,
  deletarPedido,
  pedidos,
  Status,
} from "@/scripts/PedidosService";
import { formatDate } from "@/scripts/data";
import { useLocalSearchParams, router } from "expo-router";
import { buscarProduto, produto } from "@/scripts/produtosService";

export default function DetalhesPedido() {
  const { id } = useLocalSearchParams();
  const [pedido, setPedido] = useState<pedidos | null>(null);
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<produto[]>([])
  

  const statusColors: { [key: string]: string } = {
    [Status.Entrega]: "#FCD34D",
    [Status.Entregue]: "#34D399",
    [Status.Cancelado]: "#EF4444",
    [Status.Confirmado]: "#10B981",
  };

  const statusIcons: { [key: string]: any } = {
    [Status.Entrega]: Truck,
    [Status.Entregue]: CheckCircle,
    [Status.Cancelado]: XCircle,
    [Status.Confirmado]: Package,
  };

  useEffect(() => {
    carregarPedido();
  }, [id]);

  const carregarPedido = async () => {
    try {
  setLoading(true);
  const pedidoEncontrado = await buscarPedido(Number(id));
  setPedido(pedidoEncontrado);
  let listaProdutos: produto[] = [];
  if (pedidoEncontrado?.produtos && pedidoEncontrado.produtos.length > 0) {
    const produtosPromises = pedidoEncontrado.produtos.map((item) =>
      buscarProduto(item.id)
    );
    const produtosResolvidos = await Promise.all(produtosPromises);
    listaProdutos = produtosResolvidos;
  }

  setProdutos(listaProdutos);
} catch (erro) {
  console.error("Erro ao carregar pedido:", erro);
  Alert.alert("Erro", "Não foi possível carregar o pedido");
} finally {
  setLoading(false);
}

  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    );
  }

  if (!pedido) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorText}>Pedido não encontrado</Text>
          <TouchableOpacity style={styles.voltarButton} onPress={() => router.back()}>
            <Text style={styles.voltarButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const corStatus = statusColors[pedido.status] || "#6B7280";
  const IconeStatus = statusIcons[pedido.status] || Package;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card do Status */}
        <View style={styles.statusCard}>
          <View
            style={[
              styles.statusIconBox,
              { backgroundColor: corStatus + "20" },
            ]}
          >
            <IconeStatus size={32} color={corStatus} strokeWidth={2} />
          </View>
          <Text style={styles.statusLabel}>Status atual</Text>
          <Text style={[styles.statusTexto, { color: corStatus }]}>
            {pedido.status}
          </Text>
          <Text style={styles.pedidoNumero}>Pedido #{pedido.id}</Text>
        </View>

        {/* Informações do Cliente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do cliente</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconBox}>
                <User size={20} color="#4F46E5" strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Cliente</Text>
                <Text style={styles.infoValue}>{pedido.cliente}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconBox}>
                <Calendar size={20} color="#4F46E5" strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Data do pedido</Text>
                <Text style={styles.infoValue}>{formatDate(pedido.createdAt)}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconBox}>
                <Clock size={20} color="#4F46E5" strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Última atualização</Text>
                <Text style={styles.infoValue}>{formatDate(pedido.updatedAt)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Produtos */}
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <View style={styles.produtosCard}>
            {produtos.map((produto, index) => (
              <View key={index}>
    <View style={styles.produtoRow}>
      <Image
        source={
          !produto.imagem || produto.imagem === ""
            ? require("@/assets/images/remedio.png")
            : { uri: produto.imagem }
        }
        style={styles.productImage}
        resizeMode="contain"
      />
                  <View style={styles.produtoInfo}>
                    <Text style={styles.produtoNome}>Produto {produto.nome}</Text>
                    <Text style={styles.produtoQuantidade}>
                      Quantidade: {produto.quantidade}
                    </Text>
                  </View>
                </View>
                {index < pedido.produtos.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>
      

        {/* Resumo Financeiro */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo financeiro</Text>
          <View style={styles.financeiroCard}>
            <View style={styles.financeiroRow}>
              <Text style={styles.financeiroLabel}>Subtotal</Text>
              <Text style={styles.financeiroValue}>R$ {pedido.total.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.financeiroRow}>
              <Text style={styles.financeiroLabel}>Taxa de entrega</Text>
              <Text style={styles.financeiroValue}>R$ 5.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.financeiroRowTotal}>
              <DollarSign size={24} color="#059669" strokeWidth={2.5} />
              <Text style={styles.financeiroLabelTotal}>Total</Text>
              <Text style={styles.financeiroValueTotal}>
                R$ {(pedido.total + 5).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 24,
  },
  voltarButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  voltarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 32,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statusIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  statusTexto: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pedidoNumero: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },
  produtosCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  produtoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  produtoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  produtoQuantidade: {
    fontSize: 13,
    color: "#6B7280",
  },
  financeiroCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  financeiroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  financeiroLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  financeiroValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  financeiroRowTotal: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 8,
  },
  financeiroLabelTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  financeiroValueTotal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#059669",
  },
  statusButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  statusButtonAtivo: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
    productImage: {
    width: 50,
    height: 50,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});