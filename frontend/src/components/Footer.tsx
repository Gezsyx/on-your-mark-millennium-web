import { NavLink } from "react-router-dom";

export const Footer: React.FC = () => {
  const menuItems = [
    {
      label: "Beranda",
      href: "/",
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 576 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
        </svg>
      ),
    },
    {
      label: "Kompetisi",
      href: "/competition",
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 576 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path>
        </svg>
      ),
    },
    {
      label: "Seminar",
      href: "/seminar",
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M21 3H3c-1.1 0-2 .9-2 2v8h2V5h18v16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
          <circle cx="9" cy="10" r="4"></circle>
          <path d="M15.39 16.56C13.71 15.7 11.53 15 9 15s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 1 19.22V22h16v-2.78c0-1.12-.61-2.15-1.61-2.66z"></path>
        </svg>
      ),
    },
    {
      label: "Workshop",
      href: "/workshop",
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 640 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"></path>
        </svg>
      ),
    },
    {
      label: "Talkshow",
      href: "/talkshow",
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 352 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M336 192h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16zM176 352c53.02 0 96-42.98 96-96h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96z"></path>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-pink-100 shadow-sm px-6 py-12 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-3 w-full">
          <div>
            <img
              src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png"
              alt="logo"
              className="h-16 object-contain"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-sm">
              Menu Navigasi
            </h3>
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-900"
                >
                  {item.icon}
                  {item.label && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-sm">
              Sosial Media
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-sm">
              Alamat Lokasi
            </h3>
            <div className="w-full h-40 rounded-lg overflow-hidden border border-pink-200 shadow-sm mt-2">
              <iframe
                title="Google Maps Politeknik Negeri Tegal"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.033621437149!2d109.10543667475667!3d-6.886566893112461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9e28d00923d%3A0x7d605156a595180!2sPoliteknik%20Negeri%20Tegal!5e0!3m2!1sid!2sid!4v1714400000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-red-200 flex justify-between items-center text-sm text-gray-500 px-3">
        <p>© 2026 INVOFEST. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
