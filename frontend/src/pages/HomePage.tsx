import { Button } from "../components/ui/Button";
import { Collapse } from "../components/ui/Collapse";
import SpeakerCard from "../components/ui/SpeakerCard";
import { Card } from "../components/ui/Card";
import EventRegistration from "../components/ui/EventRegistration";
import { ChevronDown } from "lucide-react";

function Home() {
  const speakers = [
    {
      name: "Dery Agung Triyadi",
      role: "Aws Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png",
    },
    {
      name: "Sowam Habibi",
      role: "Google Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png",
    },
    {
      name: "Lhuqita Fazry",
      role: "Mobile Development Developer, Founder Rumah Coding Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png",
    },
  ];

  const collapseItems = [
    {
      title: "Apa itu InpoPest?",
      description:
        "Invofest (Informatics Vocational Festival) adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital. Dengan mengusung tema “Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow ”.",
    },
    {
      title: "Kapan dan di mana Invofest akan diselenggarakan?",
      description:
        "Invofest akan diselenggarakan pada tanggal 15-17 November 2024 di Jakarta Convention Center (JCC), Jakarta, Indonesia.",
    },
    {
      title: "Apakah ada biaya pendaftaran di INVOFEST?",
      description: "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
    {
      title: "Bagaimana saya mengetahui pemenang kompetisi?",
      description:
        "Pemenang akan diinformasikan melalui media sosial instagram dari invofest @invofest_harkatnegeri.",
    },
    {
      title: "Apa yang didapat pemenang dalam kompetisi?",
      description:
        "Pemenang kompetisi akan mendapatkan hadiah trophy, uang pembinaan, dan e-sertifikat.",
    },
    {
      title: "Bagaimana cara mendaftar event?",
      description:
        "Buka https://www.invofest-harkatnegeri.com lalu pergi ke halaman event yang anda ingin ikuti atau scroll kebagian bawah halaman beranda dengan klik mendaftar pada salah satu eventnya, jika sudah maka diarahkan ke halaman detail event dan klik tombol 'Registrasi' maka akan diarahkan ke google form pengisian pendaftaran event yang diikuti.",
    },
  ];

  const cardItems = [
    {
      title: "IT Seminar",
      description:
        "Seminar nasional ini membahas ''Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif'' untuk mengembangkan potensi diri dan pengetahuan teknologi lebih dalam lagi.",
    },
    {
      title: "IT Talkshow",
      description:
        "Talkshow ''Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan'' membahas peran manusia dalam memanfaatkan AI untuk solusi berkelanjutan dan peningkatan teknologi.",
    },
    {
      title: "IT Home",
      description:
        "Kompetisi ''From Creation to Innovation'' mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang berkelanjutan.",
    },
    {
      title: "IT Workshop",
      description:
        "Workshop 'AI for a Sustainable Future: The Role of Z Generation in the Digital Era' membekali Gen Z dengan keterampilan praktis AI untuk menciptakan solusi berkelanjutan.",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <section
          id="hero"
          className="py-10 flex gap-10 justify-between items-center "
        >
          <div className="w-2/3 flex flex-col gap-6">
            <img
              src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
              alt=""
              className="w-96"
            />
            <p>
              Invofest (Informatics Vocational Festival) adalah festival tahunan
              yang bertujuan untuk menginspirasi dan memberdayakan generasi muda
              Indonesia dalam menghadapi era digital. Dengan mengusung tema
              "Beyond Limits, Beyond Intelligence: Innovate for a Smarter
              Tomorrow ".
            </p>

            <div className="flex gap-3">
              <Button label="Info Selengkapnya" variant="primary" />
              <Button label="Hubungi Panitia" variant="outline" />
            </div>
          </div>
          <div className="w-1/3">
            <img
              src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
              alt=""
            />
          </div>
        </section>
      </div>

      <section id="speaker" className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-3">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={index}
              name={speaker.name}
              role={speaker.role}
              imageUrl={speaker.imageUrl}
            />
          ))}
        </div>
      </section>

      <div>
        <section
          id="cards"
          className="max-w-7xl mx-auto py-20 w-full h-fit px-8 flex flex-col gap-3 sm:gap-4"
        >
          <h1 className="font-semibold text-red-900 text-3xl sm:text-4xl lg:text-5xl ">
            Tentang INVOFEST
          </h1>
          <p className="text-sm md:text-base lg:text-1.35rem sm:leading-1.5rem lg:leading-2rem text-slate-600 ">
            Invofest 2025, yang diselenggarakan oleh sarjana terapan Teknik
            Informatika Universitas Harkat Negeri, adalah festival tahunan yang
            bertujuan untuk menginspirasi dan memberdayakan generasi muda
            Indonesia dalam menghadapi era digital. Dengan mengusung tema
            <b>
              “Beyond Limits, Beyond Intelligence: Innovate for a Smarter
              Tomorrow ”
            </b>
            . Invofest 2025 menghadirkan berbagai kegiatan menarik seperti
            kompetisi IT, workshop IT, dan seminar nasional &amp; talkshow
            dengan para ahli teknologi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-3 gap-5">
            {cardItems.map((item, index) => (
              <Card key={index} className="w-full">
                <h3 className="text-2xl text-red-900 mb-4">{item.title}</h3>
                <p>{item.description}</p>
                <Button label="Info Selengkapnya" variant="primary" />
              </Card>
            ))}
          </div>
        </section>
      </div>

      <section id="collapse">
        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-1xl font-bold text-gray-500">FAQ</span>
            <h1 className="text-4xl fon">Punya Pertanyaan? Lihat</h1>
            <span className="text-4xl font-bold text-red-900">DISINI</span>
            <p className="flex justify-center text-base text-gray-600 mt-5">
              Ada banyak informasi yang terkait dengan INVOFEST, Anda dapat
              melihat daftar pertanyaan di bawah ini.
            </p>
          </div>

          <div className="py-24 grid grid-cols-1 md:grid-cols-2 gap-6 px-3 items-start">
            {collapseItems.map((item, index) => (
              <Collapse
                key={index}
                title={item.title}
                description={item.description}
                icon={ChevronDown}
                variant="secondary"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-fit p-4 px-8">
        <section id="registration" className="py-24">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                data-aos="zoom-in"
                data-aos-delay="150"
                className="mx-auto mb-60px max-w-520px text-center lg:mb-20 aos-init aos-animate"
              >
                <span className="mb-2 block text-lg font-semibold text-slate-600">
                  Pendaftaran
                </span>
                <h2 className="mb-4 text-3xl font-bold text-red-900 sm:text-[40px]/[48px]">
                  Daftar Sekarang!
                </h2>
                <p className="text-base text-slate-600">
                  Jangan lewatkan kesempatan untuk menjadi bagian dari Invofest
                  2025. Daftar sekarang dengan mengisi formulir di bawah ini dan
                  jadilah bagian dari pengalaman teknologi yang luar biasa!
                </p>
              </div>
            </div>
          </div>
          <EventRegistration />
        </section>
      </div>
    </>
  );
}
export default Home;
