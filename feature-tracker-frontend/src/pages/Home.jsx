import { useEffect, useState } from "react";
import api from "../api/api";
import FeatureCard from "../components/FeatureCard";
import Modal from "../components/Modal";

export default function Home() {
  const [features, setFeatures] = useState([]);
  const [status, setStatus] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ================= NOTIFICATION =================
  const [notification, setNotification] = useState(null);

  const notify = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3000);
  };

  // ================= FORMS =================
  const emptyForm = {
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
  };

  const [addForm, setAddForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      const res = await api.get(`/?status=${status}`);
      setFeatures(res.data);
    } catch (err) {
      notify("error", "Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  // ================= INPUT =================
  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // ================= CREATE =================
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await api.post("/", addForm);

      setAddForm(emptyForm);
      setAddOpen(false);

      notify("success", "Feature created successfully");
      fetchData();
    } catch (err) {
      notify("error", err.response?.data?.message || "Create failed");
    }
  };

  // ================= EDIT =================
  const openEdit = (feature) => {
    setSelected(feature);

    setEditForm({
      title: feature.title,
      description: feature.description,
      priority: feature.priority,
      status: feature.status,
    });

    setEditOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/${selected.id}`, editForm);

      setEditOpen(false);
      setEditForm(emptyForm);

      notify("success", "Feature updated successfully");
      fetchData();
    } catch (err) {
      notify("error", err.response?.data?.message || "Update failed");
    }
  };

  // ================= DELETE =================
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/${deleteId}`);

      setDeleteOpen(false);
      setDeleteId(null);

      notify("success", "Feature deleted successfully");
      fetchData();
    } catch {
      notify("error", "Delete failed");
    }
  };

  // ================= STATUS =================
  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/${id}/status`, { status: newStatus });

      notify("success", "Status updated");
      fetchData();
    } catch {
      notify("error", "Status update failed");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">

      {/* NOTIFICATION */}
      {notification && (
        <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg z-50
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {notification.text}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Feature Tracker</h1>

        <button
          onClick={() => setAddOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Feature
        </button>
      </div>

      {/* FILTER */}
      <select
        className="border p-2 rounded mb-5"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      {/* ================= EMPTY STATE ================= */}
      {features.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">

          <div className="text-5xl mb-3">📭</div>

          <h2 className="text-xl font-semibold text-gray-700">
            No features found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing the filter or add a new feature
          </p>

          <button
            onClick={() => setAddOpen(true)}
            className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Feature
          </button>

        </div>
      ) : (
        /* ================= CARDS ================= */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard
              key={f.id}
              feature={f}
              onDelete={confirmDelete}
              onStatusChange={updateStatus}
              onEdit={openEdit}
            />
          ))}
        </div>
      )}

      {/* ================= ADD MODAL ================= */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create Feature">
        <form onSubmit={handleAdd} className="space-y-3">
          <input name="title" value={addForm.title} onChange={handleAddChange} className="w-full border p-3 rounded-lg" placeholder="Title" required />
          <textarea name="description" value={addForm.description} onChange={handleAddChange} className="w-full border p-3 rounded-lg" placeholder="Description" required />
          <select name="priority" value={addForm.priority} onChange={handleAddChange} className="w-full border p-3 rounded-lg">
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <select name="status" value={addForm.status} onChange={handleAddChange} className="w-full border p-3 rounded-lg">
            <option>Open</option><option>In Progress</option><option>Completed</option>
          </select>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">Create</button>
        </form>
      </Modal>

      {/* ================= EDIT MODAL ================= */}
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Feature">
        <form onSubmit={handleUpdate} className="space-y-3">
          <input name="title" value={editForm.title} onChange={handleEditChange} className="w-full border p-3 rounded-lg" />
          <textarea name="description" value={editForm.description} onChange={handleEditChange} className="w-full border p-3 rounded-lg" />
          <select name="priority" value={editForm.priority} onChange={handleEditChange} className="w-full border p-3 rounded-lg">
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full border p-3 rounded-lg">
            <option>Open</option><option>In Progress</option><option>Completed</option>
          </select>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">Update</button>
        </form>
      </Modal>

      {/* ================= DELETE MODAL ================= */}
      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Confirm Delete">
        <div className="space-y-4">
          <p>Are you sure you want to delete this feature?</p>

          <div className="flex gap-3">
            <button onClick={() => setDeleteOpen(false)} className="w-full bg-gray-200 py-2 rounded-lg">
              Cancel
            </button>
            <button onClick={handleDelete} className="w-full bg-red-600 text-white py-2 rounded-lg">
              Delete
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}