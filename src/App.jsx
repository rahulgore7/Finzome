import "./App.css";
import React, { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import EditModal from "./components/EditModal";

function App() {
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const handleFormSubmit = (formData) => {
    setTableData((prevData) => [...prevData, formData]);
  };

  const handleEdit = (index) => {
    setEditingRow(index);
  };
  const handleEditSave = (editedData) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[editingRow] = editedData;
      return newData;
    });
    setEditingRow(null);
  };

  const handleEditCancel = () => {
    setEditingRow(null);
  };

  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <Form onSubmit={handleFormSubmit} />
      <Table data={tableData} onEdit={handleEdit} onDelete={handleDelete} />
      {editingRow !== null && (
        <EditModal
          data={tableData[editingRow]}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
}

export default App;
