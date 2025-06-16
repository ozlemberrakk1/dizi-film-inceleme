"use client";
import { useState, useEffect } from "react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setLoading(true);
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Yorumu silmek istediğine emin misin?")) return;
    setLoading(true);
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    fetchReviews();
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Yorum Yönetimi</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={{ padding: 8 }}>Kullanıcı</th>
            <th style={{ padding: 8 }}>Film/Dizi</th>
            <th style={{ padding: 8 }}>Yorum</th>
            <th style={{ padding: 8 }}>Tarih</th>
            <th style={{ padding: 8 }}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8 }}>{r.user?.name || "-"}</td>
              <td style={{ padding: 8 }}>{r.movie?.title || "-"}</td>
              <td style={{ padding: 8 }}>{r.content}</td>
              <td style={{ padding: 8 }}>{new Date(r.createdAt).toLocaleString("tr-TR")}</td>
              <td style={{ padding: 8 }}>
                <button onClick={() => handleDelete(r.id)} style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 