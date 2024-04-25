export default function LoginPage() {
  const handleSubmit = async (formData) => {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h3>LoginPage</h3>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 text-black rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 text-black rounded-md"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
