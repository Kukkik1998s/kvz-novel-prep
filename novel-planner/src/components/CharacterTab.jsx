import React, { useState } from 'react';

function CharacterTab({ characters, setCharacters }) {
  const [newCharacter, setNewCharacter] = useState({ name: "", mbti: "", image: "" });

  const handleAdd = () => {
    if (newCharacter.name) {
      setCharacters([...characters, newCharacter]);
      setNewCharacter({ name: "", mbti: "", image: "" });
    }
  };

  return (
    <div>
      <h5>เพิ่มตัวละครใหม่</h5>
      <div className="mb-3">
        <label className="form-label">ชื่อ</label>
        <input
          className="form-control"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">MBTI</label>
        <input
          className="form-control"
          value={newCharacter.mbti}
          onChange={(e) => setNewCharacter({ ...newCharacter, mbti: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">URL รูป</label>
        <input
          className="form-control"
          value={newCharacter.image}
          onChange={(e) => setNewCharacter({ ...newCharacter, image: e.target.value })}
        />
      </div>
      <button className="btn btn-outline-primary mb-3" onClick={handleAdd}>➕ เพิ่มตัวละคร</button>
      <ul className="list-group">
        {characters.map((c, i) => (
          <li key={i} className="list-group-item">{c.name} ({c.mbti})</li>
        ))}
      </ul>
    </div>
  );
}
export default CharacterTab;