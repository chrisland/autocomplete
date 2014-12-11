


var GLOB_jq = jQuery;




/* ##########################################################################

AUTOFILL
*/

var autofill = function ($_dom, rulename) {

	
	var root = GLOB_jq($_dom).find('#rule_'+rulename);
	
	//alert('jo');
	console.log('#rule_'+rulename, root);

	if ( !root.hasClass('.pluginDone') ) {
		
		var root_wrap = GLOB_jq('<div>',{'class':'autofill_wrap'});
		root.after(root_wrap);
		root_wrap.append(root);
	}
	
	
		
		
	//console.log(val);
	
	var val = root.val();
	var autofilldata = root.attr('data-autofill');
	if (!autofilldata) {
		return false;
	}
	autofilldata = autofilldata.split(',');
	

	if (autofilldata) {
		var domselect = root.parent().parent().find('.input_autofill_select');
		if (domselect.length >= 1) {
			domselect.val(val);

		} else {
			
			var select = GLOB_jq('<select>',{'class':'input_autofill_select'})
				.css('flex','1')
				.append('<option value="">-</option>')
				.on('change', function () {
					root.val(select.val()).trigger('change');
				});
			for (var i = 0; i < autofilldata.length; i++) {
				var opt = GLOB_jq('<option>',{'value':autofilldata[i], 'text':autofilldata[i]});
				select.append(opt);
			}
			root.after(select);
		}
	}
	

	

	var domlist = root.parent().parent().find('.input_autofill_list');
	if (domlist.length >= 1) {
		
	} else {
	
		
		
		
		
		var list = GLOB_jq('<ul>',{'class':'input_autofill_list'});
		
		root.after(list);
			
		root.on('keydown', function (e) {
			//console.log(e);
			if (e.keyCode == 13) {
				var hover = list.find('.hover');
				if (hover.length >= 1) {
					var val = hover.text();
					root.val(val).trigger('keyup'); //.blur();
					select.val(val);
					list.hide();
					//hover.removeClass('hover')
				}
				//return false;
			} else if (e.keyCode == 38) {
				// up
				var hover = list.find('.hover');
				if (hover.length >= 1) {
					//console.log('up','is');
					hover.removeClass('hover').prev('.item').addClass('hover');
				} else {
					//console.log('up','isnot');
					list.find('.item').last().addClass('hover');
				}
				
			} else if (e.keyCode == 40) {
				// down
				var hover = list.find('.hover');
				if (hover.length >= 1) {
					//console.log('down','is');
					hover.removeClass('hover').next('.item').addClass('hover');
				} else {
					//console.log('down','isnot');
					list.find('.item').first().addClass('hover');
				}
			} else {
				
				
				list.html('');
				var val = root.val();
				var newchar = String.fromCharCode(e.charCode || e.keyCode);
				if (e.shiftKey == false) {
					newchar = newchar.toLowerCase();
				}
				if (e.keyCode == 8) {
					newchar = '';
					val = val.substring(0, val.length - 1);
				}
				val = val+newchar+'';
				//console.log(e.shiftKey, e);
				//console.log('val',val);
				if (val) {
					var show = false;
					
					//console.log(val,autofilldata);
					for (var i = 0; i < autofilldata.length; i++) {
						var temp = autofilldata[i]+'';
						var nr = temp.search(val);
						//console.log(temp,nr);
						if (nr == 0) {
							
							var item = GLOB_jq('<li>', {'class':'item','text':temp})
							.on('click', function () {
								//console.log(GLOB_jq(this).text());
								var val = GLOB_jq(this).text();
								root.val(val).trigger('keyup'); //.blur();
								select.val(val);
								list.hide();
							});
						
							list.append(item);
							show = true;
						}
					}
					if (show) {
						
						//list.find('.item').first().addClass('hover');
						
						//console.log(root.offset());
						list.css('left',root.offset().left);
						list.css('top',root.offset().top + root.height());
						list.css('width',root.width());
						list.show();
					}
				}
				select.val(val);
			}
		})
		.on('blur',function () {
			//
		

			setTimeout(function() {
			      // Do something after 5 seconds
			      list.hide();
			}, 300);
			


		});

		//console.log(GLOB_jq($_dom).attr('id'),GLOB_jq($_dom).attr('class'));
		GLOB_jq($_dom).on('scroll',function() {
			list.hide();
		});
		 
	}
	
	root.addClass('.pluginDone');
	return root;
};
//module.exports.autofill = autofill;







