import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#60BEC8",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen name="filiais" options={{ title: "Filiais" }} />
        <Stack.Screen name="produtos/index" options={{title: "Produtos"}}/>
        <Stack.Screen name="produtos/add" options={{title: "Novo Produto"}}/>
        <Stack.Screen name="pedidos/index" options={{title: "Pedidos"}}/>
        <Stack.Screen name="pedidos/[id]" options={{title: "Detalhe Pedido"}}/>
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
