import { Typography } from "@material-tailwind/react";
 
function HomeFooter() {
  return (
    <footer className="w-full bg-white p-8 fixed bottom-0 border-t border-black"> {/* Add mt-auto to push footer to bottom */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
    
       
          <li>
            <Typography
              as="a"
              href="/adminlogin"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Admin
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Material Tailwind
      </Typography>
    </footer>
  );
}

export default HomeFooter;
