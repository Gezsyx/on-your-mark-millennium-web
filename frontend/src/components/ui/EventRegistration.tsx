import { useForm } from "react-hook-form";
import { Input } from "./InputText";
import { Textarea } from "./TextArea";
import { Select } from "./SelectInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";

type FormData = {
  email: string;
  name: string;
};

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  name: z.string().min(2, "Nama harus di isi"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto p-4 flex flex-col gap-4"
    >
      <Input
        label="Nama"
        name="name"
        register={register}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        name="email"
        register={register}
        error={errors.email?.message}
      />

      <Textarea label="Bio" name="bio" register={register} />

      <Select
        label="Event"
        name="event"
        register={register}
        options={[
          { label: "Kompetisi", value: "kompetisi" },
          { label: "Seminar", value: "seminar" },
          { label: "Talkshow", value: "talkshow" },
          { label: "Workshop AI", value: "ai" },
        ]}
      />

      <Button type="submit" label="Daftar" />
    </form>
  );
}
