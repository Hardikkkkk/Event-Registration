import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronRight
} from "lucide-react";

const EventCard = ({ event }) => {
  const getBadgeColor = (category) => {
    const categoryColors = {
      "Conference": "bg-blue-100 text-blue-800",
      "Workshops": "bg-green-100 text-green-800",
      "Meetups": "bg-purple-100 text-purple-800",
      "Festivals": "bg-orange-100 text-orange-800",
    };
    
    return categoryColors[category] || "bg-gray-100 text-gray-800";
  };
  
  const getPriceDisplay = (price) => {
    if (price === 0) return "Free";
    return `Rs ${price.toFixed(2)}`;
  };
  
  const getPriceColor = (price) => {
    if (price === 0 || price === "Free") return "text-green-600";
    return "text-blue-600 font-semibold";
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Link
      to={`/event/${event.id}`}
      className="block group" 
      aria-label={`View details for ${event.title}`}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
        {/* Image container with overlay gradient and ribbon */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category badge */}
          <div className="absolute top-0 left-0 mt-4 ml-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(event.category)} shadow-sm`}>
              {event.category}
            </span>
          </div>

          {/* Date ribbon */}
          {event.date && (
            <div className="absolute bottom-0 left-0 bg-white py-1 px-3 m-4 rounded-lg shadow-sm backdrop-blur-sm bg-opacity-90">
              <div className="flex items-center text-sm font-medium text-gray-800">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                {formatDate(event.date)}
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-5 line-clamp-2 font-light leading-relaxed">
            {event.description}
          </p>
          
          {/* Event details */}
          <div className="space-y-3 mb-6 bg-blue-50 p-3 rounded-lg">
            {event.time && (
              <div className="flex items-center text-sm text-gray-700">
                <Clock className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                <span className="font-medium">{formatTime(event.time)}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
              <span className="line-clamp-1 font-medium">{event.venue}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-700">
              <Users className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
              <span className="font-medium">Capacity: {event.capacity}</span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-gray-600 text-sm">
              {event.organizer && (
                <span className="italic">By <span className="font-medium text-gray-800">{event.organizer}</span></span>
              )}
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full shadow-sm">
              <span className={`${getPriceColor(event.price)} text-lg`}>
                {getPriceDisplay(event.price)}
              </span>
              <ChevronRight className="h-4 w-4 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;