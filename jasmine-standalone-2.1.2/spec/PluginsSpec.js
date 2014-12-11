

describe("A suite", function() {
 
 it("plugin init", function() {
	  
	var a = autofill($('#test'), 'test');
	  
	  
    expect(a).not.toBe(false);
  });
  

  
  it("init without value", function() {
	  
	$('#test input').val('');

	var a = autofill($('#test'), 'test');
	 // alert($(a).val())
	  
    expect( $(a).val() ).toBe('');
  });
  
  it("init with value", function() {
	  
	$('#test input').val('hallo');

	var a = autofill($('#test'), 'test');
	  //alert($(a).val())
	  
    expect( $(a).val() ).not.toBe('');
  });
  
  
   it("click", function() {
	  
	//$('#test input').val('hallo');

	var a = autofill($('#test'), 'test');
	  //alert($(a).val())
	  
	var b = $(a).trigger('keydown');
	 
	 console.log(b);
	 
    expect(  ).not.toBe('');
  });
  
  
});

