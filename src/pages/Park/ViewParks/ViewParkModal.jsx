import { ActionIcon, Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CircleF, GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { Eye } from "lucide-react";
import { useState } from "react";

const ViewParkModal = ({ title, data }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [center, setCenter] = useState({
    lat: data?.centerCoordinates?.coordinates[1],
    lng: data?.centerCoordinates?.coordinates[0],
  });
  const markers =
    data.drops.map((obj) => {
      return {
        lng: obj.location.coordinates[0],
        lat: obj.location.coordinates[1],
      };
    }) || [];
  return (
    <Box>
      <ActionIcon onClick={open}>
        <Eye />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title={title} centered size={"xl"}>
        {opened && (
          <LoadScript
            id="script-loader"
            libraries={["places"]}
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
          >
            <Box style={{ height: "400px", width: "100%" }}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
                center={center}
                zoom={14}
              >
                {markers.map((obj, ind) => (
                  <MarkerF position={obj} title="Location" key={ind} />
                ))}
                {center.lat && (
                  <CircleF
                    center={center}
                    radius={parseInt(data?.radius)}
                    options={{
                      fillColor: "blue",
                      fillOpacity: 0.2,
                      strokeColor: "blue",
                      strokeOpacity: 0.8,
                    }}
                  />
                )}
              </GoogleMap>
            </Box>
          </LoadScript>
        )}
      </Modal>
    </Box>
  );
};

export default ViewParkModal;
