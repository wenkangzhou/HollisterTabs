;( function( window ) {
	
	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Tabs( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this.createDom();
  		this._init();
	}

	Tabs.prototype.options = {
		start : 0
	};

	Tabs.prototype.createDom = function() {
		var fragment = document.createDocumentFragment(),
			infoFragment = document.createDocumentFragment(),
			item,
			infoItem;
		for(var i = 0 ; i < this.options.title.length; i++){
			item = document.createElement("li");
   			fragment.appendChild(item);
   			item.innerHTML = "<a href=\"javascript:void(0)\"><span>"+this.options.title[i]+"</span></a>";

   			infoItem = document.createElement("section");
   			infoFragment.appendChild(infoItem);
   			infoItem.appendChild(document.createTextNode(this.options.info[i]));
		}
		this.el.querySelector( 'nav > ul' ).appendChild(fragment);
		this.el.querySelector( '.content' ).appendChild(infoFragment);
		var istyle = this.el.querySelectorAll( 'nav > ul > li' );
		for(var i = 0; i < istyle.length; i++){
			istyle[i].style.width = 100/this.options.title.length + "%";
		}
	};

	Tabs.prototype._init = function() {

		this.tabs = [].slice.call( this.el.querySelectorAll( 'nav > ul > li' ) );

		this.items = [].slice.call( this.el.querySelectorAll( '.content > section' ) );

		this.current = -1;

		this._show();

		this._initEvents();
	};

	Tabs.prototype._initEvents = function() {
		var self = this;
		this.tabs.forEach( function( tab, idx ) {
			tab.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				self._show( idx );
			} );
		} );
	};

	Tabs.prototype._show = function( idx ) {
		if( this.current >= 0 ) {
			this.tabs[ this.current ].className = '';
			this.items[ this.current ].className = '';
		}
		// change current
		this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
		this.tabs[ this.current ].className = 'tab-current';
		this.items[ this.current ].className = 'content-current';
	};

	window.Tabs = Tabs;

})( window );