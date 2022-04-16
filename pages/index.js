import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AboutSummary from "../components/about/AboutSummary";
import Trips from "../components/trip/Trips";
import ItineraryMap from "../components/trip/ItineraryMap";
import WelcomeParallax from "../components/WelcomeParallax";
import PostsSection from "../components/post/PostsSection";
import {getRecentPosts} from "./api/postApi";
import {getHomeItinerary} from "./api/itineraryApi";
import {getTrips} from "./api/tripApi";
import HeaderAndFooter from "../components/HeaderAndFooter";
import {library} from '@fortawesome/fontawesome-svg-core'

import React, { useState, useEffect } from "react";

const index = ({ preview = false }) => {
  const [trips, setTrips] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  useEffect(() => {
      getHomeItinerary(preview)
          .then((data) => setItinerary(data))
          .catch(console.error);
      getRecentPosts(preview)
          .then((data) => setRecentPosts(data))
          .catch(console.error);
      getTrips(preview)
          .then((data) => setTrips(data))
          .catch(console.error);
  }, [preview]);
  const containerRef = React.useRef(null);
  return (
      <HeaderAndFooter>
          <WelcomeParallax slideContainerRef={containerRef}/>
          <span className="sections">
              <AboutSummary/>
              <Trips trips={trips}/>
              <ItineraryMap itinerary={itinerary}/>
              <PostsSection posts={recentPosts}/>
          </span>
      </HeaderAndFooter>
  );
}

export default index;
