import { Box, Center, Loader, Stack } from "@mantine/core";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClustererF,
  MarkerF,
} from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useState } from "react";
import InputField from "../../components/general/InputField";
import PageHeader from "../../components/general/PageHeader";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context";

const Live = () => {
  const { user } = useContext(UserContext);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 30, lng: 70 });
  const [selectedPlace, setSelectedPlace] = useState(null);
  // Use the Geolocation API to get the user's location by default
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords?.latitude,
          lng: position.coords?.longitude,
        });
      });
    }
  }, []);

  const onPlaceChanged = () => {
    if (selectedPlace != null) {
      const place = selectedPlace.getPlace();
      // const name = place.name;
      setCenter({
        lat: place.geometry.location?.lat(),
        lng: place.geometry.location?.lng(),
      });
    } else {
      alert("Please enter text");
    }
  };

  const onLoad = useCallback((autocomplete) => {
    setSelectedPlace(autocomplete);
  }, []);

  const { status } = useQuery(
    "fetchDrops",
    () => {
      return axios.get(backendUrl + "/offers/list", {
        // headers: {
        //   authorization: `${user.accessToken}`,
        // },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((obj) => {
          return {
            label: obj.Name,
            coords: {
              lat: obj.Location.coordinates[0],
              lng: obj.Location.coordinates[1],
            },
          };
        });
        setMarkers(newData);
      },
    }
  );
  if (status === "loading")
    return (
      <Center>
        <Loader />
      </Center>
    );

  return (
    <Stack bg="white" style={{ borderRadius: "5px" }}>
      <PageHeader title={"Live"} />
      <LoadScript
        id="script-loader"
        libraries={["places"]}
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
      >
        <Autocomplete
          types={["geocode"]}
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <InputField mx={"md"} placeholder="Search for a location" />
        </Autocomplete>
        <Box p="md" style={{ height: "480px", width: "100%" }}>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
            }}
            center={center}
            zoom={2}
          >
            <MarkerClustererF>
              {(clusterer) => {
                return markers.map((obj, ind) => (
                  <MarkerF
                    position={obj.coords}
                    title="Location"
                    key={ind}
                    label={obj.label}
                    clusterer={clusterer}
                  />
                ));
              }}
            </MarkerClustererF>
          </GoogleMap>
        </Box>
      </LoadScript>
    </Stack>
  );
};

export default Live;
