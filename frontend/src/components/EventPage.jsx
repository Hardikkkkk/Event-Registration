import React, { useEffect, useState } from "react";
import EventGrid from "./EventGrid"; // Ensure this path is correct
import Pagination from "./Pagination";
import axios from "axios";

const EventPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [events, setEvents] = useState([]);

  // Calculate pagination
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      // Optionally set an error state to display a message to the user
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/bg.jpeg')` }} // Replace with your image path
    >
      <div className="w-[90%] mx-auto bg-white bg-opacity-80 py-10 rounded-lg shadow-lg">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Upcoming Events
          </h2>

          <EventGrid events={currentEvents} /> {/* Render the EventGrid component */}

          {events.length > itemsPerPage && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EventPage;