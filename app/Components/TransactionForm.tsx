"use client";

import React,{ useEffect, useMemo, useState } from "react";

//firebase imports
import {db} from '../firebaseConfig'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { title } from "process";




type TransactionType = "income" | "expense";

type Category =
  | "Others"
  | "Bills and Utilities"
  | "Food and Drinks"
  | "Entertainment"
  | "Investments"
  | "Transportation";

export type Transaction = {
  id: string;
  type: TransactionType;
  date: string; // ISO date
  time: string; // HH:mm
  amount: number;
  title: string;
  category: Category;
  note?: string;
};

const CATEGORY_OPTIONS: { label: Category; color: string }[] = [
  { label: "Others", color: "#cbd5e1" },
  { label: "Bills and Utilities", color: "#fde68a" },
  { label: "Food and Drinks", color: "#93c5fd" },
  { label: "Entertainment", color: "#fde68a" },
  { label: "Investments", color: "#a7f3d0" },
  { label: "Transportation", color: "#93c5fd" },
];

export function TransactionForm({
  onAdd,
}: {
  onAdd: (t: Transaction) => void;
}) {
  const now = useMemo(() => new Date(), []);
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState(now.toISOString().slice(0, 10));
  const [time, setTime] = useState(
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  );
  const [amount, setAmount] = useState<string>("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Others");
  const [note, setNote] = useState("");

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const parsed = Number(amount);
  if (!Number.isFinite(parsed) || parsed <= 0) return;

  const tx: Transaction = {
    id: `${Date.now()}`,
    type,
    date,
    time,
    amount: parsed,
    title: title.trim() || (type === "income" ? "Income" : "Expense"),
    category,
    note: note.trim() || undefined,
  };

  try {
    await addDoc(collection(db, "transactions"), {
      ...tx,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Transaction saved to Firestore:", tx);
    onAdd(tx); // Optional: update UI state
    setAmount("");
    setTitle("");
    setNote("");
  } catch (error) {
    console.error("❌ Error saving transaction:", error);
  }
}


  return (
    <form className="tx-shell" onSubmit={handleSubmit} noValidate>

      <div className="tx-mode">
        <button type="button" className={type === "income" ? "pill active" : "pill"} onClick={() => setType("income")}>Income</button>
        <button type="button" className={type === "expense" ? "pill active" : "pill"} onClick={() => setType("expense")}>Expense</button>
      </div>

      <div className="tx-datetime">
        <div className="chip-like">
          <span className="icon">📅</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="chip-like">
          <span className="icon">⏰</span>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>

      <div className="tx-amount-wrap">
        <label className="amount-label">{type === "expense" ? "Expense Amount" : "Income Amount"}</label>
        <div className="amount-row">
          <input
            className="amount-input"
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>
      </div>

      <label className="tx-field">
        <span>Title</span>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <div className="tx-category">
        <div className="category-head">
          <span>Category: <strong>{category}</strong></span>
          <div className="category-actions">
            <button className="cursor-pointer rounded hover:bg-gray-500"  type="button" aria-label="add">＋</button>
          </div>
        </div>
        <div className="tx-chips">
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setCategory(c.label)}
              className={category === c.label ? "chip active" : "chip"}
              style={{ backgroundColor: category === c.label ? c.color : "transparent" }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <label className="tx-field">
        <span>Note</span>
        <textarea rows={3} placeholder="Optional" value={note} onChange={(e) => setNote(e.target.value)} />
      </label>

      <div className="tx-sticky">
        <button type="submit" className="primary large">✓ Save</button>
      </div>
    </form>
  );
}

export function TransactionsList({ items }: { items: Transaction[] }) {

const handleSave = async () => {
  try {
    await addDoc(collection(db, "myCollection"), {
      ...items,          // your form fields
      createdAt: new Date() // optional: timestamp
    });
    console.log("hello",items);
    
    console.log("✅ Data saved to Firestore!");
  } catch (error) {
    console.error("❌ Error saving document:", error);
  }
};

useEffect(() => {
  handleSave
}, [items])



  if (items.length === 0) {
    return <div className="tx-empty">No transactions yet.</div>;
  }
  return (
    <ul className="tx-list">
      {items.map((t) => (
        <li key={t.id} className="tx-list-item">
          <div className="tx-list-main">
            <div className="tx-title">{t.title}</div>
            <div className="tx-sub">{t.category} • {t.date} {t.time}</div>
          </div>
          <div className={t.type === "expense" ? "tx-amount neg" : "tx-amount pos"}>
            {t.type === "expense" ? "-" : "+"}₹{t.amount}
          </div>
        </li>
      ))}
    </ul>
  );
}


