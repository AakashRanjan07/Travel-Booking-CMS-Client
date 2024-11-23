import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../util/api";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
const navigate=useNavigate()
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await API.get("/packages");
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
        toast.error("Failed to load packages");
      }
    };
    fetchPackages();
  }, []);

  const deletePackage = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await API.delete(`/packages/${id}`);
        setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
        toast.success("Package deleted successfully");
      } catch (err) {
        console.error("Error deleting package:", err);
        toast.error("Failed to delete package");
      }
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Travel Packages</h2>
      <Button onClick={()=>navigate('/')}>Dashboard</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {packages.map((pkg) => (
          <Card key={pkg._id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{pkg.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{pkg.destination}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{pkg.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Price: ${pkg.price}</Badge>
                <Badge variant="outline">Max Travelers: {pkg.maxTravelers}</Badge>
                <Badge variant="outline">{pkg.packageType}</Badge>
              </div>
              <p className="text-sm mt-2">
                <strong>Available Dates:</strong> {pkg.availableDates.join(", ")}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to={`/packages/edit/${pkg._id}`}>
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => deletePackage(pkg._id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
