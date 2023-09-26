import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

// import UserList from "../components/UserList";

function Home() {
  const { data, loading, error } = useQuery(QUERY_USERS);

  const users = data?.users || [];

  if (error) {
    throw Error(error);
  }

  if (loading) {
    return <h2 className="text-gray-300 text-center">Loading…</h2>;
  }
  

  return (
    <div className="relative isolate overflow-y-auto py-24 sm:py-32 min-h-screen">
      <img
        src="https://apod.nasa.gov/apod/image/2309/Arp142_HubbleChakrabarti_2627.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-50"
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-center text-gray-300">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-4xl font-semibold sm:text-6xl tracking-wider">Astrono<span className="text-[#6e91b8]">ME</span></h2>
          <p className="mt-6 text-lg leading-8 tracking-wider">
            The galaxy at your fingertips
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        </div>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-9 gap-12 justify-evenly mx-12 lg:mx-32 my-24 lg:my-32 text-gray-300 font-normal">
        <card className="bg-darkest col-span-3 p-8 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
          <h4 className="text-2xl tracking-wide ">Current Conditions</h4>
          <hr className="my-4"/>
          <div className="list-none leading-7">
            <li>Good night for stargazing!</li>
            <div>Moon chart here</div>
            <li>65° F</li>
            <li>Clear skies</li>
          </div>
        </card>
        <card className="bg-darkest col-span-3 p-8 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
          <h4 className="text-2xl tracking-wide">Upcoming Events</h4>
          <hr className="my-4"/>
          <div className="list-none leading-7">
            <li>upcoming event</li>
            <li>info</li>
          </div>
        </card>
        <card className="bg-darkest col-span-3 p-8 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
          <h4 className="text-2xl tracking-wide">Local Star Charts</h4>
          <hr className="my-4"/>
          <div className="list-none leading-7">
            <li>info about stars</li>
            <div>star chart here</div>
            <li>65° F</li>
          </div>
        </card>
      </div>
    </div>
  )
}

export default Home;