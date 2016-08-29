<%@ include file="/init.jsp" %>

<div id="helloReactApp"></div>

<aui:script require="hello-react/js/main.es">
	helloReactJsMainEs.default(
		document.getElementById('helloReactApp')
	);
</aui:script>