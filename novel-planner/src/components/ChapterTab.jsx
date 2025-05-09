import React, { useState } from 'react';

function ChapterTab({ chapters, setChapters }) {
  const [newChapter, setNewChapter] = useState({ title: "", treatment: "" });

  const handleAdd = () => {
    if (newChapter.title) {
      setChapters([...chapters, newChapter]);
      setNewChapter({ title: "", treatment: "" });
    }
  };

  return (
    <div>
      <h5>เพิ่มตอนใหม่</h5>
      <div className="mb-3">
        <label className="form-label">ชื่อตอน</label>
        <input
          className="form-control"
          value={newChapter.title}
          onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">ทรีทเมนต์</label>
        <textarea
          className="form-control"
          rows={3}
          value={newChapter.treatment}
          onChange={(e) => setNewChapter({ ...newChapter, treatment: e.target.value })}
        />
      </div>
      <button className="btn btn-outline-primary mb-3" onClick={handleAdd}>➕ เพิ่มตอน</button>
      <ul className="list-group">
        {chapters.map((c, i) => (
          <li key={i} className="list-group-item"><b>{c.title}</b>: {c.treatment.slice(0, 40)}...</li>
        ))}
      </ul>
    </div>
  );
}
export default ChapterTab;