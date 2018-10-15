window.CookieNotice = ( function( window, document ) {
	var app = {};

	app.init = function() {
		var Cookies = require('js-cookie');

		if ( 'undefined' == typeof Cookies.get('cookie_notice') ) {

			var elOuter = document.createElement('div');

			app.cookieNoticeElem = elOuter;

			elOuter.setAttribute( 'id', 'geniem-cookie-notice' );
			elOuter.setAttribute( 'class', 'geniem-cookie-notice' );

			var el = document.createElement( 'div' );

			el.setAttribute( 'class', 'geniem-cookie-notice__inner');

			var p = document.createElement('p');
			p.setAttribute( 'class', 'geniem-cookie-notice__text-and-button' );

			var span = document.createElement( 'span' );

			span.setAttribute( 'class', 'geniem-cookie-notice__text' );

			span.textContent = cookie_notice.cookie_notice_text;

			p.appendChild( span );

			var button = document.createElement('button');
			button.setAttribute( 'class', 'geniem-cookie-notice__button' );

			button.textContent = cookie_notice.ok_text;

			p.appendChild( button );

			el.appendChild( p );

			if ( cookie_notice.link_url ) {
				var paragraph = document.createElement('p');
				paragraph.setAttribute( 'class', 'geniem-cookie-notice__details' );

				var link = document.createElement('a');

				link.setAttribute( 'class', 'geniem-cookie-notice__link' );
				link.setAttribute( 'href', cookie_notice.link_url );

				link.textContent = cookie_notice.link_text;

				paragraph.appendChild( link );

				el.appendChild( paragraph );
			}

			elOuter.appendChild( el );

			document.body.appendChild( elOuter );

			// Get the original body margin, so that it may be resized later on.
			app.originalBodyMarginBottom = window.getComputedStyle(document.body).getPropertyValue('margin-bottom');

			app.setBodyMargin();

			var cookieExpires = parseInt( cookie_notice.expires );

			window.addEventListener('resize', app.setBodyMargin);

			button.addEventListener( 'click', function( e ) {
				Cookies.set( 'cookie_notice', true, { expires: cookieExpires } );
				elOuter.parentNode.removeChild( elOuter );

				// Restore body bottom margin.
				document.body.style.marginBottom = app.originalBodyMarginBottom;

				// Remove event resize listener.
				window.removeEventListener('resize', app.setBodyMargin);
			});
		}
	};

	// Set body margin to match the cookie notice element height.
	app.setBodyMargin = function() {
		if (app.cookieNoticeElem) {
			document.body.style.marginBottom = app.cookieNoticeElem.offsetHeight + 'px';
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