import { FunctionComponent, useState, useEffect } from "react";
import "./index.scss";
import toast, { Toaster } from "react-hot-toast";

// use this email and password to successfully login
const mockUsers = [{ email: "test@test.com", password: "1234" }];

const Task1: FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);

  useEffect(() => {
    // Optional - Check for valid user on component mount (for pre-population)
    const initialUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );
    setIsValidUser(initialUser ? true : null);
  }, [email, password]); // Re-run on email/password change

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail && email !== "" && password !== "") {
      toast.error("Invalid email format");
      return;
    }

    if (email === "" || password === "") {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const timeout = new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      await timeout;

      const userExists = mockUsers.find(
        (user) => user.email === email && user.password === password
      );
      setIsValidUser(userExists ? true : false); // Update state after finding user

      if (isValidUser) {
        toast
          .promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Logging in...",
            success: "Login successful",
            error: null,
          })
          .then(() => setLoading(false));
      } else {
        setLoading(false);
        toast.error("Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during submission:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div id="task-1">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={onSubmit} className="container">
        <label>Email</label>
        <input
          autoFocus
          name="email"
          onChange={(event) => setEmail(event.currentTarget.value)}
          value={email}
          type="text"
        />
        <label>Password</label>
        <input
          name="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
          value={password}
          type="password"
        />
        {loading ? (
          <button disabled>Loading...</button>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </div>
  );
};

export default Task1;
