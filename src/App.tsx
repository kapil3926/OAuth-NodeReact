import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BASE_URL, URL } from "./constants";
axios.defaults.baseURL = BASE_URL;

function App() {
  const {
    loginWithPopup,
    // loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const callProtectedApi = async () => {
    try {
      const jwt = await getAccessTokenSilently();
      const result = await axios.get(URL.protected, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      alert("Success");
      console.log(result.data);
    } catch (err) {
      alert((err as any)?.message || "Something went wrong");
    }
  };

  const callPublicApi = async () => {
    try {
      const result = await axios.get(URL.public);
      console.log(result.data);
      alert("Success");
    } catch (err) {
      alert((err as any)?.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        height: "100vh",
      }}
    >
      {!isAuthenticated ? (
        <div>
          <button onClick={() => loginWithPopup()}>Login with Popup</button>
          {/* <button onClick={() => loginWithRedirect()}>
            Login with Redirect
          </button> */}
          <button onClick={() => callProtectedApi()}>Call Protected API</button>
          <button onClick={() => callPublicApi()}>Call Public API</button>
        </div>
      ) : (
        <div>
          <h3>
            Welcome ! <h3 style={{ color: "turquoise" }}>{user?.email}</h3>
          </h3>
          <button style={{}} onClick={() => logout()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
