<h1 align="center">ACNH-Todo-List-WP-Plugin</h1>
<p align="center">
	<a href = "https://reactjs.org"><img src="https://img.shields.io/badge/Made with-React-23425C?logo=react"></a>
    <a href = "https://reactjs.org"><img src="https://img.shields.io/badge/Made with-PHP-777BB4?logo=PHP"></a>
    <a href = "https://reactjs.org"><img src="https://img.shields.io/badge/Made with-MySQL-4479A1?logo=MySQL"></a>
    <br>
    <a href = "https://wordpress.com/"><img src="https://img.shields.io/badge/Made for-WordPress-21759B?logo=Wordpress"></a>
    <a href = "https://wordpress.com/"><img src="https://img.shields.io/badge/Inspired by-ACNH-DDD4AB?logo=Nintendo Switch"></a>
	<a href = "#"><img src="https://img.shields.io/badge/Powered by-Caffeine-6f4e37?logo=Buy-Me-A-Coffee"></a>
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
	<span><b>Fully animated buttons!</b></span>
</div>
<br>


## :palm_tree: How to install `[untested]` :palm_tree: 

### 1. Clone this repository and copy the **acnh-todo-app** folder into your _wp-content/plugins/_ folder

### 2. Update _wpackio.server.js_ with your WP server settings
```
    distPublicPath: '/<YOUR_WORDPRESS_NAME>/wp-content/plugins/acnh-todo-app/dist/',
```
If other settings in wpackio.server.js are not accurate for your deployment, update them as well.
You can alternatively run delete _wpackio.server.js_ and run `npm run bootstrap` to automatically generate the file.

### 3. Update *src/api/apiRoutes.js* API route path
```
    export const todosRoute = "http://<SERVER_ADDRESS>/<YOUR_WORDPRESS_NAME>/?rest_route=/acnh-todo-app/v1/todos";
```
Update the `todosRoute` constant in *src/api/apiRoutes.js* to ensure that the widget can sends HTTP requests to the correct route.
(E.g. *http://localhost:8888/acnh_todos/?rest_route=/acnh-todo-app/v1/todos* ) 

### 4. Install all dependencies
In the plugins/**acnh-todo-app** folder, run the following command:
```
npm install
```
This will likely take a minute or two. :coffee:

### 5. Build the webpack using wpackio
In the plugins/**acnh-todo-app** folder, run the following command:
```
npm run build
```
This will generate a _dist/_ folder that contains the minified resources for the app.

### 6. Activate the plugin in your admin dashboard

### 7. Add an empty `div` target for the plugin.
Using the block editor, add a Shortcode block where you want the todo app to live on your WP site. Add the following HTML code into the block.
```
<div id="acnh-todo"></div>
```

### 8. Save changes, navigate to the page and enjoy! (:

## Documentation :book:

### UI File Structure:
To break down the `src` folder structure further:
```
api/        # Route for WP REST API
assets/     # Static FontAwesome SVGs
components/	# Stateless Components - UI logic
containers/	# Stateful Components - Presentation logic
```

React Components are split into *components* and *containers*, according to stateful _containers_ and "contained" stateless _components_. This architecture of containers and components allow for easy extensibility down the line as complex UI components can just be grouped and contained entirely within containers.

### Implementation details :thinking:

#### REST API:
The file provisioning the REST API on the server layer is **acnh-todo-app.php**, which describes the following routes:

* **'acnh-todo-app/v1/todos'**
  * `GET` - Returns all the tasks currently stored.
  * `POST` - Creates a new task.
* **'acnh-todo-app/v1/todos/update/\<id\>'**
  * `POST` - Updates a task with that id.
* **'acnh-todo-app/v1/todos/delete/\<id\>'**
  * `POST` - Deletes a task with that id.
* **'acnh-todo-app/v1/todos/clear'**
  * `POST` - Clears all tasks in the datastore.

#### WP MySQL Datastore:

The plugin creates a table called \<YOUR-WP-PREFIX\>acnh_todos in your WordPress deployment's database. (Not making a custom WordPress Post type.) The schema is as follows:
| todo_id | todo_text | todo_complete |
|:-:|:-:|:-:|
| Autoincrementing `tinyint(3)` for identification | To-do `varchar(255)` description  | `Boolean` for status |

#### Known Issues and Possible improvements:

* **Slow Load of todos due to REST API calls:**
  * Understandably the UI has a noticeable delay as the state change is not visible until the API is called and data is fetched back from the server.
  * **Possible Mitigations:** Optimistic UI - UI can change optimistically first before data is fetched to respond to the user first for user delight.
* **Synchronous Representation of Data:**
  * The plugin can be accessed from multiple browsers, and the data is not updated when one client makes changes to the datastore when another is viewing.
  * **Possible Mitigations:** PubSub or Polling. I think with tighter data coupling, synchronous data representation would likely be easier.

*Note: This plugin was an exercise for my personal API and WP development skills. If I had to (and I think I might!) rebuild the application with whatever stack I wanted, I would simply use the React FrontEnd with a localStorage data store (like [redux-persist](https://github.com/rt2zz/redux-persist)) instead of a full MAMP stack. I think that would have huge performance benefits and would be easier to maintain + fits the application better.*

## License :pencil:

`MIT`
