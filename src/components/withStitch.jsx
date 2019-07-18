import React from "react";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";

const client = Stitch.initializeDefaultAppClient("opus-aggnum-ssnjw");

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("opus-aggnum");

export function withStitch(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
        levels: null
      };
    }

    componentDidMount() {
      client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          this.setState({ user });
          return db
            .collection("levels")
            .find({}, { limit: 100 })
            .asArray();
        })
        .then(levels => this.setState({ levels }))
        .catch(err => {
          console.error(err);
        });
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
}
