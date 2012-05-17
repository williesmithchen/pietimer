/*
Copyright (c) 2012, Northfield X Ltd
All rights reserved.

Modified BSD License

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
	* Redistributions of source code must retain the above copyright
	  notice, this list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright
	  notice, this list of conditions and the following disclaimer in the
	  documentation and/or other materials provided with the distribution.
	* Neither the name of the <organization> nor the
	  names of its contributors may be used to endorse or promote products
	  derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function($) {
	var val = 360;
	var methods = {
		init: function(options, callback) {
			var $this = $(this),
			settings = {
				'seconds': 10,
				'color': 'rgba(255, 255, 255, 0.8)',
				'height': $this.height(),
				'width': $this.width()
			};
			if (options) {
				$.extend(settings, options);
			}
			methods.data.settings = settings;
			methods.data.instance = $this;
			methods.data.interval = null;
			methods.data.val = 360;
			methods.data.callback = callback;
			methods.data.paused = true;
			$this.html('<canvas id="pie_timer" width="' + settings.height + '" height="' + settings.height + '"></canvas>');
		},
		start: function() {
			if (methods.data.paused) {
				if (val <= 0) {
					val = 360;
				}
				methods.data.interval = setInterval(methods.timer, 40);
				methods.data.paused = false;
			}

		},
		pause: function() {
			if (!methods.data.paused) {
				clearInterval(methods.data.interval);
				methods.data.paused = true;
			}

		},
		timer: function() {
			var canvas = document.getElementById('pie_timer');
			var callback = methods.data.callback;
			if (canvas.getContext) {

				val -= ( 360 / methods.data.settings.seconds ) / 24;

				if (val <= 0) {

					clearInterval(methods.data.interval);
					canvas.width = canvas.width;
					if (typeof callback == 'function') {
						callback.call();
					}
					methods.data.paused = true;

				} else {

					canvas.width = canvas.width;

					var ctx = canvas.getContext('2d');

					var canvas_size = [canvas.width, canvas.height];
					var radius = Math.min(canvas_size[0], canvas_size[1]) / 2;
					var center = [canvas_size[0] / 2, canvas_size[1] / 2];

					ctx.beginPath();
					ctx.moveTo(center[0], center[1]);
					var start = ( 3 * Math.PI ) / 2;
					ctx.arc(
						center[0],
						center[1],
						radius,
						start - val * ( Math.PI / 180 ),
						start,
						false
					);

					ctx.closePath();
					ctx.fillStyle = methods.data.settings.color;
					ctx.fill();

				}

			}
		},
		data: {}
	};

	jQuery.fn.pietimer = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.pietimer');
		}

		return this;
	};

})(jQuery);