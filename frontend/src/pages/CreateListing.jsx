import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { categories, facilities, types } from "../data";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateListing = () => {
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({ ...formLocation, [name]: value });
  };

  const [amenities, setAmenities] = useState([]);
  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prev) => prev.filter((option) => option !== facility));
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  const [photos, setPhotos] = useState([]);
  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files).filter((photo) =>
      photo.type.startsWith("image/")
    );
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({ ...formDescription, [name]: value });
  };

  const creatorId = useSelector((state) => state?.user?.user?._id);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("state", formLocation.state);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", JSON.stringify(amenities));
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("price", formDescription.price);

      photos.forEach((photo) => listingForm.append("listingPhotos", photo));

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/listing/create`,
        {
          method: "POST",
          body: listingForm,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create listing");

      toast.success("Listing created successfully 🏠");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-300 py-10 px-[20px] lg:px-[40px] pb-30">
        <h1 className="text-slate-700 text-2xl sm:text-3xl font-bold">
          Create Your Listings
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl mt-10">
            <h2 className="text-slate-700 text-xl font-bold">
              Step 1: Title of the place
            </h2>
            <hr className="my-4 border-gray-300" />

            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              Select the category.
            </h3>
            <div className="flex flex-wrap justify-center gap-5 px-5 md:px-0">
              {categories?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center w-28 h-20 border border-gray-300 rounded-lg cursor-pointer ${
                    category === item.label ? "border-red-500 bg-gray-200" : ""
                  }`}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="text-black text-2xl">{item.icon}</div>
                  <p className="font-semibold text-black">{item.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              What type of place will offer?
            </h3>
            <div className="flex flex-col gap-5">
              {types?.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between gap-5 items-center max-w-2xl p-4 border border-gray-300 rounded-lg cursor-pointer ${
                    type === item.name ? "border-red-500" : ""
                  }`}
                  onClick={() => setType(item.name)}
                >
                  <div className="max-w-lg">
                    <h4 className="mb-1 text-lg ">{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="text-2xl">{item.icon}</div>
                </div>
              ))}
            </div>

            {/* Location */}
            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              Where is your place located?
            </h3>
            {/* ...location inputs... */}
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl mt-10">
            <h2 className="text-slate-700 text-xl font-bold">
              Step 2: Highlight Your Property's Unique Features
            </h2>
            {/* ...amenities, photos, description... */}
          </div>

          <button
            className="mt-10 bg-blue-800 text-white py-2 px-6 rounded-lg hover:shadow-2xl uppercase"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Your Listing"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
