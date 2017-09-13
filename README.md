# Readable Project

The second project in the React Nanodegree course is an anonymous content and comment web application, built using React and Redux. This contents and comment structure is common across a large number of websites and applications, from news sites to blogs to aggregators like Hacker News and Reddit.
Users will be able to post content to predefined categories, comment on their posts and other users' posts and vote on posts and comments.
Users will also be able to edit and delete posts and comments.

## Getting Started

To use this application you will need to install a local backend development server, which can be (forked and) downloaded at [this](https://github.com/daniel-234/reactnd-project-readable-api-server) repo. Follow the instructions in the README file to install and launch it.
To install this application, instead, you can (fork and) download it and then run the command `npm install` from your console. To launch it, after the installation has successfully complete, launch it with the command `npm start`.

## Built With

* [React](https://facebook.github.io/react/) - A JavaScript library for building user interfaces
* [Redux](http://redux.js.org/) - A predictable state container for JavaScript apps
* [Readable API server](https://github.com/udacity/reactnd-project-readable-starter) - The local backend development server used
* [Redux form](http://redux-form.com/7.0.3/)

## Author

* **Daniele Erbì** - [daniel-234](https://github.com/daniel-234)

## Notes

Note that at this stage the app is not complete. A very small part of the actions and reducers have been developed, as well as just some basic React code. The API file is largely incomplete at this stage, too. Just the main connections have been implemented, to make things work. Improvements will come soon.
The work in progress is made under the development branch, but merges are made regularly. After the course lessons I switched to the official documentation to expand my knowledge on the subject and decided to keep a development branch to work on changes without experimenting too much on the master branch.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Stackoverflow - How to add an element to an array in Redux](https://stackoverflow.com/questions/40911194/how-do-i-add-an-element-to-array-in-reducer-of-react-native-redux)
* [Stackoverflow - Adding multiple objects to the store in Redux](https://stackoverflow.com/questions/42463609/adding-multiple-objects-to-the-store-in-redux)
* Generate a UUID identifier.
* [Stackoverflow - Create GUID - UUID in JavaScript](https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript)
* After following the Udacity course lessons, which introduced me to the main topics (and troubles) of adopting Redux for the first time, I switched to the official Redux documentation when I had to develop this project in a manner that was going to progressively diverge from the one encountered in the lessons.
One of the things that I had to change was the form, for which I chose to use the 'redux-form' package. I read something online about the difficulties of updating the store state with a user input and found that as this application makes heavy use of form data, it was better to use something robust and reliable to handle all of the data.
Here a list of the resources that helped me most:
* [Hackernoon - Using forms in React-Redux: tips and tricks](https://hackernoon.com/using-forms-in-react-redux-tips-and-tricks-48ad9c7522f6)
* [Medium - Using Redux to handle user input](https://medium.com/@jtbennett/using-redux-form-to-handle-user-input-1392826f2c6d)
* [Redux-form docs: Getting started with redux-form](http://redux-form.com/6.0.0-alpha.4/docs/GettingStarted.md/)
* [Erik Rasmussen - Abstracting Form State with Redux Form](https://www.youtube.com/watch?v=eDTi7lYR1VU&feature=youtu.be)
* [Stackoverflow - Clear 'redux-form' after submitting](https://stackoverflow.com/questions/42551955/clear-redux-form-fields-after-submitting)
* Apart from the good explanation on the Redux official documentation and the lessons in the Udacity course, I relied on a post from Dan Abramov in Stackoverflow and the README documentation in the GitHub repository of the Redux thunk middleware. Dan Abramov points to an official Async example to understand the thunk middleware mechanism, and I relied heavily on some of its code to build some of my actions.
* [GitHub - Redux thunk repository](https://github.com/gaearon/redux-thunk)
* [Stackoverflow - How to dispatch a Redux thunk with a timeout](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/)
* A brush up on how to center and align divs and unordered lists without special hacks:
* [Stackoverflow - Need an unordered list without any bullets](https://stackoverflow.com/questions/1027354/need-an-unordered-list-without-any-bullets)
* [Stackoverflow - Unordered list not aligning all the way to the left in a div](https://stackoverflow.com/questions/10972096/unordered-list-not-aligning-all-the-way-to-the-left-in-a-div)
* [Matthew James Taylor's Blog - Beautiful CSS centered menu with no hacks](http://matthewjamestaylor.com/blog/beautiful-css-centered-menus-no-hacks-full-cross-browser-support)
* Adding React Router to the project:
* [Egghead - JavaScript Redux adding React Router to the project](https://egghead.io/lessons/javascript-redux-adding-react-router-to-the-project)
* [Redux docs - Advanced tutorial: usage with React Router](http://redux.js.org/docs/advanced/UsageWithReactRouter.html)
* Solve problems with browser history in Redux, as `history` is a module on its own now:
* [Stackoverflow - React Router v4 browserHistory is undefined](https://stackoverflow.com/questions/43822589/react-router-v4-browserhistory-is-undefined)
* [GitHub - ReactTraining history library](https://github.com/ReactTraining/history)
* To make the app work well with React Router I had to add a Switch component. Here is the answer on Stackoverflow that hinted me to the solution:
* [Stackoverflow - React Router with optional path parameter](https://stackoverflow.com/questions/35604617/react-router-with-optional-path-parameter)
* Other resources that have been useful to me on React Router:
* [Stackoverflow - React Router Switch component matches](https://stackoverflow.com/questions/43584748/react-router-switch-component-matches)
* [React Training - React Router Web API Swicth](https://reacttraining.com/react-router/web/api/Switch)
* [Stackoverflow - Wrapping a React Router Link in an HTML button](https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button)
* Some CSS hints to display the two React icons arrows on the page:
* [Stackoverflow - Two divs side by side fluid display](https://stackoverflow.com/questions/17217766/two-divs-side-by-side-fluid-display)
* [Stackoverflow - How can I stack two arrow images (upvote and downvote) on top of each other using CSS](https://stackoverflow.com/questions/764042/how-can-i-stack-two-arrow-images-upvote-downvote-on-top-of-eachother-using-css)
* On implementing the mechanism to vote a post I faced some issues, one of which was a way to pass a reference to the click mechanism. This answer in Stackoverflow helped me solve it:
* [Stackoverflow - ReactJS onClick can't pass value to method](https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method)
* When I was looking for a way to sort the posts in my app, through the `select` form in the main page, I came across this post on Stackoverflow. Thanks to the answers I was able to get in the right path. I followed the second one, which pointed me to the Redux Documentation and the section `Usage with React`.
* [Stackoverflow - Where should I handle sorting in Redux App?](https://stackoverflow.com/questions/34475367/where-should-i-handle-sorting-in-redux-app)
* Using Redux with React and separating Presentational and Container Components:
* [Redux Docs - Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html)
* [GitHub Redux issues - State changes but does not call render function of Parent Component](https://github.com/reactjs/redux/issues/2190)
* [GitHub React issues - Components not re-rendering with connect()](https://github.com/reactjs/redux/issues/585)
* [Stackoverflow - My Redux state has changed. Why doesn't React trigger a re-render?](https://stackoverflow.com/questions/39513753/my-redux-state-has-changed-why-doesnt-react-trigger-a-re-render)
* Convert a Unit timestamp into a readable date:
* [Stackoverflow - Convert a Unix timestamp to time in JavaScript](https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript)
* Adding features to a container component:
* [GithHub - Allow connect to more than one component](https://github.com/reactjs/react-redux/issues/647)
* [Stackoverflow - Passing `props` to React-Redux Container Component](https://stackoverflow.com/questions/37778153/passing-props-to-react-redux-container-component)