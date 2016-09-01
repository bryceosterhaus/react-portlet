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

import com.liferay.expando.kernel.model.ExpandoBridge;

import com.liferay.exportimport.kernel.lar.StagedModelType;

import com.liferay.portal.kernel.model.ModelWrapper;
import com.liferay.portal.kernel.service.ServiceContext;

import java.io.Serializable;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * <p>
 * This class is a wrapper for {@link Todo}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see Todo
 * @generated
 */
@ProviderType
public class TodoWrapper implements Todo, ModelWrapper<Todo> {
	public TodoWrapper(Todo todo) {
		_todo = todo;
	}

	@Override
	public Class<?> getModelClass() {
		return Todo.class;
	}

	@Override
	public String getModelClassName() {
		return Todo.class.getName();
	}

	@Override
	public Map<String, Object> getModelAttributes() {
		Map<String, Object> attributes = new HashMap<String, Object>();

		attributes.put("uuid", getUuid());
		attributes.put("todoId", getTodoId());
		attributes.put("groupId", getGroupId());
		attributes.put("companyId", getCompanyId());
		attributes.put("userId", getUserId());
		attributes.put("userName", getUserName());
		attributes.put("createDate", getCreateDate());
		attributes.put("modifiedDate", getModifiedDate());
		attributes.put("description", getDescription());
		attributes.put("done", getDone());

		return attributes;
	}

	@Override
	public void setModelAttributes(Map<String, Object> attributes) {
		String uuid = (String)attributes.get("uuid");

		if (uuid != null) {
			setUuid(uuid);
		}

		Long todoId = (Long)attributes.get("todoId");

		if (todoId != null) {
			setTodoId(todoId);
		}

		Long groupId = (Long)attributes.get("groupId");

		if (groupId != null) {
			setGroupId(groupId);
		}

		Long companyId = (Long)attributes.get("companyId");

		if (companyId != null) {
			setCompanyId(companyId);
		}

		Long userId = (Long)attributes.get("userId");

		if (userId != null) {
			setUserId(userId);
		}

		String userName = (String)attributes.get("userName");

		if (userName != null) {
			setUserName(userName);
		}

		Date createDate = (Date)attributes.get("createDate");

		if (createDate != null) {
			setCreateDate(createDate);
		}

		Date modifiedDate = (Date)attributes.get("modifiedDate");

		if (modifiedDate != null) {
			setModifiedDate(modifiedDate);
		}

		String description = (String)attributes.get("description");

		if (description != null) {
			setDescription(description);
		}

		Boolean done = (Boolean)attributes.get("done");

		if (done != null) {
			setDone(done);
		}
	}

	@Override
	public Todo toEscapedModel() {
		return new TodoWrapper(_todo.toEscapedModel());
	}

	@Override
	public Todo toUnescapedModel() {
		return new TodoWrapper(_todo.toUnescapedModel());
	}

	/**
	* Returns the done of this todo.
	*
	* @return the done of this todo
	*/
	@Override
	public boolean getDone() {
		return _todo.getDone();
	}

	@Override
	public boolean isCachedModel() {
		return _todo.isCachedModel();
	}

	/**
	* Returns <code>true</code> if this todo is done.
	*
	* @return <code>true</code> if this todo is done; <code>false</code> otherwise
	*/
	@Override
	public boolean isDone() {
		return _todo.isDone();
	}

	@Override
	public boolean isEscapedModel() {
		return _todo.isEscapedModel();
	}

	@Override
	public boolean isNew() {
		return _todo.isNew();
	}

	@Override
	public ExpandoBridge getExpandoBridge() {
		return _todo.getExpandoBridge();
	}

	@Override
	public com.liferay.portal.kernel.model.CacheModel<Todo> toCacheModel() {
		return _todo.toCacheModel();
	}

	@Override
	public int compareTo(Todo todo) {
		return _todo.compareTo(todo);
	}

	@Override
	public int hashCode() {
		return _todo.hashCode();
	}

	@Override
	public Serializable getPrimaryKeyObj() {
		return _todo.getPrimaryKeyObj();
	}

	@Override
	public java.lang.Object clone() {
		return new TodoWrapper((Todo)_todo.clone());
	}

	/**
	* Returns the description of this todo.
	*
	* @return the description of this todo
	*/
	@Override
	public java.lang.String getDescription() {
		return _todo.getDescription();
	}

	/**
	* Returns the user name of this todo.
	*
	* @return the user name of this todo
	*/
	@Override
	public java.lang.String getUserName() {
		return _todo.getUserName();
	}

	/**
	* Returns the user uuid of this todo.
	*
	* @return the user uuid of this todo
	*/
	@Override
	public java.lang.String getUserUuid() {
		return _todo.getUserUuid();
	}

	/**
	* Returns the uuid of this todo.
	*
	* @return the uuid of this todo
	*/
	@Override
	public java.lang.String getUuid() {
		return _todo.getUuid();
	}

	@Override
	public java.lang.String toString() {
		return _todo.toString();
	}

	@Override
	public java.lang.String toXmlString() {
		return _todo.toXmlString();
	}

	/**
	* Returns the create date of this todo.
	*
	* @return the create date of this todo
	*/
	@Override
	public Date getCreateDate() {
		return _todo.getCreateDate();
	}

	/**
	* Returns the modified date of this todo.
	*
	* @return the modified date of this todo
	*/
	@Override
	public Date getModifiedDate() {
		return _todo.getModifiedDate();
	}

	/**
	* Returns the company ID of this todo.
	*
	* @return the company ID of this todo
	*/
	@Override
	public long getCompanyId() {
		return _todo.getCompanyId();
	}

	/**
	* Returns the group ID of this todo.
	*
	* @return the group ID of this todo
	*/
	@Override
	public long getGroupId() {
		return _todo.getGroupId();
	}

	/**
	* Returns the primary key of this todo.
	*
	* @return the primary key of this todo
	*/
	@Override
	public long getPrimaryKey() {
		return _todo.getPrimaryKey();
	}

	/**
	* Returns the todo ID of this todo.
	*
	* @return the todo ID of this todo
	*/
	@Override
	public long getTodoId() {
		return _todo.getTodoId();
	}

	/**
	* Returns the user ID of this todo.
	*
	* @return the user ID of this todo
	*/
	@Override
	public long getUserId() {
		return _todo.getUserId();
	}

	@Override
	public void persist() {
		_todo.persist();
	}

	@Override
	public void setCachedModel(boolean cachedModel) {
		_todo.setCachedModel(cachedModel);
	}

	/**
	* Sets the company ID of this todo.
	*
	* @param companyId the company ID of this todo
	*/
	@Override
	public void setCompanyId(long companyId) {
		_todo.setCompanyId(companyId);
	}

	/**
	* Sets the create date of this todo.
	*
	* @param createDate the create date of this todo
	*/
	@Override
	public void setCreateDate(Date createDate) {
		_todo.setCreateDate(createDate);
	}

	/**
	* Sets the description of this todo.
	*
	* @param description the description of this todo
	*/
	@Override
	public void setDescription(java.lang.String description) {
		_todo.setDescription(description);
	}

	/**
	* Sets whether this todo is done.
	*
	* @param done the done of this todo
	*/
	@Override
	public void setDone(boolean done) {
		_todo.setDone(done);
	}

	@Override
	public void setExpandoBridgeAttributes(ExpandoBridge expandoBridge) {
		_todo.setExpandoBridgeAttributes(expandoBridge);
	}

	@Override
	public void setExpandoBridgeAttributes(
		com.liferay.portal.kernel.model.BaseModel<?> baseModel) {
		_todo.setExpandoBridgeAttributes(baseModel);
	}

	@Override
	public void setExpandoBridgeAttributes(ServiceContext serviceContext) {
		_todo.setExpandoBridgeAttributes(serviceContext);
	}

	/**
	* Sets the group ID of this todo.
	*
	* @param groupId the group ID of this todo
	*/
	@Override
	public void setGroupId(long groupId) {
		_todo.setGroupId(groupId);
	}

	/**
	* Sets the modified date of this todo.
	*
	* @param modifiedDate the modified date of this todo
	*/
	@Override
	public void setModifiedDate(Date modifiedDate) {
		_todo.setModifiedDate(modifiedDate);
	}

	@Override
	public void setNew(boolean n) {
		_todo.setNew(n);
	}

	/**
	* Sets the primary key of this todo.
	*
	* @param primaryKey the primary key of this todo
	*/
	@Override
	public void setPrimaryKey(long primaryKey) {
		_todo.setPrimaryKey(primaryKey);
	}

	@Override
	public void setPrimaryKeyObj(Serializable primaryKeyObj) {
		_todo.setPrimaryKeyObj(primaryKeyObj);
	}

	/**
	* Sets the todo ID of this todo.
	*
	* @param todoId the todo ID of this todo
	*/
	@Override
	public void setTodoId(long todoId) {
		_todo.setTodoId(todoId);
	}

	/**
	* Sets the user ID of this todo.
	*
	* @param userId the user ID of this todo
	*/
	@Override
	public void setUserId(long userId) {
		_todo.setUserId(userId);
	}

	/**
	* Sets the user name of this todo.
	*
	* @param userName the user name of this todo
	*/
	@Override
	public void setUserName(java.lang.String userName) {
		_todo.setUserName(userName);
	}

	/**
	* Sets the user uuid of this todo.
	*
	* @param userUuid the user uuid of this todo
	*/
	@Override
	public void setUserUuid(java.lang.String userUuid) {
		_todo.setUserUuid(userUuid);
	}

	/**
	* Sets the uuid of this todo.
	*
	* @param uuid the uuid of this todo
	*/
	@Override
	public void setUuid(java.lang.String uuid) {
		_todo.setUuid(uuid);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (!(obj instanceof TodoWrapper)) {
			return false;
		}

		TodoWrapper todoWrapper = (TodoWrapper)obj;

		if (Objects.equals(_todo, todoWrapper._todo)) {
			return true;
		}

		return false;
	}

	@Override
	public StagedModelType getStagedModelType() {
		return _todo.getStagedModelType();
	}

	@Override
	public Todo getWrappedModel() {
		return _todo;
	}

	@Override
	public boolean isEntityCacheEnabled() {
		return _todo.isEntityCacheEnabled();
	}

	@Override
	public boolean isFinderCacheEnabled() {
		return _todo.isFinderCacheEnabled();
	}

	@Override
	public void resetOriginalValues() {
		_todo.resetOriginalValues();
	}

	private final Todo _todo;
}