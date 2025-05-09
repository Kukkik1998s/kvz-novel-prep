import jsPDF from "jspdf";
import "jspdf-autotable";

function ExportPDF({ title, theme, world, characters, chapters }) {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title || "นิยายของฉัน", 10, 15);

    doc.setFontSize(14);
    doc.text("ธีมเรื่อง", 10, 30);
    doc.setFontSize(12);
    doc.text(theme || "-", 10, 38);

    doc.setFontSize(14);
    doc.text("โลกนิยาย", 10, 55);
    doc.setFontSize(12);
    doc.text(world || "-", 10, 63);

    if (characters.length > 0) {
      doc.setFontSize(14);
      doc.text("ตัวละคร", 10, 80);
      doc.autoTable({
        startY: 85,
        head: [["ชื่อ", "MBTI", "รูปภาพ"]],
        body: characters.map(c => [c.name, c.mbti, c.image])
      });
    }

    if (chapters.length > 0) {
      const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;
      doc.setFontSize(14);
      doc.text("ทรีทเมนต์รายตอน", 10, startY);
      doc.setFontSize(12);
      chapters.forEach((c, i) => {
        const y = startY + 10 + (i * 20);
        doc.text(`${i + 1}. ${c.title}`, 10, y);
        doc.text(doc.splitTextToSize(c.treatment || "-", 180), 10, y + 7);
      });
    }

    doc.save(`${title || "novel"}.pdf`);
  };

  return (
    <button onClick={handleExport} style={{
      marginTop: "1rem", padding: "1rem",
      width: "100%", fontSize: "1rem",
      backgroundColor: "#4CAF50", color: "white",
      border: "none", borderRadius: "8px"
    }}>
      📄 Export เป็น PDF
    </button>
  );
}

export default ExportPDF;