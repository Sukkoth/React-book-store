// import { Menu } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
// import { useSidebar } from "../Sidebar/SidebarProvider";

function Breadcrumb() {
  // const { toggleShowIconsOnly, showIconsOnly } = useSidebar();
  const { pathname } = useLocation();
  const splittedPath = pathname.split("/");
  const endPoint = splittedPath[splittedPath.length - 1]; //the last segment of the current page

  const paths = pathname.slice(1).split("/").slice(0, -1); //you do not need the last path since path is already there

  //construct links for all the segments
  const links = paths.map((path, index) => {
    return { name: path, link: `/${paths.slice(0, index + 1).join("/")}` };
  });

  return (
    <div className='bg-white flex items-center gap-5 rounded-md p-5 uppercase  sm:text-lg md:text-xl shadow-lg shadow-gray-100'>
      {/* <div
        className={`cursor-pointer ${showIconsOnly ? "block" : "lg:hidden"}`}
        onClick={toggleShowIconsOnly}
      >
        <Menu />
      </div> */}

      {/* no /dashboard route for now */}
      <div>
        {links.map((link, index) =>
          index === 0 ? (
            <span className='cursor-pointer' key={index}>
              {link.name}/
            </span>
          ) : (
            <Link
              to={link.link}
              key={index}
              className='cursor-pointer hover:text-midnight-900'
            >
              {link.name}/
            </Link>
          )
        )}
        <span className='font-medium md:font-semibold cursor-pointer'>
          {endPoint}
        </span>
      </div>
    </div>
  );
}

export default Breadcrumb;
