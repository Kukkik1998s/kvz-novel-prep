import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue, push, set, remove } from 'firebase/database';
import ThemeTab from './components/ThemeTab';
import CharacterTab from './components/CharacterTab';
import WorldTab from './components/WorldTab';
import ChapterTab from './components/ChapterTab';
import ExportPDF from './components/ExportPDF';


import "./App.css";

function App() {

  const [activeTab, setActiveTab] = useState("theme");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [world, setWorld] = useState("");
  const [characters, setCharacters] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [novelList, setNovelList] = useState([]);
  const [selectedNovelId, setSelectedNovelId] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.className = dark ? 'dark-mode' : '';
  }, [dark]);

  useEffect(() => {
    const novelsRef = ref(db, "projects/testUser/novels");
    onValue(novelsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      setNovelList(list);
    });
  }, []);

  const handleLoadNovel = (novel) => {
    setSelectedNovelId(novel.id);
    setTitle(novel.title || "");
    setTheme(novel.theme || "");
    setWorld(novel.world || "");
    setCharacters(novel.characters || []);
    setChapters(novel.chapters || []);
  };

  const handleDeleteNovel = (id) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบนิยายนี้?")) {
      remove(ref(db, "projects/testUser/novels/" + id));
      if (id === selectedNovelId) {
        setSelectedNovelId(null);
        setTitle(""); setTheme(""); setWorld(""); setCharacters([]); setChapters([]);
      }
    }
  };

  const handleSave = () => {
    const payload = { title, theme, world, characters, chapters, updatedAt: new Date().toISOString() };
    const saveRef = selectedNovelId
      ? ref(db, "projects/testUser/novels/" + selectedNovelId)
      : push(ref(db, "projects/testUser/novels"));
    set(saveRef, payload);
    alert("บันทึกเรียบร้อยแล้ว!");
  };

  const tabs = {
    theme: <ThemeTab theme={theme} setTheme={setTheme} />,
    character: <CharacterTab characters={characters} setCharacters={setCharacters} />,
    world: <WorldTab world={world} setWorld={setWorld} />,
    chapter: <ChapterTab chapters={chapters} setChapters={setChapters} />
  };

  return (
    <div style={{ padding: '1rem', maxWidth: 800, margin: 'auto', fontFamily: 'sans-serif' }}>

      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1.5rem", paddingTop: "1rem"}}>
        <h2>📖 วางแผนนิยาย</h2>
        <button onClick={() => setDark(!dark)} style={{ padding: "0.5rem", borderRadius: "8px" }}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      <input placeholder="ชื่อเรื่อง" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", marginBottom: "1rem" }} />

      <div style={{ marginBottom: '1rem' }}>
        <h3>📚 นิยายที่เคยสร้าง</h3>
        <ul style={{ paddingLeft: '1rem' }}>
          {novelList.map(n => (
            <li key={n.id} style={{ marginBottom: '0.5rem' }}>
              <a href="#" onClick={() => handleLoadNovel(n)}>{n.title}</a>
              <button onClick={() => handleDeleteNovel(n.id)} style={{ marginLeft: "0.5rem", color: "red", background: "none", border: "none" }}>ลบ</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "space-between" }}>
        {["theme", "character", "world", "chapter"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: "1 1 45%",
              padding: "0.75rem",
              fontSize: "1rem",
              background: activeTab === tab ? "#2d9cdb" : "#eee",
              color: activeTab === tab ? "white" : "black",
              border: "none",
              borderRadius: "8px"
            }}
          >
            {tab === "theme" ? "ธีม" : tab === "character" ? "ตัวละคร" : tab === "world" ? "โลก" : "ทรีทเมนต์"}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        {tabs[activeTab]}
      </div>

      <ExportPDF title={title} theme={theme} world={world} characters={characters} chapters={chapters} />

      <button onClick={handleSave} style={{
        marginTop: "2rem", padding: "1rem",
        width: "100%", fontSize: "1rem",
        backgroundColor: "#2d9cdb", color: "white",
        border: "none", borderRadius: "8px"
      }}>
        💾 บันทึกทั้งหมด
      </button>
    </div>
  );
}


export default App;