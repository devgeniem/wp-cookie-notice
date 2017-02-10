window.CookieNotice = ( function( window, document ) {
	var app = {};

	app.init = function() {
		var Cookies = require('js-cookie');

		if ( 'undefined' == typeof Cookies.get('cookie_notice') ) {
			var el = document.createElement('div');

			el.setAttribute( 'id', 'geniem-cookie-notice');

			var p = document.createElement('p');

			p.textContent = cookie_notice_text.cookie_notice_text;

			var button = document.createElement('button');

			button.textContent = cookie_notice_text.ok_text;

			p.appendChild( button );

			el.appendChild( p );

			document.body.appendChild( el );

			app.bodyMargin = el.offsetHeight + 'px';

			document.body.style.marginBottom = app.bodyMargin;

			el.addEventListener( 'click', function() {
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