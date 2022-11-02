import React, { Component, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import AllMarkers from "../../../components/AllMarkers";
import { Grid } from "@mui/material";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import faker from "@faker-js/faker";

// LEAFLET PART

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function PrivateHome() {
  const [locations, setLoactions] = useState([
    { pos: [51.505, -0.09], name: "Default" },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(Object.values(e.latlng));
        setLoactions([
          ...locations,
          { pos: Object.values(e.latlng), name: "Mon marqueur trop cool" },
        ]);
      },
    });
    return null;
  };
  // LEAFLET PART

  // REACT CHARTJS PART
  // ChartJS.register(
  //   CategoryScale,
  //   LinearScale,
  //   PointElement,
  //   LineElement,
  //   Title,
  //   Tooltip,
  //   Filler,
  //   Legend
  // );

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Line Chart",
  //     },
  //   },
  // };

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       fill: true,
  //       label: "Dataset 2",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };
  // REACT CHARTJS PART
  return (
    <>
      {openModal && (
        <AllMarkers
          setOpenModal={setOpenModal}
          markers={locations}
          setLoactions={setLoactions}
        />
      )}
      <div className="container p-5">
        <h1 className="display-5 text-light mb-4">Mon profil</h1>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <div>
              <button className="btn btn-primary px-4 mb-4">Carte</button>
            </div>
          </Grid>
          <Grid item>
            <div>
              <button className="btn btn-primary px-4 mb-4">Graphiques</button>
            </div>
          </Grid>
        </Grid>

        <div>
          <button
            className="btn btn-primary px-4 mb-4"
            onClick={() => setOpenModal(true)}
          >
            Voir tous les marqueurs
          </button>
        </div>

        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationFinderDummy />
          {locations.length > 0 &&
            locations.map((location) => (
              <Marker position={location.pos} key={location.pos}>
                <Popup> Nom :{location.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      {/* <div>
        <Line options={options} data={data} />;
      </div> */}
    </>
  );
}
