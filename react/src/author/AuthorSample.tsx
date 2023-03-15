import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const AuthorSample = () => {
  const [val, setVal] = useState();
  const ref = useRef(false);

  useEffect(() => {
    (() => {
      axios
        .get("http://localhost:3000/items")
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
  }, []);
  return (
    <div>
      <div id="learnosity-author"></div>
    </div>
  );
};

export default AuthorSample;
