import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../util/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      toast.success("LoggedIn successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="outline"
              className="text-blue-500 hover:underline"
            >
              Register here
            </Button>
            {/* <Link to='/register' className="text-blue-500 hover:underline"> */}
            {/* </Link> */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
