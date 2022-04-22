import {getAllPosts} from "../lib/postApi";
import {getDestinations} from "../lib/destinationApi";
import {getTrips} from "../lib/tripApi";

const URL_BASE = 'https://wheresobee.blog'

function generateSiteMap(posts, destinations, trips) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${URL_BASE}</loc>
     </url>
     <url>
       <loc>${URL_BASE}/about</loc>
     </url>
     <url>
       <loc>${URL_BASE}/privacy</loc>
     </url>
     <url>
       <loc>${URL_BASE}/posts</loc>
     </url>
     ${posts.map(({slug}) => {
            return `
       <url>
           <loc>${`${URL_BASE}/posts/${slug}`}</loc>
       </url>
     `
        })
        .join('')}
     <url>
       <loc>${URL_BASE}/destinations</loc>
     </url>
     ${destinations.map(({slug}) => {
            return `
       <url>
           <loc>${`${URL_BASE}/destinations/${slug}`}</loc>
       </url>
     `
        })
        .join('')}
     ${trips.map(({slug}) => {
            return `
       <url>
           <loc>${`${URL_BASE}/trips/${slug}`}</loc>
       </url>
     `
        })
        .join('')}
   </urlset>
 `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({res}) {
    // We make an API call to gather the URLs for our site
    const posts = await getAllPosts(false)
    const destinations = await getDestinations(false)
    const trips = await getTrips(false)


    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts, destinations, trips)

    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.write(sitemap)
    res.end()

    return {
        props: {}
    }
}

export default SiteMap