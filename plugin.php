<?php
/**
 * Plugin name: Cookie Notice
 * Description: "We use cookies" notice plugin for WordPress
 * Author: Miika Arponen / Geniem Oy
 * Author URI: http://www.geniem.com
 * Version: 0.0.1
 */

namespace Geniem;
 
class CookieNotice {
	private static $instance;

	private static $cookie_notice_text;
	private static $ok_text;

	protected function __construct() {}

	public static function init() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		$plugin = get_plugin_data( __FILE__ );

		self::$version = $plugin['Version'] ?? '';

		self::$cookie_notice_text = __( 'We use cookies. By browsing our site you agree to our use of cookies.', 'Geniem' );
		self::$ok_text = __( 'OK', 'Geniem' );

		add_action( 'wp_enqueue_scripts', __CLASS__ .'::script' );
	}

	public static function script() {
		wp_register_script( 'geniem_cookie_notice', plugin_dir_url( __FILE__ ) .'dist/plugin.js', [], self::$version, true );

		$texts = [
			'cookie_notice_text' => apply_filters( 'geniem/cookie_notice/text', self::$cookie_notice_text ),
			'ok_text' => apply_filters( 'geniem/cookie_notice/ok', self::$ok_text )
		];

		wp_localize_script( 'geniem_cookie_notice', 'cookie_notice_text', $texts );

		wp_enqueue_script( 'geniem_cookie_notice' );
		wp_enqueue_style( 'geniem_cookie_notice', plugin_dir_url( __FILE__ ) .'dist/plugin.css', [], self::$version, null );
	}
}

CookieNotice::init();