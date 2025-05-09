function WorldTab({ world, setWorld }) {
  return (
    <div className="mb-3">
      <label className="form-label">รายละเอียดโลกนิยาย</label>
      <textarea
        className="form-control"
        value={world}
        onChange={(e) => setWorld(e.target.value)}
        rows={5}
        placeholder="พิมพ์รายละเอียดของโลกในนิยาย"
      />
    </div>
  );
}
export default WorldTab;