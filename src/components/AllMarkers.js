import React from "react";

export default function AllMarkers({ setOpenModal, markers, setLoactions }) {
  return (
    <>
      <div
        className="position-fixed top-0 vw-100 vh-100"
        onClick={() => setOpenModal(false)}
        style={{ zIndex: 50000000 }}
      >
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ minWidth: "400px" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tous les marqueurs</h5>
                <button
                  className="btn-close"
                  onClick={() => setOpenModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {markers.map((marker) => {
                  return (
                    <div>
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => {
                          const array = [...markers];
                          const index = array.indexOf(marker);
                          array.splice(index, 1);
                          setLoactions(array);
                        }}
                      >
                        Supprimer
                      </button>
                      <p>Nom :{marker.name}</p>
                      <p>Latitude : {marker.pos[0]}</p>
                      <p>Longitude : {marker.pos[1]}</p>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
