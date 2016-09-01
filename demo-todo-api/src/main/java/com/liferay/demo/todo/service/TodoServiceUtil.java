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

import com.liferay.osgi.util.ServiceTrackerFactory;

import org.osgi.util.tracker.ServiceTracker;

/**
 * Provides the remote service utility for Todo. This utility wraps
 * {@link com.liferay.demo.todo.service.impl.TodoServiceImpl} and is the
 * primary access point for service operations in application layer code running
 * on a remote server. Methods of this service are expected to have security
 * checks based on the propagated JAAS credentials because this service can be
 * accessed remotely.
 *
 * @author Brian Wing Shun Chan
 * @see TodoService
 * @see com.liferay.demo.todo.service.base.TodoServiceBaseImpl
 * @see com.liferay.demo.todo.service.impl.TodoServiceImpl
 * @generated
 */
@ProviderType
public class TodoServiceUtil {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this class directly. Add custom service methods to {@link com.liferay.demo.todo.service.impl.TodoServiceImpl} and rerun ServiceBuilder to regenerate this class.
	 */
	public static com.liferay.demo.todo.model.Todo addTodo(
		java.lang.String description) {
		return getService().addTodo(description);
	}

	public static com.liferay.demo.todo.model.Todo setDone(long id, boolean done)
		throws com.liferay.portal.kernel.exception.PortalException {
		return getService().setDone(id, done);
	}

	/**
	* Returns the OSGi service identifier.
	*
	* @return the OSGi service identifier
	*/
	public static java.lang.String getOSGiServiceIdentifier() {
		return getService().getOSGiServiceIdentifier();
	}

	public static java.util.List<com.liferay.demo.todo.model.Todo> getTodos() {
		return getService().getTodos();
	}

	public static void deleteTodo(long id)
		throws com.liferay.portal.kernel.exception.PortalException {
		getService().deleteTodo(id);
	}

	public static TodoService getService() {
		return _serviceTracker.getService();
	}

	private static ServiceTracker<TodoService, TodoService> _serviceTracker = ServiceTrackerFactory.open(TodoService.class);
}