import { useState } from "react";
import axios from "axios";

export default function EventCard({ event }) {
  const [interested, setInterested] = useState(false);

  const [count, setCount] = useState(
    event.interestedUsers
      ? event.interestedUsers.length
      : 0
  );

  const handleInterested = async () => {
    try {
      const res = await axios.post(
        `/api/events/${event._id}/interested`
      );

      setInterested(res.data.interested);
      setCount(res.data.interestedCount);
    } catch (err) {
      console.log(err);
      alert("Unable to update interest.");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="event-card">

      <div className="event-top">

        <h3>{event.title}</h3>

        <span className="event-category">
          {event.category}
        </span>

      </div>

      <p className="event-description">
        {event.description}
      </p>

      <div className="event-info">

        <p>
          📅 <strong>Date:</strong>{" "}
          {formatDate(event.date)}
        </p>

        <p>
          🕒 <strong>Time:</strong>{" "}
          {event.startTime} - {event.endTime}
        </p>

        <p>
          📍 <strong>Venue:</strong>{" "}
          {event.venue}
        </p>

        <p>
          👤 <strong>Organizer:</strong>{" "}
          {event.organizer}
        </p>

      </div>

      <div className="event-actions">

        <button
          className="interest-btn"
          onClick={handleInterested}
        >
          {interested ? "💚 Interested" : "❤️ Interested"}
          {" "}
          ({count})
        </button>

        {event.linkedPost && (
          <button
            className="post-btn"
            onClick={() =>
              window.location.href =
                `/posts/${event.linkedPost}`
            }
          >
            View Post
          </button>
        )}

      </div>

    </div>
  );
}