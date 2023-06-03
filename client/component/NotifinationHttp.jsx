import React, { useEffect, useState } from "react";
import APICODES from "../Data/apiCodes.json";
import styles from "../styles/NotificationHttp.module.scss";


export const HandlePopup = async (delay, message, status , setOptionalMount) => {
  await new Promise(async (resolve, reject) => {
    delay = delay >= 2000 ? delay : 2000;
    setOptionalMount(
      <NotifinationHttp status={status} message={message} delay={delay} />
    );

    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, delay);
    });

    await new Promise((res, rej) => {
      setTimeout(() => {
        setOptionalMount();
        res();
      }, 2000);
    });
    
    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1000);
    });

    resolve();
  });
};

const NotifinationHttp = ({ message, status, delay }) => {
  const [isStart, setIsStart] = useState(false);
  const [useDelay, setUseDelay] = useState(delay ? delay : 2000);

  useEffect(() => {
    async function startAction() {
      await new Promise((res, rej) => {
        setTimeout(() => {
          setIsStart(true);
          res();
        }, 500);
      });

      await new Promise((res, rej) => {
        setTimeout(() => {
          setIsStart(false);
          res();
        }, delay);
      });

      await new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, 500);
      });
    }

    startAction();

    return () => {
    };
  }, []);

  return (
    <div
      className={`${styles.ParentPopup} ${isStart ? styles.start : ""}`}
      style={{
        backgroundColor: APICODES[status].BackgroundColor,
        color: APICODES[status].Color,
      }}
    >
      {message ? message : APICODES[status].Description}
    </div>
  );
};

export default NotifinationHttp;
