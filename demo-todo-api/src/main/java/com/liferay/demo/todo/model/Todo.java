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

package com.liferay.demo.todo.model;

import aQute.bnd.annotation.ProviderType;

import com.liferay.portal.kernel.annotation.ImplementationClassName;
import com.liferay.portal.kernel.model.PersistedModel;
import com.liferay.portal.kernel.util.Accessor;

/**
 * The extended model interface for the Todo service. Represents a row in the &quot;todo_Todo&quot; database table, with each column mapped to a property of this class.
 *
 * @author Brian Wing Shun Chan
 * @see TodoModel
 * @see com.liferay.demo.todo.model.impl.TodoImpl
 * @see com.liferay.demo.todo.model.impl.TodoModelImpl
 * @generated
 */
@ImplementationClassName("com.liferay.demo.todo.model.impl.TodoImpl")
@ProviderType
public interface Todo extends TodoModel, PersistedModel {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this interface directly. Add methods to {@link com.liferay.demo.todo.model.impl.TodoImpl} and rerun ServiceBuilder to automatically copy the method declarations to this interface.
	 */
	public static final Accessor<Todo, Long> TODO_ID_ACCESSOR = new Accessor<Todo, Long>() {
			@Override
			public Long get(Todo todo) {
				return todo.getTodoId();
			}

			@Override
			public Class<Long> getAttributeClass() {
				return Long.class;
			}

			@Override
			public Class<Todo> getTypeClass() {
				return Todo.class;
			}
		};
}