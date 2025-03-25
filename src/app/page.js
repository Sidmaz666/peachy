// Example usage in a component (e.g., src/app/home/page.js)
import { useGlobalState, useState, Peachy } from "@peach/component";
import { PersistedAppState, AppState } from "@peach/state";
import { useFetch } from "@peach/fetch";

export default function HomePage() {
  // Local component state example.
  const [getCount, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [getLoading, getData, getError, revalidate, abortFetch] = useFetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'GET',
    cacheTime: 50000, // cache for 50 seconds, to disable cacheTime: 0
    revalidateInterval: 60000 , // re-fetch every 60 seconds, to disable revalidateInterval: Infinity
  });

  // Update Global App State
  AppState.set("lastVisited", "Home");

  // Use persistent global state for "theme".
  const [getTheme, setTheme] = useGlobalState(PersistedAppState, "theme");

  return (
    <div className="home-page flex flex-col justify-center items-center space-y-2 pt-12">
      <ul className="list-disc my-4">
      {["Value 1", "Value 2", "Value 3"].map((value, index) => (
        <li>{value}</li>
      ))}
      </ul>

      <h2>Example Page</h2>
      {show
        ? "Hello World!"
        : "Nohthing to show! Click on the button below to toggle."}
      <button
        onClick={() => setShow(!show)}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
      >
        Toggle Show
      </button>
      <p>Localized component state - counter: {String(getCount)}</p>
      <button
        onClick={() => setCount(getCount + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
      >
        Increment Counter
      </button>
      <div className="mt-4">
        <p>Persistent Global Theme: {String(getTheme) || "default"}</p>
        <button
          onClick={() => setTheme("dark")}
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
        >
          Set Dark Theme
        </button>
      </div>
      <div>
        <span>Global App State: {AppState.get("lastVisited") || "none"} </span>
      </div>
      <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Home Page with useFetch</h2>
      {getLoading && <p>Loading...</p>}
      {getError && <p className="text-red-500">Error: {getError?.message}</p>}
      {getData && (
        <pre className="border border-gray-500 p-2 rounded">
          {JSON.stringify(getData, null, 2)}
        </pre>
      )}
      <button onClick={abortFetch} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Abort Fetch
      </button>
      <button onClick={revalidate} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Revaliate</button>
    </div>
    </div>
  );
}
