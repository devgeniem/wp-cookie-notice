window.CookieNotice = ( function( window, document ) {
	var app = {};

	app.init = function() {
		var Cookies = require('js-cookie');

		if ( 'undefined' == typeof Cookies.get('cookie_notice') ) {
			var el = document.createElement('div');

			el.setAttribute( 'id', 'geniem-cookie-notice');

			var p = document.createElement('p');

			p.textContent = cookie_notice.cookie_notice_text;

			var button = document.createElement('button');

			button.textContent = cookie_notice.ok_text;

			p.appendChild( button );

			el.appendChild( p );

			if ( cookie_notice.link_url.length > 0 ) {
				var paragraph = document.createElement('p');
				var link = document.createElement('a');

				link.setAttribute( 'href', cookie_notice.link_url );

				link.textContent = cookie_notice.link_text;

				paragraph.appendChild( link );

				el.appendChild( paragraph );
			}

			document.body.appendChild( el );

			app.bodyMargin = el.offsetHeight + 'px';

			document.body.style.marginBottom = app.bodyMargin;

			button.addEventListener( 'click', function( e ) {
				Cookies.set( 'cookie_notice', true, { expires: 365 } );
				el.parentNode.removeChild( el );
			});
		}
	};

	if ( document.readyState != 'loading' ) {
		app.init();
	}
	else {
		document.addEventListener( 'DOMContentLoaded', app.init );
	}

	return app;
})( window, document );