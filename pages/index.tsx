import AboutSummary from "../components/about/AboutSummary";
import Trips from "../components/trip/Trips";
import Meta from "../components/Meta";
import ItineraryMap from "../components/trip/ItineraryMap";
import WelcomeParallax from "../components/WelcomeParallax";
import PostsSection from "../components/post/PostsSection";
import {getRecentPosts} from "../lib/postApi";
import {getHomeItinerary} from "../lib/itineraryApi";
import {getTrips} from "../lib/tripApi";
import HeaderAndFooter from "../components/HeaderAndFooter";
import React from "react";

export default function index({trips, itinerary, recentPosts}) {
    return (
        <>
            <Meta/>
            <HeaderAndFooter>
                <WelcomeParallax/>
                <span className="sections">
                    <AboutSummary/>
                    <Trips trips={trips}/>
                    <ItineraryMap itinerary={itinerary}/>
                    <PostsSection posts={recentPosts}/>
                </span>
            </HeaderAndFooter>
        </>
    );
}

export async function getStaticProps() {
    const trips = await getTrips()
    const itinerary = await getHomeItinerary()
    const recentPosts = await getRecentPosts()

    return {
        props: {trips, itinerary, recentPosts},
        revalidate: 1
    }
}