import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

type FormData = {
  nama: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
  nama: z.string().min(2, "Nama harus minimal 2 karakter"),
  passwordConfirm: z.string().min(6, "Password harus minimal 6 karakter"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //  const {formState: { errors }} = useForm();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-7 rounded shadow"
      >
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Selamat Datang
          </h1>
          <p className="text-gray-500 mt-1">
            Silakan daftarkan akun Anda terlebih dahulu
          </p>
        </div>
        <Input
          label="Nama"
          register={register}
          name="nama"
          error={errors.nama?.message}
        />
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
        <InputPassword
          label="Password Confirm"
          register={register}
          name="password Confirm"
          error={errors.passwordConfirm?.message}
        />
        <Button type="submit" label="Register" />

        <div>
          Sudah punya akun?{" "}
          <Link to="/login-form" className="text-blue-500 hover:underline">
            Login Sekarang
          </Link>
        </div>
      </form>
    </div>
  );
}
