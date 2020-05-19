<?php
/**
 * Plugin Name: acnh-todo-app
 * Description: This plugin provides the necessary REST API for the frontend React React acnh-todo-plugin.
 * Author: Gabriel Ong
 */
 // Kill if directly accessed
if (!defined('ABSPATH')) {
    die('You can not access this file!');
}

/*
 * Enqueuing assets from dist/ for plugin using WPackio.
 */

// Require the composer autoload for getting conflict-free access to enqueue
require_once __DIR__ . '/vendor/autoload.php';

class Plugin_Init {
    /**
	 * @var \WPackio\Enqueue
	 */
    public $enqueue;

    public function __construct() {
        $this->enqueue = new \WPackio\Enqueue(
            'acnhTodoApp', // Plugin Name
            'dist', // outputPath
            '1.0.0', // pkg.version
            'plugin', // type
            __FILE__ // plugin location
        );
        add_action('wp_enqueue_scripts', [ $this, 'plugin_enqueue' ] );
    }

    // wp_enqueue entry point as asset
    public function plugin_enqueue() {
        $this->enqueue->enqueue( 'app', 'main', [] );
    }
}

// Instantiate class early (https://wpack.io/guides/using-wpackio-enqueue/#why-call-it-early)
new Plugin_Init();

/*
 * Initializes database table for todos.
 * (https://premium.wpmudev.org/blog/creating-database-tables-for-plugins/)
 */ 
function init_database() {
    // wordpress db access object
    global $wpdb; 
    $charset_collate = $wpdb->get_charset_collate(); // get character set and collation
    $table_name = $wpdb->prefix.'acnh_todos';

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        todo_id TINYINT UNSIGNED AUTO_INCREMENT,
        todo_text VARCHAR(255) NOT NULL,
        todo_complete BOOLEAN NOT NULL DEFAULT 0,
        PRIMARY KEY  (todo_id)
    ) $charset_collate;";

    // Use dbDelta from upgrade.php for database manipulation
    require_once(ABSPATH.'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Call schema initialization on plugin activation
register_activation_hook( __FILE__, 'init_database' );


/*
 * API Routes for todos using WP_REST_Controller.
 */

class Acnh_Todo_Rest extends WP_REST_Controller {
    public $table_name;
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        global $wpdb;
        $this->namespace = 'acnh-todo-app/v1';
        $this->rest_base = '/todos';
        $this->table_name = $wpdb->prefix . 'acnh_todos';

        header('Access-Control-Allow-Origin: *');

        header('Access-Control-Allow-Methods: GET, POST');

        header("Access-Control-Allow-Headers: X-Requested-With");
    }

    public function register_routes() {
        register_rest_route( $this->namespace, $this->rest_base, array(
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_todos' )
            ),
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'post_todo' )
            )
        ) );
        register_rest_route( $this->namespace, $this->rest_base . '/update/(?P<id>[\d]+)' , array(
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'update_todo' )
            )
        ) );
        register_rest_route( $this->namespace, $this->rest_base . '/delete/(?P<id>[\d]+)' , array(
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'delete_todo' )
            )
        ) );
        register_rest_route( $this->namespace, $this->rest_base . '/clear' , array(
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'clear_todos' )
            )
        ) );
    }

    public function get_todos( WP_REST_Request $request ) {
        global $wpdb;
        $sql = "SELECT * FROM $this->table_name;";

        // Checks if empty array or error
        // (https://stackoverflow.com/questions/29274268/wordpress-get-results-how-to-know-if-failed-or-empty)
        if (is_array($results = $wpdb->get_results($sql)) && empty($wpdb->last_error)) {
            $response = new WP_REST_Response($results);
            $response->set_status(200);
        } else {
            $response = new WP_REST_Response("Todo retrieval was unsuccessful.");
            $response->set_status(400);
        }

        return $response;
    }

    public function post_todo( WP_REST_Request $request ) {
        global $wpdb;
        $parameters = $request->get_json_params();
        $todo_text = $parameters['todo_text'];
      
        $sql = $wpdb->prepare("INSERT INTO $this->table_name (todo_text) VALUES ('%s');", $todo_text);

        if ($wpdb->query($sql)) {
            $response = new WP_REST_Response("Created todo $todo_text successfully.");
            $response->set_status(201);
        } else {
            $response = new WP_REST_Response("Todo creation was unsuccessful.");
            $response->set_status(400);
        }
        
        return $response;
    }

    public function update_todo( WP_REST_Request $request ) {
        global $wpdb;
        $todo_id = $request['id'];
        $parameters = $request->get_json_params();
        $todo_text = $parameters['todo_text'];
        $todo_complete = $parameters['todo_complete'];

        $sql = $wpdb->prepare("UPDATE $this->table_name 
                SET todo_text = '%s',
                    todo_complete = %d
                WHERE todo_id = %d;", $todo_text, $todo_complete, $todo_id);

        if ($wpdb->query($sql)) {
            $response = new WP_REST_Response("Updated post $todo_id successfully.");
            $response->set_status(200);
        } else {
            $response = new WP_REST_Response("Todo update was unsuccessful.");
            $response->set_status(400);
        }

        return $response;
    }

    public function delete_todo( WP_REST_Request $request ) {
        global $wpdb;
        $todo_id = $request['id'];
        
        $sql = $wpdb->prepare("DELETE FROM $this->table_name
                WHERE todo_id = %d;", $todo_id);

        if ($wpdb->query($sql)) {
            $response = new WP_REST_Response("Deleted post $todo_id successfully.");
            $response->set_status(200);
        } else {
            $response = new WP_REST_Response("Todo deletion was unsuccessful.");
            $response->set_status(400);
        }

        return $response;
    }

    public function clear_todos( WP_REST_Request $request ) {
        global $wpdb;
        
        $sql = $wpdb->prepare("DELETE FROM $this->table_name;");

        if ($wpdb->query($sql)) {
            $response = new WP_REST_Response("Deleted all todos successfully.");
            $response->set_status(200);
        } else {
            $response = new WP_REST_Response("Deletion of all Todos was unsuccessful.");
            $response->set_status(400);
        }

        return $response;
    }
}

function register_cat_list_controller() {
	$controller = new Acnh_Todo_Rest();
    $controller->register_routes();
}

add_action( 'rest_api_init', 'register_cat_list_controller' );
    