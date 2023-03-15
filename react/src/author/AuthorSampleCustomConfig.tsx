import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const AuthorSampleCustomConfig = () => {
  const [val, setVal] = useState();
  const ref = useRef(false);

  useEffect(() => {
    (() => {
      axios
        .post("http://localhost:3000/signature", {
          data: {
            service: "author",
            config: {
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
            },
          },
        })
        .then((res) => {
          setVal(res.data);
        })
        .catch((e) => {
          console.log("ERRR", e);
        });
    })();
  }, []);

  useEffect(() => {
    if (ref.current || !val) return;

    if (window.LearnosityAuthor) {
      ref.current = true;
      console.log("window.LearnosityAuthor ___ INIT");

      const authorApp = window.LearnosityAuthor.init(val, {
        readyListener() {
          console.log("ready");
        },
        errorListener(err: any) {
          console.log("error", err);
        },
      });

      authorApp.on("save:activity:error", function (a, b) {
        console.log(a, b);
      });

      authorApp.on("activityedit:item:create", function (a, b) {
        console.log("activityedit:item:create", a, b);
      });
    }
  }, [val]);
  
  return (
    <div>
      <div id="learnosity-author"></div>
    </div>
  );
};

export default AuthorSampleCustomConfig;
