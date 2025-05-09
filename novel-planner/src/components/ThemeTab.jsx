function ThemeTab({ theme, setTheme }) {
  return (
    <div className="mb-3">
      <label className="form-label">ธีมของเรื่อง</label>
      <textarea
        className="form-control"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        rows={4}
        placeholder="พิมพ์ธีมของนิยายที่นี่..."
      />
    </div>
  );
}
export default ThemeTab;