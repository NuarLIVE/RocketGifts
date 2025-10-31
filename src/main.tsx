import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import LoaderScreen from "./components/LoaderScreen";
import ThemeSwitcher from "./components/ThemeSwitcher";

declare global { interface Window { Telegram: any } }

function Root() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.ready();
    }
  }, []);

  if (!loaded) {
    return (
      <LoaderScreen
        durationMs={3600}  // 3.6 сек — можно поставить 3000..4000
        onDone={() => setLoaded(true)}
        soundSrc="/launch.mp3"
        volume={0.6}
      />
    );
  }

  return (
    <>
      <ThemeSwitcher />
      <App />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
