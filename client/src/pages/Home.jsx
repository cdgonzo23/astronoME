// import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
// import { QUERY_USERS } from "../utils/queries";
import Weather from "../components/Weather";
import { currentDate } from "../utils/currentDate";
import { neoFeed, dailyImage } from "../utils/API";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import UserList from "../components/UserList";

function Home() {
  // const { data, loading, error } = useQuery(QUERY_USERS);

  // const users = data?.users || [];

  const [neowsData, setNeowsData] = useState(null);
  const [dailyImgUrl, setDailyImgUrl] = useState(null);

  useEffect(() => {
    const fetchNeowsData = async () => {
      try {
        const neowsRes = await neoFeed();
        if (!neowsRes) {
          throw new Error("Response from neows at Nasa went wrong!");
        }
        const neows = await neowsRes.json();
        // console.log(neows);
        setNeowsData(neows.near_earth_objects[currentDate][0]);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDailyImage = async () => {
      try {
        const dailyImgRes = await dailyImage();

        if (!dailyImgRes) {
          throw new Error("Response from neows at Nasa went wrong!");
        }

        const dailyImg = await dailyImgRes.json();
        // console.log(dailyImg);
        setDailyImgUrl(dailyImg);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDailyImage();
    fetchNeowsData();
  }, []);

  return (
    <div className="relative isolate overflow-y-auto py-24 sm:py-32 min-h-screen">
      <img
        src="https://apod.nasa.gov/apod/image/2309/Arp142_HubbleChakrabarti_2627.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-50"
      />
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true"></div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      ></div>
      <div className="flex flex-row justify-center text-gray-300">
        <div className="text-center w-full flex flex-row justify-center">
          <h2 className="text-5xl font-semibold sm:text-6xl tracking-wider">
            Astrono<span className="text-[#6e91b8]">ME</span>
          </h2>
          {/* <p className="hidden lg:block mt-6 text-lg leading-8 tracking-wider">
            Introducing AstronoME, where stargazing meets community. Our web app is your one-stop celestial hub, delivering local weather insights,
            moon phases, near-Earth events, and more. Explore the wonders of the universe alongside a thriving community of fellow astronomers. With
            AstronoME, we&#39;re not just reaching for the stars; we&#39;re bringing the stars right to your fingertips.
          </p>
          <p className="lg:hidden mt-6 text-lg leading-8 tracking-wider">
            Introducing AstronoME, where stargazing meets community. With AstronoME, we&#39;re not just reaching for the stars; we&#39;re bringing the
            stars right to your fingertips.
          </p> */}
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none"></div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-10 xl:grid-cols-12 gap-12 justify-evenly mx-12 lg:mx-32 my-24 lg:my-32 text-gray-300 font-normal">
        {Auth.loggedIn() ? (
          <section className="bg-darkest col-span-4 md:col-span-5 xl:col-span-4 p-12 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
            <Weather />
          </section>
        ) : (
          <section className="bg-darkest col-span-4 md:col-span-10 xl:col-span-12 p-12 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
            <h4 className="text-3xl tracking-wide pb-4 mb-4 border-b-[1px] border-dotted border-hover-blue">Join the Community!</h4>
            <div className="text-xl tracking-wide">
              <p className="hidden lg:block my-6 text-xl leading-8 tracking-wider">
                Introducing AstronoME, where stargazing meets community. Our web app is your one-stop celestial hub, delivering local weather
                insights, moon phases, near-Earth events, and more. Explore the wonders of the universe alongside a thriving community of fellow
                astronomers. With AstronoME, we&#39;re not just reaching for the stars; we&#39;re bringing the stars right to your fingertips.
              </p>
              <p className="lg:hidden my-6 text-lg leading-8 tracking-wider">
                Introducing AstronoME, where stargazing meets community. With AstronoME, we&#39;re not just reaching for the stars; we&#39;re bringing
                the stars right to your fingertips.
              </p>
              <Link to="/login" className="text-[#6e91b8] text-2xl hover:text-hover-blue">
                Login{" "}
              </Link>
              or
              <Link to="/signup" className="text-[#6e91b8] text-2xl hover:text-hover-blue">
                {" "}
                Signup{" "}
              </Link>
              now!
            </div>
          </section>
        )}

        <section className="bg-darkest col-span-4 md:col-span-5 xl:col-span-4 p-12 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
          <h4 className="text-2xl tracking-wide pb-4 mb-4 border-b-[1px] border-dotted border-hover-blue">Incoming Asteroid</h4>
          {neowsData ? (
            <div className="list-none leading-7">
              <li>
                <span className="text-[#6e91b8]">Asteroid Name:</span> {neowsData.name}
              </li>
              <li>
                <span className="text-[#6e91b8]">Estimated Diameter:</span> {Math.floor(neowsData.estimated_diameter.feet.estimated_diameter_max)} ft
              </li>
              <li>
                <span className="text-[#6e91b8]">Speed:</span> {Math.floor(neowsData.close_approach_data[0].relative_velocity.miles_per_hour)} mph
              </li>
              <li>
                <span className="text-[#6e91b8]">Nearest Pass:</span> {neowsData.close_approach_data[0].close_approach_date_full.split(" ")[1]} EDT
              </li>

              <li>
                <span className="text-[#6e91b8]">Potential Danger:</span> {neowsData.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </li>
            </div>
          ) : (
            <div className="list-none leading-7">No Asteroid Near Earth Today</div>
          )}
        </section>
        <section className="bg-darkest col-span-4 md:col-span-5 xl:col-span-4 p-12 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
          <h4 className="text-2xl tracking-wide pb-4 mb-4 border-b-[1px] border-dotted border-hover-blue">Daily Image from NASA</h4>
          {dailyImgUrl ? (
            <div>
              <img style={{ width: "300px" }} src={dailyImgUrl.url} alt="Nasa Picture of the day" />
            </div>
          ) : (
            <p>No NASA Image of the Day</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
