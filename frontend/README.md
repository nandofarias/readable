# Material News

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). To run this project, please run ```npm start``` to open the project in a new browser tab.

## Folder Structure

This project makes use of redux library and it's files are distributed mostly in src/actions, src/components and src/reducers folders.

```
frontend
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── actions
│   │   ├── categories.js
│   │   ├── comments.js
│   │   └── posts.js
│   ├── components
│   │   ├── Comment.js
│   │   ├── EditComment.js
│   │   ├── EditPost.js
│   │   ├── Header.js
│   │   ├── ListCategories.js
│   │   ├── ListPosts.js
│   │   ├── NewComment.js
│   │   ├── NewPost.js
│   │   └── Post.js
│   ├── index.css
│   ├── index.js
│   ├── pages
│   │   ├── Home.js
│   │   └── SinglePost.js
│   ├── reducers
│   │   ├── categories.js
│   │   ├── comments.js
│   │   ├── index.js
│   │   └── posts.js
│   └── utils
│       └── api.js
└── yarn.lock
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
