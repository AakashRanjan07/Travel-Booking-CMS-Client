import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import API from "../util/api";

const PackageForm = () => {
  const [formData, setFormData] = useState({
    destination: "",
    title: "",
    description: "",
    price: "",
    availableDates: "",
    maxTravelers: "",
    packageType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPackage = async () => {
        try {
          setLoading(true);
          const { data } = await API.get(`/packages/${id}`);
          setFormData(data);
        } catch (err) {
          setError("Failed to load package data");
        } finally {
          setLoading(false);
        }
      };
      fetchPackage();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!formData.destination || !formData.title || !formData.price) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await API.put(`/packages/${id}`, formData);
      } else {
        await API.post("/packages", formData);
      }
      navigate("/");
    } catch (err) {
      setError("Failed to save package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">
            {id ? "Edit Package" : "Add Package"}
          </h2>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                type="text"
                name="destination"
                placeholder="Enter destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="availableDates">Available Dates</Label>
              <Input
                id="availableDates"
                type="text"
                name="availableDates"
                placeholder="Enter available dates (comma-separated)"
                value={formData.availableDates}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="maxTravelers">Max Travelers</Label>
              <Input
                id="maxTravelers"
                type="number"
                name="maxTravelers"
                placeholder="Enter max travelers"
                value={formData.maxTravelers}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/")} variant="outline">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PackageForm;
