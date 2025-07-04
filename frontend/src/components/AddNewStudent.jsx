import React from "react";
const AddNewStudent=({ formData, setFormData, handleAddStudent, resetForm, editingId, showForm })=>{
return(
  <div>
  {showForm && (
        <form
          onSubmit={handleAddStudent}
          className="space-y-4 bg-gray-100 p-6 rounded shadow"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Codeforces Handle"
            value={formData.handle}
            onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
              {editingId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      </div>
    )

}
export default AddNewStudent;