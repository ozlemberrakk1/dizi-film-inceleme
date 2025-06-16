"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function MessagesPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) fetchMessages();
    // eslint-disable-next-line
  }, [selectedUser]);

  async function fetchUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  }

  async function fetchMessages() {
    setLoading(true);
    const res = await fetch("/api/messages");
    const data = await res.json();
    // Sadece seçili kullanıcı ile olan mesajları filtrele
    setMessages(data.filter(m => (m.sender.id === selectedUser.id || m.receiver.id === selectedUser.id)));
    setLoading(false);
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId: selectedUser.id, content: message })
    });
    setMessage("");
    fetchMessages();
    setLoading(false);
  }

  if (!session) return <div>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", display: "flex", gap: 32 }}>
      {/* Kullanıcı Listesi */}
      <div style={{ width: 250, background: "#f9f9f9", borderRadius: 8, padding: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Kullanıcılar</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.filter(u => u.id !== session.user.id).map(u => (
            <li key={u.id}>
              <button onClick={() => setSelectedUser(u)} style={{ width: "100%", textAlign: "left", padding: 8, border: "none", background: selectedUser?.id === u.id ? "#2563eb" : "transparent", color: selectedUser?.id === u.id ? "white" : "#222", borderRadius: 4, marginBottom: 4, cursor: "pointer" }}>{u.name}</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Mesajlaşma Alanı */}
      <div style={{ flex: 1, background: "#fff", borderRadius: 8, padding: 16, minHeight: 400 }}>
        {selectedUser ? (
          <>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>{selectedUser.name} ile Mesajlaşma</h3>
            <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 16, border: "1px solid #eee", borderRadius: 4, padding: 8 }}>
              {loading ? (
                <div>Yükleniyor...</div>
              ) : (
                messages.length === 0 ? <div>Henüz mesaj yok.</div> : (
                  messages.map((m, i) => (
                    <div key={i} style={{ marginBottom: 12, textAlign: m.sender.id === session.user.id ? "right" : "left" }}>
                      <div style={{ display: "inline-block", background: m.sender.id === session.user.id ? "#2563eb" : "#f1f5f9", color: m.sender.id === session.user.id ? "white" : "#222", padding: "8px 12px", borderRadius: 8, maxWidth: 350 }}>
                        {m.content}
                      </div>
                      <div style={{ fontSize: 10, color: "#888" }}>{new Date(m.createdAt).toLocaleString("tr-TR")}</div>
                    </div>
                  ))
                )
              )}
            </div>
            <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
              <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Mesaj yaz..." style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
              <button type="submit" style={{ background: "#2563eb", color: "white", padding: "8px 16px", borderRadius: 4, fontWeight: 600 }} disabled={loading}>Gönder</button>
            </form>
          </>
        ) : (
          <div style={{ color: "#888" }}>Bir kullanıcı seçin.</div>
        )}
      </div>
    </div>
  );
} 