<?php
// die if plugin uninstall not called
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

// drop custom acnh table on plugin uninstall to delete all todo data
global $wpdb;
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}acnh_todos");