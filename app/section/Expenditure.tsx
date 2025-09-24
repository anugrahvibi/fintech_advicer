"use client";

import { useState } from "react";
import { Transaction, TransactionForm, TransactionsList } from "../Components/TransactionForm";

export default function Expenditure() {
  const [items, setItems] = useState<Transaction[]>([]);

  return (
    <main className="container">
      <h1 className="app-title">Money Tracker</h1>

      <div className="layout">
        <section className="left">
          <TransactionForm onAdd={(t) => setItems((prev) => [t, ...prev])} />
        </section>
        <section className="right">
          <div className="summary-cards">
            <div className="card">
              <div className="label">Income</div>
              <div className="value">₹{items.filter((i) => i.type === "income").reduce((a, b) => a + b.amount, 0)}</div>
            </div>
            <div className="card">
              <div className="label">Expense</div>
              <div className="value">₹{items.filter((i) => i.type === "expense").reduce((a, b) => a + b.amount, 0)}</div>
            </div>
          </div>
          <TransactionsList items={items} />
        </section>
      </div>
    </main>
  );
}