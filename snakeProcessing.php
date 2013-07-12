<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <!-- charset must remain utf-8 to be handled properly by Processing -->
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <title>snake005 : Built with Processing</title>

    <style type="text/css">
      /* <![CDATA[ */
	
	body {
  	  margin: 60px 0px 0px 55px;
	  font-family: verdana, geneva, arial, helvetica, sans-serif; 
	  font-size: 11px; 
	  background-color: #ddddcc; 
	  text-decoration: none; 
	  font-weight: normal; 
	  line-height: normal; 
	}
		 
	a          { color: #3399cc; }
	a:link     { color: #3399cc; text-decoration: underline; }
	a:visited  { color: #3399cc; text-decoration: underline; }
	a:active   { color: #3399cc; text-decoration: underline; }
	a:hover    { color: #3399cc; text-decoration: underline; }

      /* ]]> */
    </style>    
  </head>

  <body>
    <div id="content">
      <div id="snake005_container">

	<!-- This version plays nicer with older browsers, 
	     but requires JavaScript to be enabled. 
	     http://java.sun.com/javase/6/docs/technotes/guides/jweb/deployment_advice.html -->
	<script type="text/javascript"
		src="http://www.java.com/js/deployJava.js"></script>
	<script type="text/javascript">
	  /* <![CDATA[ */

	  var attributes = { code:'snake005.class',
                             archive: 'snake005.jar',
                             width:500, height:420 } ;
          var parameters = { };
          var version = '1.5';
          deployJava.runApplet(attributes, parameters, version);

          /* ]]> */
        </script>
        
	<noscript> <div>
	  <!--[if !IE]> -->
	  <object classid="java:snake005.class" 
            	  type="application/x-java-applet"
            	  archive="snake005.jar"
            	  width="500" height="420"
            	  standby="Loading Processing software..." >
            
	    <param name="archive" value="snake005.jar" />
	    
	    <param name="mayscript" value="true" />
	    <param name="scriptable" value="true" />
	    
	    <param name="image" value="loading.gif" />
	    <param name="boxmessage" value="Loading Processing software..." />
	    <param name="boxbgcolor" value="#FFFFFF" />
	    
	    <param name="test_string" value="outer" />
	  <!--<![endif]-->

	    <!-- For more instructions on deployment, 
		 or to update the CAB file listed here, see:
		 http://java.sun.com/javase/6/webnotes/family-clsid.html
		 http://java.sun.com/javase/6/webnotes/install/jre/autodownload.html -->
	    <object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
		    codebase="http://java.sun.com/update/1.6.0/jinstall-6u18-windows-i586.cab"
		    width="500" height="420"
		    standby="Loading Processing software..."  >
	      
	      <param name="code" value="snake005" />
	      <param name="archive" value="snake005.jar" />
	      
	      <param name="mayscript" value="true" />
	      <param name="scriptable" value="true" />
	      
	      <param name="image" value="loading.gif" />
	      <param name="boxmessage" value="Loading Processing software..." />
	      <param name="boxbgcolor" value="#FFFFFF" />
	      
	      <param name="test_string" value="inner" />
	      
	      <p>
		<strong>
		  This browser does not have a Java Plug-in.
		  <br />
		  <a href="http://www.java.com/getjava" title="Download Java Plug-in">
		    Get the latest Java Plug-in here.
		  </a>
		</strong>
	      </p>
	      
	    </object>
	    
	  <!--[if !IE]> -->
	  </object>
	  <!--<![endif]-->

	</div> </noscript>

      </div>
      
      <p>
	
      </p>
      
      <p>
	Source code: <a href="snake005.pde">snake005</a> <a href="FoodBlock.pde">FoodBlock</a> <a href="SnakeBlock.pde">SnakeBlock</a> 
      </p>
      
      <p>
	Built with <a href="http://processing.org" title="Processing.org">Processing</a>
      </p>
    </div>
  </body>
</html>
