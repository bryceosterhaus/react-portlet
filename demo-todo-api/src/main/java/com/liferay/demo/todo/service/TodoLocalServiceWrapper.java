/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.demo.todo.service;

import aQute.bnd.annotation.ProviderType;

import com.liferay.portal.kernel.service.ServiceWrapper;

/**
 * Provides a wrapper for {@link TodoLocalService}.
 *
 * @author Brian Wing Shun Chan
 * @see TodoLocalService
 * @generated
 */
@ProviderType
public class TodoLocalServiceWrapper implements TodoLocalService,
	ServiceWrapper<TodoLocalService> {
	public TodoLocalServiceWrapper(TodoLocalService todoLocalService) {
		_todoLocalService = todoLocalService;
	}

	/**
	* Adds the todo to the database. Also notifies the appropriate model listeners.
	*
	* @param todo the todo
	* @return the todo that was added
	*/
	@Override
	public com.liferay.demo.todo.model.Todo addTodo(
		com.liferay.demo.todo.model.Todo todo) {
		return _todoLocalService.addTodo(todo);
	}

	/**
	* Creates a new todo with the primary key. Does not add the todo to the database.
	*
	* @param todoId the primary key for the new todo
	* @return the new todo
	*/
	@Override
	public com.liferay.demo.todo.model.Todo createTodo(long todoId) {
		return _todoLocalService.createTodo(todoId);
	}

	/**
	* Deletes the todo from the database. Also notifies the appropriate model listeners.
	*
	* @param todo the todo
	* @return the todo that was removed
	*/
	@Override
	public com.liferay.demo.todo.model.Todo deleteTodo(
		com.liferay.demo.todo.model.Todo todo) {
		return _todoLocalService.deleteTodo(todo);
	}

	/**
	* Deletes the todo with the primary key from the database. Also notifies the appropriate model listeners.
	*
	* @param todoId the primary key of the todo
	* @return the todo that was removed
	* @throws PortalException if a todo with the primary key could not be found
	*/
	@Override
	public com.liferay.demo.todo.model.Todo deleteTodo(long todoId)
		throws com.liferay.portal.kernel.exception.PortalException {
		return _todoLocalService.deleteTodo(todoId);
	}

	@Override
	public com.liferay.demo.todo.model.Todo fetchTodo(long todoId) {
		return _todoLocalService.fetchTodo(todoId);
	}

	/**
	* Returns the todo matching the UUID and group.
	*
	* @param uuid the todo's UUID
	* @param groupId the primary key of the group
	* @return the matching todo, or <code>null</code> if a matching todo could not be found
	*/
	@Override
	public com.liferay.demo.todo.model.Todo fetchTodoByUuidAndGroupId(
		java.lang.String uuid, long groupId) {
		return _todoLocalService.fetchTodoByUuidAndGroupId(uuid, groupId);
	}

	/**
	* Returns the todo with the primary key.
	*
	* @param todoId the primary key of the todo
	* @return the todo
	* @throws PortalException if a todo with the primary key could not be found
	*/
	@Override
	public com.liferay.demo.todo.model.Todo getTodo(long todoId)
		throws com.liferay.portal.kernel.exception.PortalException {
		return _todoLocalService.getTodo(todoId);
	}

	/**
	* Returns the todo matching the UUID and group.
	*
	* @param uuid the todo's UUID
	* @param groupId the primary key of the group
	* @return the matching todo
	* @throws PortalException if a matching todo could not be found
	*/
	@Override
	public com.liferay.demo.todo.model.Todo getTodoByUuidAndGroupId(
		java.lang.String uuid, long groupId)
		throws com.liferay.portal.kernel.exception.PortalException {
		return _todoLocalService.getTodoByUuidAndGroupId(uuid, groupId);
	}

	/**
	* Updates the todo in the database or adds it if it does not yet exist. Also notifies the appropriate model listeners.
	*
	* @param todo the todo
	* @return the todo that was updated
	*/
	@Override
	public com.liferay.demo.todo.model.Todo updateTodo(
		com.liferay.demo.todo.model.Todo todo) {
		return _todoLocalService.updateTodo(todo);
	}

	@Override
	public com.liferay.portal.kernel.dao.orm.ActionableDynamicQuery getActionableDynamicQuery() {
		return _todoLocalService.getActionableDynamicQuery();
	}

	@Override
	public com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery() {
		return _todoLocalService.dynamicQuery();
	}

	@Override
	public com.liferay.portal.kernel.dao.orm.ExportActionableDynamicQuery getExportActionableDynamicQuery(
		com.liferay.exportimport.kernel.lar.PortletDataContext portletDataContext) {
		return _todoLocalService.getExportActionableDynamicQuery(portletDataContext);
	}

	@Override
	public com.liferay.portal.kernel.dao.orm.IndexableActionableDynamicQuery getIndexableActionableDynamicQuery() {
		return _todoLocalService.getIndexableActionableDynamicQuery();
	}

	/**
	* @throws PortalException
	*/
	@Override
	public com.liferay.portal.kernel.model.PersistedModel deletePersistedModel(
		com.liferay.portal.kernel.model.PersistedModel persistedModel)
		throws com.liferay.portal.kernel.exception.PortalException {
		return _todoLocalService.deletePersistedModel(persistedModel);
	}

	@Override
	public com.liferay.portal.kernel.model.PersistedModel getPersistedModel(
		java.io.Serializable primaryKeyObj)
		throws com.liferay.portal.kernel.exception.PortalException {
		return _todoLocalService.getPersistedModel(primaryKeyObj);
	}

	/**
	* Returns the number of todos.
	*
	* @return the number of todos
	*/
	@Override
	public int getTodosCount() {
		return _todoLocalService.getTodosCount();
	}

	/**
	* Returns the OSGi service identifier.
	*
	* @return the OSGi service identifier
	*/
	@Override
	public java.lang.String getOSGiServiceIdentifier() {
		return _todoLocalService.getOSGiServiceIdentifier();
	}

	/**
	* Performs a dynamic query on the database and returns the matching rows.
	*
	* @param dynamicQuery the dynamic query
	* @return the matching rows
	*/
	@Override
	public <T> java.util.List<T> dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery) {
		return _todoLocalService.dynamicQuery(dynamicQuery);
	}

	/**
	* Performs a dynamic query on the database and returns a range of the matching rows.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.demo.todo.model.impl.TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param dynamicQuery the dynamic query
	* @param start the lower bound of the range of model instances
	* @param end the upper bound of the range of model instances (not inclusive)
	* @return the range of matching rows
	*/
	@Override
	public <T> java.util.List<T> dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery, int start,
		int end) {
		return _todoLocalService.dynamicQuery(dynamicQuery, start, end);
	}

	/**
	* Performs a dynamic query on the database and returns an ordered range of the matching rows.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.demo.todo.model.impl.TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param dynamicQuery the dynamic query
	* @param start the lower bound of the range of model instances
	* @param end the upper bound of the range of model instances (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @return the ordered range of matching rows
	*/
	@Override
	public <T> java.util.List<T> dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery, int start,
		int end,
		com.liferay.portal.kernel.util.OrderByComparator<T> orderByComparator) {
		return _todoLocalService.dynamicQuery(dynamicQuery, start, end,
			orderByComparator);
	}

	/**
	* Returns a range of all the todos.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.demo.todo.model.impl.TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @return the range of todos
	*/
	@Override
	public java.util.List<com.liferay.demo.todo.model.Todo> getTodos(
		int start, int end) {
		return _todoLocalService.getTodos(start, end);
	}

	/**
	* Returns all the todos matching the UUID and company.
	*
	* @param uuid the UUID of the todos
	* @param companyId the primary key of the company
	* @return the matching todos, or an empty list if no matches were found
	*/
	@Override
	public java.util.List<com.liferay.demo.todo.model.Todo> getTodosByUuidAndCompanyId(
		java.lang.String uuid, long companyId) {
		return _todoLocalService.getTodosByUuidAndCompanyId(uuid, companyId);
	}

	/**
	* Returns a range of todos matching the UUID and company.
	*
	* @param uuid the UUID of the todos
	* @param companyId the primary key of the company
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @return the range of matching todos, or an empty list if no matches were found
	*/
	@Override
	public java.util.List<com.liferay.demo.todo.model.Todo> getTodosByUuidAndCompanyId(
		java.lang.String uuid, long companyId, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator<com.liferay.demo.todo.model.Todo> orderByComparator) {
		return _todoLocalService.getTodosByUuidAndCompanyId(uuid, companyId,
			start, end, orderByComparator);
	}

	/**
	* Returns the number of rows matching the dynamic query.
	*
	* @param dynamicQuery the dynamic query
	* @return the number of rows matching the dynamic query
	*/
	@Override
	public long dynamicQueryCount(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery) {
		return _todoLocalService.dynamicQueryCount(dynamicQuery);
	}

	/**
	* Returns the number of rows matching the dynamic query.
	*
	* @param dynamicQuery the dynamic query
	* @param projection the projection to apply to the query
	* @return the number of rows matching the dynamic query
	*/
	@Override
	public long dynamicQueryCount(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery,
		com.liferay.portal.kernel.dao.orm.Projection projection) {
		return _todoLocalService.dynamicQueryCount(dynamicQuery, projection);
	}

	@Override
	public TodoLocalService getWrappedService() {
		return _todoLocalService;
	}

	@Override
	public void setWrappedService(TodoLocalService todoLocalService) {
		_todoLocalService = todoLocalService;
	}

	private TodoLocalService _todoLocalService;
}