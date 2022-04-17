import AboutSummary from "../components/about/AboutSummary";
import Trips from "../components/trip/Trips";
import ItineraryMap from "../components/trip/ItineraryMap";
import WelcomeParallax from "../components/WelcomeParallax";
import PostsSection from "../components/post/PostsSection";
import {getRecentPosts} from "../lib/postApi";
import {getHomeItinerary} from "../lib/itineraryApi";
import {getTrips} from "../lib/tripApi";
import HeaderAndFooter from "../components/HeaderAndFooter";
import React from "react";

export default function index({trips, itinerary, recentPosts, preview}) {
  const containerRef = React.useRef(null);
  return (
      <HeaderAndFooter>
          <WelcomeParallax />
          <span className="sections">
              <AboutSummary/>
              <Trips trips={trips}/>
              <ItineraryMap itinerary={itinerary}/>
              <PostsSection posts={recentPosts}/>
          </span>
      </HeaderAndFooter>
  );
}

export async function getStaticProps({ preview = false }) {
    const trips = await getTrips(preview)
    const itinerary = await getHomeItinerary(preview)
    const recentPosts = await getRecentPosts(preview)

    return {
        props: { trips, itinerary, recentPosts, preview },
        revalidate: 1
    }
}