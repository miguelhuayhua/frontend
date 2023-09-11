import Dashboard from "./client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return <Dashboard />;
}
