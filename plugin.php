<?php
/**
 * Plugin name: Cookie Notice
 * Description: "We use cookies" notice plugin for WordPress
 * Author: Miika Arponen / Geniem Oy
 * Author URI: http://www.geniem.com
 * Text Domain: geniem-cookie-notice
 * Version: 0.0.3
 */

namespace Geniem;

require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
 
class CookieNotice {
	private static $instance;

	private static $cookie_notice_text;
	private static $ok_text;
	private static $link_text;
	private static $link_url;

	private static $version;

	protected function __construct() {}

	public static function init() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		\load_textdomain( 'geniem-cookie-notice', dirname( __FILE__ ) . '/languages/' . get_locale() .'.mo' );

		$plugin = \get_plugin_data( __FILE__ );

		self::$version = $plugin['Version'] ?? '';

		self::$cookie_notice_text = __( 'We use cookies. By browsing our site you agree to our use of cookies.', 'geniem-cookie-notice' );
		self::$ok_text = __( 'OK', 'geniem-cookie-notice' );
		self::$link_text = __( 'See details.', 'geniem-cookie-notice' );
		self::$link_url = '';

		add_action( 'wp_enqueue_scripts', __CLASS__ .'::script' );
	}

	public static function script() {
		wp_register_script( 'geniem_cookie_notice', plugin_dir_url( __FILE__ ) .'dist/plugin.js', [], self::$version, true );

		$settings = [
			'cookie_notice_text' => apply_filters( 'geniem/cookie_notice/text', self::$cookie_notice_text ),
			'ok_text' => apply_filters( 'geniem/cookie_notice/ok', self::$ok_text ),
			'link_text' => apply_filters( 'geniem/cookie_notice/link', self::$link_text ),
			'link_url' => apply_filters( 'geniem/cookie_notice/url', self::$link_url )
		];

		wp_localize_script( 'geniem_cookie_notice', 'cookie_notice', $settings );

		wp_enqueue_script( 'geniem_cookie_notice' );
		wp_enqueue_style( 'geniem_cookie_notice', plugin_dir_url( __FILE__ ) .'dist/plugin.css', [], self::$version, null );
	}
}

add_action( 'plugins_loaded', function() {
	CookieNotice::init();
});