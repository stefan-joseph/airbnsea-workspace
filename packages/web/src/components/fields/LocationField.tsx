import { FieldProps } from "formik";
import Geosuggest from "react-geosuggest";
import { useState } from "react";
import { Suggest } from "react-geosuggest";
import "./geo.css";

import { compose, withProps } from "recompose";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

type DefaultCenter = null | {
  lat: number;
  lng: number;
};

export const LocationField: React.FC<FieldProps<any> & {}> = ({
  field: { onChange, ...field },
  form: { values, setValues },
  ...props
}) => {
  const [defaultCenter, setDefaultCenter] = useState<DefaultCenter>(null);

  const onSuggestSelect = (place: Suggest) => {
    const {
      location: { lat, lng },
    } = place;

    setValues({
      ...values,
      latitude: lat,
      longitude: lng,
    });

    setDefaultCenter({ lat, lng });
  };
  //  lat: -34.397, lng: 150.644
  const MapWithMarker = withGoogleMap<{
    defaultCenter: DefaultCenter;
    lat: number;
    lng: number;
    onClick: (
      e: google.maps.KmlMouseEvent | google.maps.IconMouseEvent
    ) => void;
  }>((props: any) => (
    /// @ts-ignore
    <GoogleMap
      defaultZoom={8}
      defaultCenter={props.defaultCenter}
      onClick={props.onClick}
    >
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    </GoogleMap>
  ));

  return (
    <div>
      <Geosuggest
        placeholder="Search for the address"
        onSuggestSelect={onSuggestSelect}
        location={new google.maps.LatLng(53.558572, 9.9278215)}
        radius={20}
      />
      <div>{values.longitude}</div>
      <div>{values.latitude}</div>
      {defaultCenter && (
        <MapWithMarker
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          defaultCenter={defaultCenter}
          lat={values.latitude}
          lng={values.longitude}
          onClick={(x) => {
            const lat = x.latLng?.lat();
            const lng = x.latLng?.lng();
            setValues({
              ...values,
              latitude: lat,
              longitude: lng,
            });
          }}
        />
      )}
    </div>
  );
};
