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
* After following the Udacity course lessons, which introduced me to the main topics (and troubles) of adopting Redux for the first time, I switched to the official Redux documentation when I had to develop this project in a manner that was going to progressively diverge from the one encountered in the lessons.
One of the things that I had to change was the form, for which I chose to use the 'redux-form' package. I read something online about the difficulties of updating the store state with a user input and found that as this application makes heavy use of form data, it was better to use something robust and reliable to handle all of the data.
Here a list of the resources that helped me most:
* [Hackernoon - Using forms in React-Redux: tips and tricks](https://hackernoon.com/using-forms-in-react-redux-tips-and-tricks-48ad9c7522f6)
* [Medium - Using Redux to handle user input](https://medium.com/@jtbennett/using-redux-form-to-handle-user-input-1392826f2c6d)
* [Redux-form docs: Getting started with redux-form](http://redux-form.com/6.0.0-alpha.4/docs/GettingStarted.md/)
* [Stackoverflow - Clear 'redux-form' after submitting](https://stackoverflow.com/questions/42551955/clear-redux-form-fields-after-submitting)