import { createRoot } from "react-dom/client";
import App from "./App";
import './sass/main.scss';

const el = document.getElementById("root");
const root = createRoot(el!);

root.render(<App />);
