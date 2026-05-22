import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../store/AuthStore";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const login = authStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //  const {formState: { errors }} = useForm();

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (
      data.email === "fajarabdulaziz@gmail.com" &&
      data.password === "24090093"
    ) {
      alert("Login Berhasil");
      navigate("/dashboard");

      login(data.email);
    } else {
      alert("Login Gagal");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-7 "
      >
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Selamat Datang
          </h1>
          <p className="text-gray-500 mt-1">Silakan masuk ke akun Anda</p>
        </div>
        <Input
          label="Email"
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <InputPassword
          label="Password"
          register={register}
          name="password"
          error={errors.password?.message}
        />
        <Button type="submit" label="Login" />

        <div>
          Belum Punya Akun?{" "}
          <Link
            to="/daftar-form"
            className="text-blue-500 hover:underline"
          >
            Daftar Sekarang
          </Link>
        </div>
      </form>
    </div>
  );
}
