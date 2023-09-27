import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
// import { useQuery } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries'
import Auth from "../utils/auth";
const applicationSecret =
  "7209f89a36417463671a7ac04ef16a2514562d46beb019ee74ea14e78d8500efc24d93ad0bfdca8fdcb2ace3000fae02878732eaaf40ec7d40d87fe50d2b2918c0709c3bc885a0a7612677059d477e0f5210b30fd3ff2576375e100817a8f1b9bfd1352f7133ce4d0c637cddc61c82e2";
const applicationId = "40e37f7c-2341-4925-b657-9e9396ea3c2a";

const authString = btoa(`${applicationId}:${applicationSecret}`);
function StarChart() {
  async function getBodies() {
    const response = await fetch("https://api.astronomyapi.com/api/v2/bodies", {
      // method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });
    const data = await response.json();
    console.log(data.data.bodies);
  }
  getBodies();

  return (
    <>
      <h4 className="text-2xl tracking-wide">Local Star Charts</h4>
      <hr className="my-4" />
      <div className="list-none leading-7">
        <li>info about stars</li>
        <div>star chart here</div>
        <li>65° F</li>
      </div>
    </>
  );
}

export default StarChart;
