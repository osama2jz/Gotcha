import { Box, Flex, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Autocomplete,
  CircleF,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../components/general/Button";
import InputField from "../../components/general/InputField";
import PageHeader from "../../components/general/PageHeader";
import { backendUrl } from "../../constants";

const Park = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState({ lat: 30, lng: 70 });
  const [radius, setRadius] = useState(300);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Use the Geolocation API to get the user's location by default
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
      radius: 300,
      coinsOnCompletion: 0,
      centerCoordinates: { coordinates: [] },
    },

    validate: {
      name: (value) => (value?.length > 0 ? null : "Enter Park Name"),
      radius: (value) => (value > 0 ? null : "Enter Park Radius"),
      coinsOnCompletion: (value) => (value > 0 ? null : "Enter Coins Value"),
    },
  });

  useEffect(() => {
    setRadius(form.values.radius);
  }, [form.values.radius]);

  useEffect(() => {
    form.setFieldValue("centerCoordinates", {
      coordinates: [center.lng, center.lat],
    });
  }, [center]);

  const onPlaceChanged = () => {
    if (selectedPlace != null) {
      const place = selectedPlace.getPlace();
      // const name = place.name;
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      alert("Please enter text");
    }
  };

  const onLoad = useCallback((autocomplete) => {
    setSelectedPlace(autocomplete);
  }, []);

  const handleAddPark = useMutation(
    async (values) => {
      return axios.post(backendUrl + `/parks`, values);
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        navigate("/park");
        form.reset();
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <Box>
      <PageHeader title={"Park"} subTitle={"Create a park as you like"} />

      <Flex gap="lg" wrap={{ base: "wrap", lg: "nowrap" }}>
        <Stack w={{ base: "100%", lg: "75%" }}>
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
              <InputField placeholder="Search for a location" />
            </Autocomplete>
            <Box style={{ minHeight: "400px" }}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
                center={center}
                zoom={14}
              >
                {center.lat && (
                  <CircleF
                    draggable
                    editable
                    center={center}
                    radius={parseInt(radius)}
                    onDragEnd={(e) =>
                      form.setFieldValue("centerCoordinates", {
                        coordinates: [e.latLng.lng(), e.latLng.lat()],
                      })
                    }
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
        </Stack>
        <form
          style={{ flex: 1 }}
          onSubmit={form.onSubmit((values) => handleAddPark.mutate(values))}
        >
          <Stack>
            <InputField
              label={"Park Name"}
              required
              form={form}
              validateName="name"
            />
            <InputField
              label={"Area (Radius)"}
              required
              form={form}
              validateName={"radius"}
              type="number"
              // onChange={(e) => setRadius(parseInt(e.target.value))}
            />
            <InputField
              label={"Coins On Completion"}
              required
              type="number"
              form={form}
              validateName="coinsOnCompletion"
            />
            <Flex justify={"space-between"} gap="md">
              <Button
                label={"Cancel"}
                primary={false}
                style={{ flex: 1 }}
                onClick={() => navigate("/park")}
              />
              <Button
                label={"Create Park"}
                style={{ flex: 1 }}
                type={"submit"}
              />
            </Flex>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default Park;
