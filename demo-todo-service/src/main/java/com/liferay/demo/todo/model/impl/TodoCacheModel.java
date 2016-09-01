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

package com.liferay.demo.todo.model.impl;

import aQute.bnd.annotation.ProviderType;

import com.liferay.demo.todo.model.Todo;

import com.liferay.portal.kernel.model.CacheModel;
import com.liferay.portal.kernel.util.HashUtil;
import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

import java.util.Date;

/**
 * The cache model class for representing Todo in entity cache.
 *
 * @author Brian Wing Shun Chan
 * @see Todo
 * @generated
 */
@ProviderType
public class TodoCacheModel implements CacheModel<Todo>, Externalizable {
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (!(obj instanceof TodoCacheModel)) {
			return false;
		}

		TodoCacheModel todoCacheModel = (TodoCacheModel)obj;

		if (todoId == todoCacheModel.todoId) {
			return true;
		}

		return false;
	}

	@Override
	public int hashCode() {
		return HashUtil.hash(0, todoId);
	}

	@Override
	public String toString() {
		StringBundler sb = new StringBundler(21);

		sb.append("{uuid=");
		sb.append(uuid);
		sb.append(", todoId=");
		sb.append(todoId);
		sb.append(", groupId=");
		sb.append(groupId);
		sb.append(", companyId=");
		sb.append(companyId);
		sb.append(", userId=");
		sb.append(userId);
		sb.append(", userName=");
		sb.append(userName);
		sb.append(", createDate=");
		sb.append(createDate);
		sb.append(", modifiedDate=");
		sb.append(modifiedDate);
		sb.append(", description=");
		sb.append(description);
		sb.append(", done=");
		sb.append(done);
		sb.append("}");

		return sb.toString();
	}

	@Override
	public Todo toEntityModel() {
		TodoImpl todoImpl = new TodoImpl();

		if (uuid == null) {
			todoImpl.setUuid(StringPool.BLANK);
		}
		else {
			todoImpl.setUuid(uuid);
		}

		todoImpl.setTodoId(todoId);
		todoImpl.setGroupId(groupId);
		todoImpl.setCompanyId(companyId);
		todoImpl.setUserId(userId);

		if (userName == null) {
			todoImpl.setUserName(StringPool.BLANK);
		}
		else {
			todoImpl.setUserName(userName);
		}

		if (createDate == Long.MIN_VALUE) {
			todoImpl.setCreateDate(null);
		}
		else {
			todoImpl.setCreateDate(new Date(createDate));
		}

		if (modifiedDate == Long.MIN_VALUE) {
			todoImpl.setModifiedDate(null);
		}
		else {
			todoImpl.setModifiedDate(new Date(modifiedDate));
		}

		if (description == null) {
			todoImpl.setDescription(StringPool.BLANK);
		}
		else {
			todoImpl.setDescription(description);
		}

		todoImpl.setDone(done);

		todoImpl.resetOriginalValues();

		return todoImpl;
	}

	@Override
	public void readExternal(ObjectInput objectInput) throws IOException {
		uuid = objectInput.readUTF();

		todoId = objectInput.readLong();

		groupId = objectInput.readLong();

		companyId = objectInput.readLong();

		userId = objectInput.readLong();
		userName = objectInput.readUTF();
		createDate = objectInput.readLong();
		modifiedDate = objectInput.readLong();
		description = objectInput.readUTF();

		done = objectInput.readBoolean();
	}

	@Override
	public void writeExternal(ObjectOutput objectOutput)
		throws IOException {
		if (uuid == null) {
			objectOutput.writeUTF(StringPool.BLANK);
		}
		else {
			objectOutput.writeUTF(uuid);
		}

		objectOutput.writeLong(todoId);

		objectOutput.writeLong(groupId);

		objectOutput.writeLong(companyId);

		objectOutput.writeLong(userId);

		if (userName == null) {
			objectOutput.writeUTF(StringPool.BLANK);
		}
		else {
			objectOutput.writeUTF(userName);
		}

		objectOutput.writeLong(createDate);
		objectOutput.writeLong(modifiedDate);

		if (description == null) {
			objectOutput.writeUTF(StringPool.BLANK);
		}
		else {
			objectOutput.writeUTF(description);
		}

		objectOutput.writeBoolean(done);
	}

	public String uuid;
	public long todoId;
	public long groupId;
	public long companyId;
	public long userId;
	public String userName;
	public long createDate;
	public long modifiedDate;
	public String description;
	public boolean done;
}