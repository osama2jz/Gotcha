import {
  Box,
  Checkbox,
  Flex,
  SimpleGrid,
  Stack
} from "@mantine/core";
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
  const [radius, setRadius] = useState(300);
  const [markers, setMarkers] = useState([]);
  const [parks, setParks] = useState([]);

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

  const { status, data: allParks } = useQuery(
    "fetchParks",
    () => {
      return axios.get(backendUrl + "/parks", {});
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((item) => {
          return { value: item._id, label: item.name };
        });
        setParks(newData);
      },
    }
  );

  const form = useForm({
    initialValues: {
      locations: [],
      park: "",
      expirationDate: "",
      expirationTime: "",
      dropName: "",
      dropType: "",
      videoURL: "",
      dropCoins: 0,
      noOfOffers: "",
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      isCorrect1: false,
      isCorrect2: false,
      isCorrect3: false,
      isCorrect4: false,
    },

    validate: {
      dropName: (value) => (value?.length > 0 ? null : "Enter Drop Name"),
      dropType: (value) => (value?.length > 0 ? null : "Enter Drop Type"),
      dropCoins: (value) => (value > 0 ? null : "Enter Drop Coins"),
      videoURL: (value, values) =>
        values.dropType === "Quiz" || value?.length > 0
          ? null
          : "Enter Video Url",
      question: (value, values) =>
        values.dropType === "Video" || value?.length > 0
          ? null
          : "Enter Quiz Question",
      answer1: (value, values) =>
        values.dropType === "Video" || value?.length > 0
          ? null
          : "Enter option",
      answer2: (value, values) =>
        values.dropType === "Video" || value?.length > 0
          ? null
          : "Enter option",
      answer3: (value, values) =>
        values.dropType === "Video" || value?.length > 0
          ? null
          : "Enter option",
      answer4: (value, values) =>
        values.dropType === "Video" || value?.length > 0
          ? null
          : "Enter option",
      park: (value) => (value?.length > 0 ? null : "Select Park"),
      expirationDate: (value) => (value ? null : "Select Expiration Date"),
      expirationTime: (value) =>
        value?.length > 0 ? null : "Select Expiration Time",
    },
  });

  const handleAddDrop = useMutation(
    async (values) => {
      values.quiz = {
        question: values.question,
        answers: [
          { answer: values.answer1, isCorrect: values.isCorrect1 },
          { answer: values.answer2, isCorrect: values.isCorrect2 },
          { answer: values.answer3, isCorrect: values.isCorrect3 },
          { answer: values.answer4, isCorrect: values.isCorrect4 },
        ],
      };
      values.locations = values.locations.map((obj) => Object.values(obj));
      return axios.post(backendUrl + `/drops`, values, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        form.reset();
        navigate("/drop");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );

  useEffect(() => {
    let selectedPark = allParks?.data?.data?.find(
      (obj) => obj._id === form.values.park
    );
    setCenter({
      lat: selectedPark?.centerCoordinates.coordinates[1],
      lng: selectedPark?.centerCoordinates.coordinates[0],
    });
    setRadius(selectedPark?.radius);
  }, [form.values.park]);

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
      var distance = Math.random() * radius;
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
    form.setFieldValue("locations", points);
  };

  return (
    <Box bg="white" style={{borderRadius:'5px'}}>
      <PageHeader title={"Droping Offers"} />

      <Flex gap="lg" p='md' wrap={{ base: "wrap", lg: "nowrap" }}>
        <Stack w={{ base: "100%", lg: "75%" }}>
          <LoadScript
            id="script-loader"
            libraries={["places"]}
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
          >
            <Box style={{ minHeight: "500px" }}>
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
                    radius={parseInt(radius)}
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
              label={"Drop Name"}
              required
              form={form}
              validateName="dropName"
            />
            <SelectMenu
              label={"Select Park"}
              required
              form={form}
              data={parks}
              validateName="park"
            />
            <InputField
              label={"Number of Offers"}
              required
              form={form}
              validateName={"noOfOffers"}
            />
            <InputField
              label={"Drop Coins"}
              required
              form={form}
              validateName={"dropCoins"}
            />
            <SelectMenu
              label={"Offer Type"}
              required
              data={[
                { label: "Video", value: "Video" },
                { label: "Quiz", value: "Quiz" },
              ]}
              form={form}
              validateName="dropType"
            />
            {form.values.dropType === "Video" && (
              <InputField
                label={"Video Url"}
                form={form}
                validateName={"videoURL"}
              />
            )}
            {form.values.dropType === "Quiz" && (
              <>
                <InputField
                  label={"Enter Question"}
                  form={form}
                  validateName={"question"}
                />
                <SimpleGrid cols={{ base: 2, lg: 1 }}>
                  <InputField
                    label={"Option 1"}
                    form={form}
                    validateName={"answer1"}
                    rightSection={
                      <Checkbox
                        {...form.getInputProps("isCorrect1")}
                        {...form.getInputProps("isCorrect1")}
                      />
                    }
                  />
                  <InputField
                    label={"Option 2"}
                    form={form}
                    validateName={"answer2"}
                    rightSection={
                      <Checkbox {...form.getInputProps("isCorrect2")} />
                    }
                  />
                  <InputField
                    label={"Option 3"}
                    form={form}
                    validateName={"answer3"}
                    rightSection={
                      <Checkbox {...form.getInputProps("isCorrect3")} />
                    }
                  />
                  <InputField
                    label={"Option 4"}
                    form={form}
                    validateName={"answer4"}
                    rightSection={
                      <Checkbox {...form.getInputProps("isCorrect4")} />
                    }
                  />
                </SimpleGrid>
              </>
            )}
            <Flex gap="md">
              <DateInput
                label="Expiry Date"
                placeholder="Expiry Date"
                withAsterisk
                style={{ width: "50%" }}
                minDate={new Date()}
                {...form.getInputProps("expirationDate")}
              />
              <TimeInput
                label="Expiry Time"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("expirationTime")}
              />
            </Flex>
            <Flex justify={"space-between"} gap="md">
              <Button
                label={"Generate Offer"}
                primary={false}
                onClick={generateOffers}
                style={{ flex: 1 }}
              />
              <Button
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
