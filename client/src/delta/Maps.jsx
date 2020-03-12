import React from "react";

const Maps = () => {
  return (
    <div className="col-md-12 d-flex justify-content-center" style={{marginTop: "100px"}}>
      <div className="row">
        <div className="col-md-6">
          <iframe
            title="nasa"
            src="https://www.google.com/maps/d/embed?mid=14TfSK3OCFZTvFXGNEyBWs56MWC4"
            width="800"
            height="800"
          ></iframe>
        </div>
        <div className="col-md-6">
          <iframe
            title="google"
            src="https://www.google.com/maps/d/embed?mid=14TfSK3OCFZTvFXGNEyBWs56MWC4"
            width="800"
            height="800"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Maps