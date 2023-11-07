export interface Post {
  _id: string; // The MongoDB unique identifier for the post
  id: string; // Additional identifier, possibly used for another purpose (can be redundant)
  title: string; // The title of the post
  post: string; // The content of the post
  __v: string; // The version key set by MongoDB for internal use to handle document versioning
  showDetails?: boolean; // Optional property to control the visibility of post details (could be used in the UI)
  department: string; // The department associated with the post
}
