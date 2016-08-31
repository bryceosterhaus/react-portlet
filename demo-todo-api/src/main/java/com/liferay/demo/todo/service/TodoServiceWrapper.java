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
 * Provides a wrapper for {@link TodoService}.
 *
 * @author Brian Wing Shun Chan
 * @see TodoService
 * @generated
 */
@ProviderType
public class TodoServiceWrapper implements TodoService,
	ServiceWrapper<TodoService> {
	public TodoServiceWrapper(TodoService todoService) {
		_todoService = todoService;
	}

	@Override
	public com.liferay.demo.todo.model.Todo addTodo(
		java.lang.String description) {
		return _todoService.addTodo(description);
	}

	@Override
	public com.liferay.demo.todo.model.Todo setDone(long id, boolean done)
		throws com.liferay.portal.kernel.exception.PortalException {
		return _todoService.setDone(id, done);
	}

	/**
	* Returns the OSGi service identifier.
	*
	* @return the OSGi service identifier
	*/
	@Override
	public java.lang.String getOSGiServiceIdentifier() {
		return _todoService.getOSGiServiceIdentifier();
	}

	@Override
	public java.util.List<com.liferay.demo.todo.model.Todo> getTodos() {
		return _todoService.getTodos();
	}

	@Override
	public void deleteTodo(long id)
		throws com.liferay.portal.kernel.exception.PortalException {
		_todoService.deleteTodo(id);
	}

	@Override
	public TodoService getWrappedService() {
		return _todoService;
	}

	@Override
	public void setWrappedService(TodoService todoService) {
		_todoService = todoService;
	}

	private TodoService _todoService;
}