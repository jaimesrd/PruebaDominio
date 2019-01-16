$.post('http://dominioproyectos.com:3000/noticias/obtenernoticias',{"ID_Usuario":1}, function(data) { 
    var Noticias ='';
    var contador =0;
    $.each(data,function(key,value){
    	
    	Noticias +='<article>';
		Noticias +='	<header>';
		Noticias +='		<a href="#" class="image user"><img src="'+value.foto_usuario+'" alt=""/></a>'+value.Usuario;
		Noticias +='	</header>';
		Noticias +='	<a href="#" class="image fit"><img src="'+value.Imagen_1+'" alt="" /></a>';
		Noticias +='	<h2><a href="#">'+value.Encabezado+'</a></h2>';
		Noticias +='	<p>'+value.Texto1+'</p>';
		Noticias +='	<p id="imgclick_'+contador+'" class="image like"><img onclick="myFunctionLike('+contador+','+value.Flag_Reaccion+','+value.Total_Reaccion+')" src="images/Like_'+value.Flag_Reaccion+'.png" alt="" /></p>';
		Noticias +='	<p id="numclick_'+contador+'">A '+value.Total_Reaccion+' personas les gusta esto.</p>';
		Noticias +='	<div align="right" class="columna"> ';
        Noticias +='    	<div>';
        Noticias +='			<a onclick="return toggle('+contador+')">('+value.comments.length+') Comentarios</a>';
        Noticias +='		</div>';
        Noticias +='	</div>';
        
        Noticias +='	<ul class="toggle-content" id="contenido_'+contador+'"> <br>';
        
        	var Comentarios ='';
        	$.each(value.comments,function(key2,value2){
				Comentarios += '<li>'+value2.Comentario+'</li>';
			});
		
		Noticias += Comentarios; 		
		Noticias +='	</ul>';  
        Noticias +='</article>'; 

		contador = contador+1; 

    });
    $('#noticias').append(Noticias);
    //alert(Noticias);
    //alert(Comentarios);
},'json');




function toggle (id) {
    var toggleable = document.querySelector('#contenido_'+id);
    
    if (!toggleable) return;
    
    if (!toggleable.style.display
        || toggleable.style.display === 'none') {
        toggleable.style.display = 'block';
    } else {
        toggleable.style.display = 'none';
    }
    
    return false;
}



function myFunctionLike(p1,p2,p3) {
	switch (p2) {
	  case 1:
	    var p4 = (p3-1);
		document.getElementById("numclick_"+p1).innerHTML =	'A '+p4+' personas les gusta esto.';

	    document.getElementById("imgclick_"+p1).innerHTML = '<img onclick="myFunctionLike('+p1+',0,'+p4+')" src="images/Like_BN.png" alt="" />';
	    break;
	  case 0:
	    var p4 = (p3+1);
		document.getElementById("numclick_"+p1).innerHTML =	'A '+p4+' personas les gusta esto.';

	    document.getElementById("imgclick_"+p1).innerHTML = '<img onclick="myFunctionLike('+p1+',1,'+p4+')" src="images/Like_C.png" alt="" />';
	    break;
	}
}

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./ServiceWorker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
