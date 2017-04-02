animatedTextInput
============

A very simple plugin to create some animation when a textarea and/or textinput get/lost focus. 

Needs jQuery to work.

Installation
============
### 1. Include jQuery
```bash
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
```

### 2. and include animatedTextInput JS and CSS files
```bash
<link rel="stylesheet" href="animatedInput.css" />
<script src="animatedInput.js"></script>
```

Usage
============
### Your HTML
```bash
<div class="animated-input-container">
  <label>You label</label>
  <input type="text" name="your-input" class="form-control" />
</div>
```
or can be 
```bash
<fieldset class="animated-input-container">
  <label>You label</label>
  <textarea name="your-input" class="form-control"></textarea>
</fieldset>
```

### Your Javascript
```bash
<script type="text/javascript">
  $(document).ready(function() {
    $(".animated-input-container").animatedInput({"position":"bottom"});
  });
</script>
```

Points to attention
============
- Container tag must be FIELDSET or DIV
- Use only one input and one label per container
- There is only a option that can be set (position - references to label position relative to input) and it accepts two values: "bottom" and "top" (default)
