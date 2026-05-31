import React from "react";
import Marquee from "react-fast-marquee";

import {
  SiAmazon,
  SiGoogle,
  SiNetflix,
  SiSpotify,
  SiAdobe,
  SiMeta,
  SiApple,
} from "react-icons/si";

const logos = [
  { icon: <SiAmazon />, name: "Amazon" },
  { icon: <SiGoogle />, name: "Google" },
  { icon: <SiApple />, name: "Apple" },
  { icon: <SiMeta />, name: "Meta" },
  { icon: <SiNetflix />, name: "Netflix" },
  { icon: <SiSpotify />, name: "Spotify" },
  { icon: <SiAdobe />, name: "Adobe" },
];

const ComMarquee = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          Trusted By Leading Companies
        </h2>
        <p className="mt-3 text-base-content/70">
          Millions of readers and organizations trust our platform.
        </p>
      </div>

      <div className="rounded-3xl border border-base-300 bg-base-100 shadow-xl py-8">
        <Marquee
          speed={60}
          pauseOnHover={true}
          
          gradientWidth={15}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-8 flex items-center gap-3 px-8 py-4 rounded-2xl bg-base-200 shadow-md hover:scale-105 transition-all duration-300"
            >
              <span className="text-5xl text-primary">{logo.icon}</span>

              <span className="font-bold text-xl">{logo.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ComMarquee;
