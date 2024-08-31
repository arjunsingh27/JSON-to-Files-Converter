import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

const FileConverter = () => {
  const [jsonData, setJsonData] = useState([]);
  const [inputJson, setInputJson] = useState('');

  const handleJsonChange = (e) => {
    setInputJson(e.target.value);
  };

  const parseJson = () => {
    try {
      const parsedData = JSON.parse(inputJson);
      setJsonData(parsedData);
    } catch (error) {
      alert('Invalid JSON');
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  const exportToCSV = () => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      alert('No data to export');
      return;
    }
    try {
      const csv = Papa.unparse(jsonData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'data.csv';
      link.click();
    } catch (error) {
      alert('Error exporting CSV');
      console.error(error);
    }
  };
  
  const exportToPDF = () => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      alert('No data to export');
      return;
    }
  
    try {
      const doc = new jsPDF();
      const margin = 10;
      const pageWidth = doc.internal.pageSize.width;
      const lineHeight = 10; // Adjust line height
      let y = margin;
  
      jsonData.forEach((item, index) => {
        const textLines = Object.entries(item)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
        
        const lines = doc.splitTextToSize(textLines, pageWidth - 2 * margin);
  
        if (y + lines.length * lineHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }
  
        doc.text(lines, margin, y);
        y += lines.length * lineHeight; // Move down for next entry
  
        // Add spacing between entries
        y += lineHeight;
      });
  
      doc.save('data.pdf');
    } catch (error) {
      alert('Error exporting PDF');
      console.error(error);
    }
  };
  
  
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Convert JSON to Files</h1>
      <textarea
        value={inputJson}
        onChange={handleJsonChange}
        placeholder="Paste JSON data here"
        rows="10"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <button
        onClick={parseJson}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Parse JSON
      </button>
      <div className="mt-4 space-x-2">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Export to Excel
        </button>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
        >
          Export to CSV
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default FileConverter;
