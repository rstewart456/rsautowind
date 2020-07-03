To run the cli type autowind
 
This cli will work with React or Angular.

About
The RSautoWind cli was created for my personal use.  I wanted a cli to copy my configuration files and install tailwind, purgecss and their dependencies. The RSautoWind was designed for new app's that were created with Angular cli or create-react-app or Vue cli.
 
React
The cli will install postcss, purgecss, tailwindcss, autoprefixer, and craco for react. craco (create react app configuration override) allows react to use postcss without much editing.
 
- Ths cli was not tested with SAAS or SCSS in React.  
 
- If you install SAAS or SCSS before using RSautoWind. You might need to edit your index.js file and import the tailwindcss file 
(/assets/main.css).
 
 
Angular
This cli will install tailwindcss, purgecss, and ng-tailwindcss. ng-tailwindcss allow to use tailwindcss and purgecss. Ng-tailwindcss allow you to use ng commands like ng generate component or ng update.  
- To use serve type npm start and to build npm run build. you can still use angular cli.
- I added the optimize build in the package.json
- It was tested on angular 9 and 10.
- It does work with CSS and SCSS
- It does not work with SaaS
 
Vue
This cli install tailwindcss and purgecss in your vue app. Setting up tailwind in vue is easy then React and Angular.
