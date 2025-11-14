import { Stack } from "expo-router";
import * as Font from "expo-font"
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    Font.loadAsync({
      "chewy": require("../assets/fonts/Chewy.ttf")
    }).then(() => setLoaded(true))
  }, [])

  if (!loaded) return null

  return <Stack />;
}
