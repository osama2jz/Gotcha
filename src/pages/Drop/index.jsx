import { Box, Checkbox, Flex, SimpleGrid, Stack } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { CircleF, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../components/general/Button";
import InputField from "../../components/general/InputField";
import PageHeader from "../../components/general/PageHeader";
import SelectMenu from "../../components/general/SelectMenu";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context";

const Drop = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [center, setCenter] = useState({ lat: 30, lng: 70 });
  const [markers, setMarkers] = useState([]);
  const [types, setTypes] = useState([]);

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

  const { status } = useQuery(
    "fetchOffers",
    () => {
      return axios.get(backendUrl + "/offerTypes/listAll", {
        // headers: {
        //   authorization: `${user.accessToken}`,
        // },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((item) => {
          return { value: item._id, label: item.Name };
        });
        setTypes(newData)
      },
    }
  );

  const form = useForm({
    initialValues: {
      area: 300,
      Type: "",
      noOfOffers: 0,
      Name: "",
      Value: "",
      Link: "",
      ExpireDate: "",
      ExpireTime: "",
      Locations: [],
    },

    validate: {
      area: (value) => (value > 0 ? null : "Enter Area"),
      Type: (value) => (value?.length > 0 ? null : "Enter Drop Type"),
      noOfOffers: (value) => (value > 0 ? null : "Enter number of offers"),
      Name: (value) => (value?.length > 0 ? null : "Enter Offer Name"),
      Value: (value) => (value > 0 ? null : "Enter Value"),
      ExpireDate: (value) => (value ? null : "Select Expiration Date"),
      ExpireTime: (value) =>
        value?.length > 0 ? null : "Select Expiration Time",
    },
  });

  const handleAddDrop = useMutation(
    async (values) => {
      let formData = new FormData();
      formData.append('offeredBy', user.id);
      formData.append('Type', values.Type);
      formData.append('Value', values.Value);
      formData.append('Link', values.Link);
      formData.append('Name', values.Name);
      formData.append('Locations', JSON.stringify(values.Locations));
      formData.append('Expire', values.ExpireDate);
      
      // values.locations = values.locations.map((obj) => Object.values(obj));
      return axios.post(backendUrl + `/offers/add`, formData, {
        // headers: {
        //   authorization: `${user.accessToken}`,
        // },
      });
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        form.reset();
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );


  const generateOffers = () => {
    // An array to store the generated points
    var points = [];
    // A constant for converting degrees to radians
    var DEG_TO_RAD = Math.PI / 180;
    // A constant for the Earth's radius in meters
    var EARTH_RADIUS = 6378100;
    // Loop for each point
    for (var i = 0; i < form.values.noOfOffers; i++) {
      // Generate a random angle in radians
      var angle = Math.random() * Math.PI * 2;
      // Generate a random distance from the center in meters
      var distance = Math.random() * form.values.area;
      // Calculate the offset in latitude and longitude using the haversine formula
      var latOffset = (distance * Math.cos(angle)) / EARTH_RADIUS / DEG_TO_RAD;
      var lngOffset =
        (distance * Math.sin(angle)) /
        EARTH_RADIUS /
        DEG_TO_RAD /
        Math.cos(center.lat * DEG_TO_RAD);
      // Add the offset to the center latitude and longitude
      var lat = center.lat + latOffset;
      var lng = center.lng + lngOffset; // Assuming the longitude is fixed at 123
      // Create an object with the latitude and longitude and push it to the array
      var point = { lng: lng, lat: lat };
      points.push(point);
    }
    // Return the array of points
    setMarkers(points);
    form.setFieldValue("Locations", points);
  };

  return (
    <Box bg="white" style={{ borderRadius: "5px" }}>
      <PageHeader title={"Droping Offers"} />

      <Flex gap="lg" p="md" wrap={{ base: "wrap", lg: "nowrap" }}>
        <Stack w={{ base: "100%", lg: "75%" }}>
          <LoadScript
            id="script-loader"
            libraries={["places"]}
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
          >
            <Box style={{ minHeight: "600px" }}>
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
                  <Marker
                    position={obj}
                    title="Location"
                    key={ind}
                    onDragEnd={(e) => {
                      const newArray = [...markers];
                      newArray[ind] = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      };
                      setMarkers(newArray);
                    }}
                    draggable={true}
                  />
                ))}
                {center?.lat && (
                  <CircleF
                    center={center}
                    radius={parseInt(form.values.area)}
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
          onSubmit={form.onSubmit((values) => handleAddDrop.mutate(values))}
        >
          <Stack>
            <InputField
              label={"Area (Radius)"}
              required
              type="number"
              form={form}
              validateName="area"
            />
            <SelectMenu
              label={"Offer Type"}
              required
              data={types}
              form={form}
              validateName="Type"
            />
            <InputField
              label={"Number of Offers"}
              required
              form={form}
              validateName={"noOfOffers"}
            />
            <InputField
              label={"Offer Name"}
              required
              form={form}
              validateName="Name"
            />
            <InputField
              label={"Drop Value"}
              required
              form={form}
              validateName={"Value"}
            />
            <InputField
              label={"Invitation link"}
              form={form}
              validateName={"Link"}
            />
            <Flex gap="md">
              <DateInput
                label="Expiry Date"
                placeholder="Expiry Date"
                withAsterisk
                style={{ width: "50%" }}
                minDate={new Date()}
                {...form.getInputProps("ExpireDate")}
              />
              <TimeInput
                label="Expiry Time"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("ExpireTime")}
              />
            </Flex>
            <Flex justify={"space-between"} gap="md">
              <Button
                label={"Generate Offer"}
                onClick={generateOffers}
                style={{ flex: 1 }}
              />
              <Button
                primary={false}
                label={"Drop Offer"}
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

export default Drop;
