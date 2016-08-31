<%@ include file="/init.jsp" %>

<div id="todoAppLiferay"></div>

<aui:script require="todo-app-liferay/js/main.es">
	todoAppLiferayJsMainEs.default(
		document.getElementById('todoAppLiferay')
	);
</aui:script>