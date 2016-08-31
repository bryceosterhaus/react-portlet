<%@ include file="/init.jsp" %>

<div id="todoApp"></div>

<aui:script require="todo/js/main.es">
	todoJsMainEs.default(
		document.getElementById('todoApp')
	);
</aui:script>