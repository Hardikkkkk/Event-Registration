import axios from "axios";
import React, { useEffect, useState } from "react";
import EventGrid from "../components/EventGrid";

const AllEvent = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/events");
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Optionally set an error state to display a message to the user
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342692022a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHwwfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
      }}
    >
      <div className="bg-black bg-opacity-70 min-h-screen py-12">
        <div className="w-[90%] mx-auto">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-4xl text-center font-extrabold text-white mb-10 tracking-tight">
              Explore All Events
            </h2>
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8">
              <EventGrid events={event} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllEvent;