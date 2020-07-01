To run the cli type autowind

The RSautoWind cli was created for my personal use.  I wanted an cli to copy my configuration files and install programs that allow tailwindcss and purgecss to work. This cli will work with React or Angular. This program will make a backup copy of the package.json file.
The RSautoWind was created for new app's and the app was created with Angular cli or create-react-app.

React
The cli will install postcss, purgecss, tailwindcss, autoprefixer, and craco for react. craco (create react app configeration override) allows react to use postcss without much editing.

- Ths cli was not tested for SCSS or SAAS in React.  You need to edit your index.js to point to tailwindcss file (/assets/main.css) 
 
 
Angular
The cli will install tailwindcss, purgecss, and ng-tailwindcss. ng-tailwindcss allow to use tailwindcss and purgecss.
- To use serve type npm start and to build npm run build. you can still use angular cli.
- I added the optimize build in the package.json
- It was tested on angular 9 and 10.
- It does work with CSS and SCSS
- It does not work with SaaS