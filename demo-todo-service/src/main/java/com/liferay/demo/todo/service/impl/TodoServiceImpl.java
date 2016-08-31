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

package com.liferay.demo.todo.service.impl;

import aQute.bnd.annotation.ProviderType;

import com.liferay.demo.todo.model.Todo;
import com.liferay.demo.todo.service.base.TodoServiceBaseImpl;
import com.liferay.portal.kernel.exception.PortalException;

import java.util.List;

/**
 * The implementation of the todo remote service.
 *
 * <p>
 * All custom service methods should be put in this class. Whenever methods are added, rerun ServiceBuilder to copy their definitions into the {@link com.liferay.demo.todo.service.TodoService} interface.
 *
 * <p>
 * This is a remote service. Methods of this service are expected to have security checks based on the propagated JAAS credentials because this service can be accessed remotely.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see TodoServiceBaseImpl
 * @see com.liferay.demo.todo.service.TodoServiceUtil
 */
@ProviderType
public class TodoServiceImpl extends TodoServiceBaseImpl {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never reference this class directly. Always use {@link com.liferay.demo.todo.service.TodoServiceUtil} to access the todo remote service.
	 */
	@Override
	public Todo addTodo(String description) {
		Todo todo = todoLocalService.createTodo(counterLocalService.increment());
		todo.setDescription(description);
		todo.setDone(false);
		return todoLocalService.addTodo(todo);
	}

	@Override
	public Todo setDone(long id, boolean done) throws PortalException {
		Todo todo = todoLocalService.getTodo(id);
		todo.setDone(done);
		return todoLocalService.updateTodo(todo);
	}

	@Override
	public void deleteTodo(long id) throws PortalException {
		todoLocalService.deleteTodo(id);
	}

	@Override
	public List<Todo> getTodos() {
		return todoLocalService.getTodos(0, 10);
	}
}