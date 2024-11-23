import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./util/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    fetchPackages();
    fetchBookings();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await API.get("/packages");
      console.log("Fetched packages:", response.data); 
      setPackages(response.data); 
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await API.get("/bookings");
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const deletePackage = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await API.delete(`/packages/${id}`);
        setPackages((prevPackages) =>
          prevPackages.filter((pkg) => pkg._id !== id)
        );
        toast.success("Package deleted successfully");
      } catch (err) {
        console.error("Error deleting package:", err);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await API.patch(`/bookings/${id}/status`, { status });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: response.data.status } : booking
        )
      );
      toast.success("Booking status updated!");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    toast.info("Logged out successfully");
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center">Admin Dashboard</h2>

      <nav className="space-x-4 text-center">
        <Link to="/packages/new">
          <Button variant="outline">Add Package</Button>
        </Link>
        <Link to={'/packages'}>
          <Button variant="outline">View Packages</Button>
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">Register</Button>
            </Link>
          </>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </nav>

      <Card>
        <h3 className="text-2xl font-semibold mb-4">Travel Packages</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Package Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available Dates</TableHead>
              <TableHead>Max Travelers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <TableRow key={pkg._id}>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>{pkg?.title}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                  <TableCell>{pkg.availableDates.join(", ")}</TableCell>
                  <TableCell>{pkg.maxTravelers}</TableCell>
                  <TableCell className="w-1/4">
                    <Link to={`/packages/edit/${pkg._id}`}>
                      <Button className="bg-indigo-500 hover:bg-indigo-600 text-white ml-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={() => deletePackage(pkg._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No packages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Card>
        <h3 className="text-2xl font-semibold mb-4">Bookings</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Travelers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.customerName}</TableCell>
                  <TableCell>{booking.contactInfo}</TableCell>
                  <TableCell>{booking.selectedPackage?.title}</TableCell>
                  <TableCell>{booking.numberOfTravelers}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell className="w-1/4">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className="border px-5 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
