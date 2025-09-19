import { sanityClient } from "./sanity";

const tripFields = `
  _id,
  name,
  tagline,
  'slug': slug.current,
  'thumbnail': thumbnail.asset->url,
  'hero': hero.asset->url,
  tripDate,
  destinations,
  itinerary,
  summary,
  breakdown
`;

export async function getTrips() {
  const results = await sanityClient
    .fetch(`*[_type == "trip"] | order(tripDate desc) {
      ${tripFields}
    }`);
  return results;
}

export async function getTripBySlug(slug) {
  const result = await sanityClient
    .fetch(`*[_type == "trip" && slug.current == $slug] {
      ${tripFields}
    }`, { slug });
  return result[0];
}