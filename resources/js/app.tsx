import "./bootstrap";
import "../css/index.css"

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import Layout from "@/components/layout/Layout";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
    let page = pages[`./pages/${name}.tsx`];
    // @ts-ignore
    page.default.layout = page.default.layout || (page => <Layout children={page} />);

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
