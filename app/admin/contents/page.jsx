"use client";

import { useState, useEffect } from "react";

export default function ContentAdmin() {
  const [contents, setContents] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    category: "",
    releaseYear: "",
    imageUrl: ""
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContents();
  }, []);

  async function fetchContents() {
    setLoading(true);
    const res = await fetch("/api/admin/contents");
    const data = await res.json();
    setContents(data);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const method = isEdit ? "PUT" : "POST";
    const body = isEdit ? { ...form } : { ...form };
    await fetch("/api/admin/contents", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    setForm({ id: null, title: "", description: "", category: "", releaseYear: "", imageUrl: "" });
    setIsEdit(false);
    fetchContents();
  }

  function handleEdit(content) {
    setForm({
      id: content.id,
      title: content.title,
      description: content.description,
      category: content.category?.name || "",
      releaseYear: new Date(content.releaseDate).getFullYear().toString(),
      imageUrl: content.imageUrl || ""
    });
    setIsEdit(true);
  }

  async function handleDelete(id) {
    if (!confirm("Silmek istediğine emin misin?")) return;
    setLoading(true);
    await fetch("/api/admin/contents", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchContents();
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Dizi/Film Yönetimi</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, background: "#f9f9f9", padding: 24, borderRadius: 8, marginBottom: 32 }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Başlık" required style={{ padding: 8 }} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Açıklama" required style={{ padding: 8 }} />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Kategori" required style={{ padding: 8 }} />
        <input name="releaseYear" value={form.releaseYear} onChange={handleChange} placeholder="Yıl" type="number" min="1900" max={new Date().getFullYear()} required style={{ padding: 8 }} />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Görsel URL" type="url" style={{ padding: 8 }} />
        <button type="submit" style={{ background: "#2563eb", color: "white", padding: 12, borderRadius: 6, fontWeight: 600 }} disabled={loading}>
          {isEdit ? "Güncelle" : "Ekle"}
        </button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={{ padding: 8 }}>Görsel</th>
            <th style={{ padding: 8 }}>Başlık</th>
            <th style={{ padding: 8 }}>Kategori</th>
            <th style={{ padding: 8 }}>Yıl</th>
            <th style={{ padding: 8 }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8 }}>
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.title} style={{ width: 48, height: 64, objectFit: "cover", borderRadius: 4 }} />
                ) : (
                  <span style={{ color: "#aaa" }}>Görsel yok</span>
                )}
              </td>
              <td style={{ padding: 8 }}>{c.title}</td>
              <td style={{ padding: 8 }}>{c.category?.name || "-"}</td>
              <td style={{ padding: 8 }}>{new Date(c.releaseDate).getFullYear()}</td>
              <td style={{ padding: 8 }}>
                <button onClick={() => handleEdit(c)} style={{ marginRight: 8, background: "#fbbf24", color: "#222", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>Düzenle</button>
                <button onClick={() => handleDelete(c.id)} style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 