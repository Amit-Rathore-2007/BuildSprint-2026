import { useState } from "react";
import axios from "axios";

export default function CreateEventModal({ close, refresh }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    category: "Technical",
    organizer: "",
    linkedPost: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/events", formData);

      alert("Event submitted successfully!");

      refresh();
      close();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>Create Event</h2>

          <button
            className="close-btn"
            onClick={close}
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <div className="time-row">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="organizer"
            placeholder="Organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Technical</option>
            <option>Cultural</option>
            <option>Sports</option>
            <option>Workshop</option>
            <option>Seminar</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="linkedPost"
            placeholder="Linked Post ID (Optional)"
            value={formData.linkedPost}
            onChange={handleChange}
          />

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={close}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create Event"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
