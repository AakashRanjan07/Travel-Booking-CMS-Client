import { useState, useEffect } from "react";
import {  Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader,CardFooter } from "@/components/ui/card";
import API from "../util/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBookingForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    contactInfo: "",
    selectedPackage: "",
    numberOfTravelers: "",
  });
const navigate=useNavigate()
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await API.get("/packages");
        setBookingDetails(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings", formData);
      toast.success("Booking Created Successfully!")
      navigate('/')
      setFormData({
        customerName: "",
        contactInfo: "",
        selectedPackage: "",
        numberOfTravelers: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Add Booking</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="contactInfo">Contact Information</Label>
              <Input
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Enter contact info"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="selectedPackage">Travel Package</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, selectedPackage: value }))
                }
              >
                <SelectTrigger id="selectedPackage" className="w-full">
                  {formData.selectedPackage
                    ? bookingDetails.find((pkg) => pkg._id === formData.selectedPackage)?.title ||
                      "Select a package"
                    : "Select a package"}
                </SelectTrigger>
                <SelectContent>
                  {bookingDetails.map((pkg) => (
                    <SelectItem key={pkg._id} value={pkg._id}>
                      {pkg.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
              <Input
                id="numberOfTravelers"
                type="number"
                name="numberOfTravelers"
                value={formData.numberOfTravelers}
                onChange={handleChange}
                min="1"
                placeholder="Enter number of travelers"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Add Booking
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddBookingForm;
