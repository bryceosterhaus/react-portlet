<%@ include file="/init.jsp" %>

<p>
	<b><liferay-ui:message key="react_js_ReactJs.caption"/></b>
</p>

<aui:script require="react-js/main.es">
	console.log('module', reactJsMainEs.default());
</aui:script>