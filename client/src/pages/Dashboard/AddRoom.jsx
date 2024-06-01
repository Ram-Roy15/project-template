import { useState } from "react";
import AddRoomForm from "../../components/Form/AddRoomForm";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../components/api/utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [imagePreview, setImagePreview] = useState();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const { user } = useAuth();
  const handleDatesSelection = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosCommon.post(`/room`, roomData);
      return data;
    },
    onSuccess: () => {
      console.log("data saved success");
      toast.success("Room added successfully");
      navigate("/dashboard/listings");
      setLoading(false);
    },
    onError: (error) => {
      toast.error("Something went wrong", error.message);
      setLoading(false);
      console.log(error);
    },
  });
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const price = form.price.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const category = form.category.value;
    const title = form.title.value;
    const bathrooms = form.bathrooms.value;
    const bedrooms = form.bedrooms.value;
    const to = dates.startDate;
    const from = dates.endDate;
    const host = {
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
    };
    try {
      const img_url = await imageUpload(image);
      const roomData = {
        location,
        price,
        description,
        image: img_url,
        category,
        to,
        from,
        host,
        title,
        bathrooms,
        bedrooms,
      };
      await mutateAsync(roomData);
      form.reset();
      console.table(roomData);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <AddRoomForm
        dates={dates}
        handleDatesSelection={handleDatesSelection}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        loading={loading}
        setImagePreview={setImagePreview}
      ></AddRoomForm>
    </div>
  );
};

export default AddRoom;
