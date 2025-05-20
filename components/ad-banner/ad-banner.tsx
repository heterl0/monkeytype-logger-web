"use client";

import { memo, useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdBanner = (props: any) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block",
        overflow: "hidden",
      }}
      data-ad-client="ca-pub-4169967998629948"
      {...props}
    />
  );
};
export default memo(AdBanner);
