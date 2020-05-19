<h1 align="center">ACNH-Todo-List-WP-Plugin</h1>
<p align="center">
	<a href = "https://reactjs.org"><img src="https://img.shields.io/badge/Made with-React-23425C?logo=react"></a>
	<a href = "#"><img src="https://img.shields.io/badge/Powered by-Caffeine-6f4e37?logo=Buy-Me-A-Coffee"></a>
	<a href = "https://github.com/CS3249-gabrielfrancis/dorm-dashboard/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-informational"></a>
</p>

An Animal Crossing: New Horizons (ACNH) themed to-do list as a WordPress plugin! Todos are stored in your Wordpress MySQL datastore for persistence. Styled fully in LESS and CSS-modules and React.
  

## :palm_tree: Preview :palm_tree:
<div align="center">
	<img src="https://raw.githubusercontent.com/Q-gabe/ACNH-Todo-List-WP-Plugin/master/preview/preview.png">
</div>

<div align="center">
	<span><b>Keep track of your dailies with this new WP plugin widget!</b></span>
</div>
<br>

<div align="center">
	<img src="https://raw.githubusercontent.com/Q-gabe/ACNH-Todo-List-WP-Plugin/master/preview/edit.gif"
    width="500px">
</div>
<div align="center">
	<span><b>Easily mark and edit entered to-do tasks.</b></span>
</div>
<br>

<div align="center">
	<img src="https://raw.githubusercontent.com/Q-gabe/ACNH-Todo-List-WP-Plugin/master/preview/animation.gif" width="500px">
</div>
<div align="center">
	<span><b>Easily mark and edit entered to-do tasks.</b></span>
</div>
<br>


## :palm_tree: How to install :palm_tree: (untested)

### 1. Clone this repository and copy the **acnh-todo-app** folder into your _wp-content/plugins/_ folder

### 2. Update _wpackio.server.js_ with your WP server settings
```
    distPublicPath: '/<YOUR_WORDPRESS_NAME>/wp-content/plugins/acnh-todo-app/dist/',
```
If other settings in wpackio.server.js are not accurate for your deployment, update them as well.
You can alternatively run delete _wpackio.server.js_ and run `npm run bootstrap` to automatically generate the file.

### 3. Install all dependencies
In the plugins/**acnh-todo-app** folder, run the following command:
```
npm install
```
This will likely take a minute or two. :coffee:

### 4. Install all dependencies

WIP

## Documentation :book:
 

### File Structure

To break down the `src` folder structure further:
```
api/        # Route for WP REST API
assets/     # Static FontAwesome SVGs
components/	# Stateless Components - UI logic
containers/	# Stateful Components - Presentation logic
```

React Components are split into *components* and *containers*, according to stateful _containers_ and "contained" stateless _components_. This architecture of containers and components allow for easy extensibility down the line as complex UI components can just be grouped and contained entirely within containers.

## Implementation details :thinking:

WIP

## License :pencil:

Unlicensed
