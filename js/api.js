window.onePage = {};
	( function( window, $, that ) {

		// Constructor.
		that.init = function() {
			that.cache();
			that.bindEvents();
		}

		// Cache all the things.
		that.cache = function() {
			that.$c = {
				window: $( window ),
				body: $( 'body' ),
			};
		}

		// Combine all events.
		that.bindEvents = function() {

			that.getPosts();

        }

		that.getPosts = function() {

			var source   = $( '#entry-template' ).html();
			var template = Handlebars.compile( source );
			var context;

			$.ajax({
			   url: 'http://modemlooper.me/wp-json/wp/v2/posts?_embed',
			   data: {
					filter: {
					   posts_per_page: 8,
					}
			   },
			   dataType: 'json',
			   success: function( data ) {

				 context = {
					 posts: data
				 }

				 var html = template( context );
				 $( '.blog-items' ).html( html );

			   },
			   type: 'GET'
			});

		}

		that.singlePost = function() {

		}


		// Engage!
		$( that.init );

	})( window, jQuery, window.onePage );
