# TILSocial


## API specs


### Auth

- `POST` **`/auth/signup`**
  - request payload : `{name: "Jai Arora", password: "12345323", employeeId: "23gfgfwwdg22",  designation: "software dev", team: "dineout", department: "Tech", bio: "Lorem Ipsum" , interests: ["AI", "React", "Node"]}`
- `POST` **`/auth/signin`**
  - request payload: `{employeeId: "23gfgfwwdg22", password: "12345323" }` 

### 1. Users

- `GET` **`/users/{employeeId}`**
  -  response payload: `{name: 'jai arora', profileImgId: "38d86f99-93e6-4b4e-bbaf-4e9314713ca5", designation: "software dev", team: "dineout", department: "Tech", bio: "Lorem Ipsum" , interests: ["AI", "React", "Node"]}`
- `PATCH` **`/users/{employeeId}`**
  - request payload: `{name: 'jai arora', profileImgId: "38d86f99-93e6-4b4e-bbaf-4e9314713ca5", designation: "software dev", team: "dineout", department: "Tech", bio: "Lorem Ipsum" , interests: ["AI", "React", "Node"]}`
  - response payload: `{}`
- `POST` **`/users/{employeeId}/interests`**
  - request payload: `{interests: ["ML"]}`
  - response payload: `{interests: ["AI", "React", "Node", "ML"]}`
- `DELETE` **`/users/{employeeId}/interests`**
  - request payload: `{interest: ["AI"]}`
  - response payload: `{interests:["React", "Node", "ML"]}`
- `GET` **`/users/{employeeId}/interests`**
  - response paylaod: `{interests:["React", "Node", "ML"]}`

### 2. Posts

- `GET` **`/posts?type=home&sortBy=recent|trending`**
  - response payload: `[{postId: "4e9314713ca5", content: "Lorem Ipsum", likes: 10, comments: 20, isLiked: true, mediaId: "b5effc17-d552-40e5-ba4c-71391d57618f"}, {postId: "4e9314713ca5", content: "Lorem Ipsum", likes: 10, comments: 20, isLiked: true, mediaId: "b5effc17-d552-40e5-ba4c-71391d57618f"}]` 
- `GET` **`/posts?type=activity`**
  - response payload: `[{postId: "4e9314713ca5", content: "Lorem Ipsum", likes: 10, comments: 20, isLiked: true, mediaId: "b5effc17-d552-40e5-ba4c-71391d57618f"}, {postId: "4e9314713ca5", content: "Lorem Ipsum", likes: 10, comments: 20, isLiked: true, mediaId: "b5effc17-d552-40e5-ba4c-71391d57618f"}]` 
- `POST` **`/posts`**
  - request payload: `{content: "lorem ipsum", tags: ["Web Dev", "React"], mediaId: "b5effc17-d552-40e5-ba4c-71391d57618f"]}`
  - response payload: `{postId: "4e9314713ca5", content: "Lorem Ipsum", likes: 0, comments: 0, isLiked: false, mediaId: "b5effc17-d552-40e5-ba4c-71391d57618}`

#### 2.1. Likes

- `PUT` **`/posts/{postId}/like`**
  - request payload: `{employeeId: "3243dfsdl23"}`
  - response payload: `{postId: "4e9314713ca5", content: "Lorem Ipsum", likes: 1, comments: 0, isLiked: true, mediaId: "b5effc17-d552-40e5-ba4c-71391d57618}`
- `DELETE` **`/posts/{postId}/like`**
  - request payload: `{employeeId: "3243dfsdl23"}`
  - response payload: `{postId: "4e9314713ca5", content: "Lorem Ipsum", likes: 0, comments: 0, isLiked: false, mediaId: "b5effc17-d552-40e5-ba4c-71391d57618}`

#### 2.2. Comments

- `GET` **`/posts/{postId}/comments`**
  - response payload: `[{commentId: "fc4cd486d97b", user: {userId: "234ef2344f3", name: "John Doe", designation: "Software Developer"}, comment: "Lorem Ipsum"}]` 
- `POST` **`/posts/{postId}/comments`**
  - request payload: `{userId: "23423fds234", comment: "Lorem Ipsum"}`
  - response payload: `{commentId: "fc4cd486d97b", user: {userId: "234ef2344f3", name: "John Doe", designation: "Software Developer"}, comment: "Lorem Ipsum"}`

