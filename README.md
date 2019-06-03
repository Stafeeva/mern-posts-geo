# Notes on Solution

To implement the feature I used the Node.js Client for Google Maps Services:

https://github.com/googlemaps/google-maps-services-js

To run the app, you should have a valid google API key. Save it to you bash profile or .zshrc as:

ALAYA_GOOGLE_API_KEY=your_api_key

Important! In order for Filters to work, please create an index in MongoDB:

```
mongo

use mern-starter

db.posts.createIndex(
  {
    title: "text",
    content: "text"
  },
  {
    weights: {
      title: 10,
      content: 5
    },
    name: "TextIndex"
  }
)
```

### Changes

#### DB
  - Added an index for text search

#### Server
  - Added GET `/addresses` endpoint

  - Amended GET `/posts` endpoint to accept query parameters (contains, lat, lng, radius), and to let Mongo sort the results when a text filter is passed - otherwise sort by date added

  - Amended POST `/posts` to accept an address and a location point (lat and lng)

#### Client

  - Changed Create post form to use local state instead of reading the ref (more idiomatic in React)

  - New component AddressSearchField (used by create Post form and filters), sends an API call to the Node app, which queries Google Maps API to find an address. Initially used Redux to store the selected address, and the list of addresses that came back, but I then refactored to use local state instead as it makes the component easier to reuse

  - Refactored showAddPost (do this in the parent component instead rather than hiding with CSS, this ensures React only renders the component when necessary)

  - Changed fetchPosts() to accept filters and to pass them to the API when required

  - Added PostFilter component allowing the user to filter based on text, and location + radius

### Special Note

Text search doesn't work with `$nearSphere` in a single query (more info here: https://docs.mongodb.com/manual/reference/operator/query/nearSphere/).

I use `$geoWithin` instead, which works with a text search. In this case we don't use Index for geolocation, and it returns data unsorted. Posts relevance (weights) is calculated based on text search, and posts are sorted by relevance.

Here is a working solution if you want to use `$nearSphere` without a text search, it returns data sorted by distance:

```
const METERS_PER_KM = 1000;

find.location = {
  $nearSphere: {
    $geometry: {
      type: 'Point',
      coordinates: [lng, lat],
    },
    $maxDistance: (radius || 1000) * METERS_PER_KM,
  },
};
```
`$nearSphere` requires an index, to create one run:

```
db.posts.createIndex({ location: "2dsphere" })
```

# Alaya mern dev challenge

MERN is a scaffolding tool which makes it easy to build isomorphic apps using Mongo, Express, React and NodeJS. It minimises the setup time and gets you up to speed using proven technologies.

- [Website](http://mern.io)
- [Documentation](http://mern.io/documentation.html)
- [Discussions](https://hashnode.com/n/mern)

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm6` is required to install dependencies properly.

## Quickstart

```sh
  npm install
  npm start
```

### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.


## Show us your skills :)

In this project (*which is just a [mern-starter](http://mern.io/documentation.html)*) you can write and edit post blog.

To show us your skills we would like you to build at least one of theses 2 features:

### 1 - Add geolocation to post creation and display it on post element (Full-stack)

The purpose is to be able to attach a geolocation by entering an address in the `PostCreatWidget`,
 to persit it in the `post.js` mongoose model and then to display it using the `PostListItem.js`

For the geocoding you can use the api you want (like [nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) for [openstreetmap](https://www.openstreetmap.org/#map=5/46.449/2.210)
or [google maps](https://developers.google.com/maps/documentation/geocoding/start)).

It would be perfect if we can store at least one gps location and one address in database by post.

You can maybe use the [MongoDB geospatial api](https://docs.mongodb.com/manual/geospatial-queries/) to format your data

### 2 - Add a markdown rich text editor to post creation (Front-end)

You can write markdown manually when creating a post.

To render markdown content we use `ReactMarkdown` in the `PostListItem`.

The purpose here is to have a wysiwyg rich text editor component with a material-ui style doing this stuff when creating a post.

You can use any npm package you want (like [slatejs](https://www.slatejs.org/#/rich-text) or maybe [react-mde](https://github.com/andrerpena/react-mde))

### 3 - Add comments and likes on posts

We want to be able to make a comment and to like each post.

The user that comments will have to put an author name and a message in the comment form.

These informations will be stored in DB using mongoose.

The comment button has to be on the post list and the list of comments has to be on the post page.

For the likes (anonymous) we will have a counter beside the like button to display the number of likes ( stored in DB ).

*Note that we don't have connected user so this test is more to see how you implement the logic*

Good luck :)

### 4 - Filter the posts

Add a filtering component which can sort posts by relevance.

The filter allows the user to enter
 - simple text
 - a location (point) and a radius

Determine how to score the results by proximity and text matching.

The posts are returned in order of relevance, according to the score of each result.

Use mongoose for the aggregation.


_Notes: For evaluation, we will mainly focus on the code structure and readability, the separation of responsibilities in the methods/components, and the visual consistency._
