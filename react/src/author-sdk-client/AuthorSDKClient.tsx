import LearnositySDK from "../sdk/learnosity";
import { useEffect, useRef } from "react";

const config = {
  consumerKey: "yis0TYCu7U9V4o7M",
  consumerSecret: "74c5fd430cf1242a527f6223aebd42d30464be22",
};

const domain = "localhost";

// @ts-ignore
const learnositySdk = new LearnositySDK(); // Instantiate the SDK
// Reports API configuration parameters.
const request = learnositySdk.init(
  "author", // Select Author API
  // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
  {
    consumer_key: config.consumerKey, // Load key from config.js
    domain: domain, // Set the domain (from line 20)
  },
  config.consumerSecret, // Load secret from config.js
  // simple api request object for item list view
  {
    mode: "item_list",
    config: {
      item_edit: {
        item: {
          reference: {
            show: true,
            edit: false,
          },
          dynamic_content: true,
          shareed_passage: true,
          enable_audio_recording: true,
        },
      },
    },
    user: {
      id: "demos-site",
      firstname: "Demos",
      lastname: "User",
      email: "demos@learnosity.com",
    },
  }
);

function AuthorSDKClient() {
  const ref = useRef(false);
  
  useEffect(() => {
    if (ref.current) return;
    // @ts-ignore

    if (window.LearnosityAuthor) {
      console.log("window.LearnosityAuthor INIT");

      ref.current = true;
      // @ts-ignore
      const authorApp = window.LearnosityAuthor.init(request, {
        readyListener() {
          console.log("ready");
        },
        errorListener(err: any) {
          console.log("error", err);
        },
      });
    }
  }, []);

  return (
    <div>
      <div id="learnosity-author"></div>
    </div>
  );
}

export default AuthorSDKClient;
