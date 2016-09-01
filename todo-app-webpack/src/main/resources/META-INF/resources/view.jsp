<%@ include file="/init.jsp" %>

<div id="todoAppWebpack"></div>

<script src="/o/todo-app-webpack-1.0.0/js/dist/bundle.js"></script>

<aui:script>
	window.App(document.getElementById('todoAppWebpack'));
</aui:script>