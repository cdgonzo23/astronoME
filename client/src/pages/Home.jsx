import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import Weather from '../components/Weather'
// import UserList from "../components/UserList";

function Home() {
  const { data, loading, error } = useQuery(QUERY_USERS);

  const users = data?.users || [];

  if (error) {
    throw Error(error);
  }

  if (loading) {
    return <h2>Loading…</h2>;
  }
  

  return (
    <div className="relative isolate overflow-y-auto bg-gray-900 py-24 sm:py-32 min- h-screen">
      <img
        src="https://apod.nasa.gov/apod/image/2309/Arp142_HubbleChakrabarti_2627.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top md:object-center opacity-50"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >

      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >

      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-center">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-4xl font-semibold text-white sm:text-6xl">AstronoME</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            a community for people with their heads in the sky
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        </div>
      </div>
      <Weather />
    </div>
  )
}

export default Home;