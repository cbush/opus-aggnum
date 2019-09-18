import React, { useEffect, useState } from "react";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";

const client = Stitch.initializeDefaultAppClient("pipeline-omqsb");

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("pipeline");

export function withStitch(Component) {
  return props => {
    const [user, setUser] = useState(null);
    const [levels, setLevels] = useState(null);

    // Log in when the component mounts, then fetch the game data.
    useEffect(() => {
      client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(setUser)
        .then(() => {
          return db
            .collection("levels")
            .find({}, { limit: 100 })
            .asArray();
        })
        .then(setLevels)
        .catch(err => {
          console.error(err);
        });
    }, []);

    return <Component {...props} user={user} levels={levels} />;
  };
}
