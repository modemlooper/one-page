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
				site_url: 'http://modemlooper.me',
				data: [],
			};
		}

		// Combine all events.
		that.bindEvents = function() {

			that.getPosts();

			that.$c.body.on( 'click', '.blog-item a', function( e ) {
				that.singlePost( $( this ).data('id') );
				return false;
			});

			that.$c.body.on( 'click', 'span.close-modal', function( e ) {
				$( this ).parent().parent().remove();
				$('body').removeClass('modal-open');
				return false;
			});

        }

		that.getPosts = function() {

			var source   = $( '#posts-template' ).html();
			var template = Handlebars.compile( source );
			var context;

			$.ajax({
			   url: that.$c.site_url + '/wp-json/wp/v2/posts?_embed',
			   data: {
					filter: {
					   posts_per_page: 8,
					}
			   },
			   dataType: 'json',
			   success: function( data ) {

				 that.$c.data = data;

				 context = {
					 posts: data
				 }

				 var html = template( context );
				 $( '.blog-items' ).html( html );

			   },
			   type: 'GET'
			});

		}

		that.singlePost = function( id ) {

			var source   = $( '#single-template' ).html();
			var template = Handlebars.compile( source );
			var context;

			var post = $.grep( that.$c.data, function(e){ return e.id === id; });

			if ( post.length == 0 ) {
			  // not found
			} else if ( post.length == 1 ) {

			  context = {
				  title: post[0].title.rendered,
				  content: post[0].content.rendered,
			  }

			  $('body').addClass('modal-open');

			  var html = template( context );
			  $( 'body' ).append( html );

			}

		}


		// Engage!
		$( that.init );

	})( window, jQuery, window.onePage );
