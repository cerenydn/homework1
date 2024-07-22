"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const initialize_user = async () => {
  const idempotencyKey = uuidv4(); // generates an idempotency key

  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/user/initialize",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  TEST_API_KEY:140bde5bc75ae967bfcb6e384ef6067a:b1dd8f54d3e70df71e01ef391501849c`,
      "X-User-Token": `${process.env.NEXT_PUBLIC_USER_TOKEN}`,
    },
    data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-AMOY"] },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("idempotency key: ", idempotencyKey);
      return response.data.data.challengeId;
    })
    .catch(function (error) {
      console.error(error);
    });
};