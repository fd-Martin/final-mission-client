import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import L from "leaflet";
import marker from "./location-dot-solid-full.svg";

const Coverage = ({ mapData }) => {
  const mapRef = useRef(null);
  const position = [23.685, 90.3563];

  const customMarker = new L.Icon({
    iconUrl: marker,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.toLowerCase();
    const district = mapData.find((center) =>
      center.district.toLowerCase().includes(location),
    );

    if (!district) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "❌ Location not found. Try another district.",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return e.target.reset();
    }

    const flyToLocation = [district.latitude, district.longitude];
    if (mapRef.current) {
      mapRef.current.flyTo(flyToLocation, 12, {
        animate: true,
        duration: 1.5,
      });
      e.target.reset();
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-2xl">
      {/* HEADER SECTION */}
      <div className=" text-center">
        <h2
          className="text-3xl md:text-5xl font-extrabold 
          bg-linear-to-r from-primary to-secondary 
          bg-clip-text text-transparent"
        >
          Meet All Our Outlets
        </h2>

        <p className="mt-2 text-accent font-bold max-w-3xl mx-auto">
          Explore our library locations across different cities and discover the
          areas.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-center my-8">
        <form onSubmit={handleSearch}>
          <fieldset className="flex items-center gap-0">
            <div>
              <label
                className="input input-sm md:input-md rounded-l-full px-5 flex items-center gap-2
                  bg-linear-to-r from-primary/10 to-secondary/10
                  border border-primary
                  focus-within:ring-2 focus-within:ring-primary/30
                  transition-all duration-300 shadow-sm"
              >
                <svg
                  className="h-[1.1em] opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </g>
                </svg>

                <input
                  type="search"
                  name="location"
                  placeholder="Search by district..."
                  className="placeholder:text-primary/60 outline-none bg-transparent"
                />
              </label>

              {/* Error message */}
              {/* Using SweetAlert for errors, so this is optional */}
            </div>

            <button
              className="btn btn-sm md:btn-md btn-primary rounded-r-full px-8 font-bold
                shadow-md hover:shadow-primary/40 transition-all duration-300"
            >
              Search
            </button>
          </fieldset>
        </form>
      </div>

      {/* MAP */}
      <div className=" h-[500px] md:h-[600px">
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full rounded-3xl shadow-xl border border-primary/20 overflow-hidden"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mapData?.map((center, i) => (
            <Marker
              key={i}
              icon={customMarker}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <h3 className="font-bold text-primary text-lg">
                  📚 {center.city}
                </h3>
                <p className="text-sm mt-1 text-gray-600">
                  {center.covered_area.join(", ")}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
