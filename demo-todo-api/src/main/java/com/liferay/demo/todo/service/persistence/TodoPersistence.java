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

package com.liferay.demo.todo.service.persistence;

import aQute.bnd.annotation.ProviderType;

import com.liferay.demo.todo.exception.NoSuchTodoException;
import com.liferay.demo.todo.model.Todo;

import com.liferay.portal.kernel.service.persistence.BasePersistence;

/**
 * The persistence interface for the todo service.
 *
 * <p>
 * Caching information and settings can be found in <code>portal.properties</code>
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see com.liferay.demo.todo.service.persistence.impl.TodoPersistenceImpl
 * @see TodoUtil
 * @generated
 */
@ProviderType
public interface TodoPersistence extends BasePersistence<Todo> {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this interface directly. Always use {@link TodoUtil} to access the todo persistence. Modify <code>service.xml</code> and rerun ServiceBuilder to regenerate this interface.
	 */

	/**
	* Returns all the todos where uuid = &#63;.
	*
	* @param uuid the uuid
	* @return the matching todos
	*/
	public java.util.List<Todo> findByUuid(java.lang.String uuid);

	/**
	* Returns a range of all the todos where uuid = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param uuid the uuid
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @return the range of matching todos
	*/
	public java.util.List<Todo> findByUuid(java.lang.String uuid, int start,
		int end);

	/**
	* Returns an ordered range of all the todos where uuid = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param uuid the uuid
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @return the ordered range of matching todos
	*/
	public java.util.List<Todo> findByUuid(java.lang.String uuid, int start,
		int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns an ordered range of all the todos where uuid = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param uuid the uuid
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @param retrieveFromCache whether to retrieve from the finder cache
	* @return the ordered range of matching todos
	*/
	public java.util.List<Todo> findByUuid(java.lang.String uuid, int start,
		int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator,
		boolean retrieveFromCache);

	/**
	* Returns the first todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public Todo findByUuid_First(java.lang.String uuid,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Returns the first todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchByUuid_First(java.lang.String uuid,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns the last todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public Todo findByUuid_Last(java.lang.String uuid,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Returns the last todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchByUuid_Last(java.lang.String uuid,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns the todos before and after the current todo in the ordered set where uuid = &#63;.
	*
	* @param todoId the primary key of the current todo
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the previous, current, and next todo
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public Todo[] findByUuid_PrevAndNext(long todoId, java.lang.String uuid,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Removes all the todos where uuid = &#63; from the database.
	*
	* @param uuid the uuid
	*/
	public void removeByUuid(java.lang.String uuid);

	/**
	* Returns the number of todos where uuid = &#63;.
	*
	* @param uuid the uuid
	* @return the number of matching todos
	*/
	public int countByUuid(java.lang.String uuid);

	/**
	* Returns the todo where uuid = &#63; and groupId = &#63; or throws a {@link NoSuchTodoException} if it could not be found.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public Todo findByUUID_G(java.lang.String uuid, long groupId)
		throws NoSuchTodoException;

	/**
	* Returns the todo where uuid = &#63; and groupId = &#63; or returns <code>null</code> if it could not be found. Uses the finder cache.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchByUUID_G(java.lang.String uuid, long groupId);

	/**
	* Returns the todo where uuid = &#63; and groupId = &#63; or returns <code>null</code> if it could not be found, optionally using the finder cache.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @param retrieveFromCache whether to retrieve from the finder cache
	* @return the matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchByUUID_G(java.lang.String uuid, long groupId,
		boolean retrieveFromCache);

	/**
	* Removes the todo where uuid = &#63; and groupId = &#63; from the database.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the todo that was removed
	*/
	public Todo removeByUUID_G(java.lang.String uuid, long groupId)
		throws NoSuchTodoException;

	/**
	* Returns the number of todos where uuid = &#63; and groupId = &#63;.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the number of matching todos
	*/
	public int countByUUID_G(java.lang.String uuid, long groupId);

	/**
	* Returns all the todos where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @return the matching todos
	*/
	public java.util.List<Todo> findByUuid_C(java.lang.String uuid,
		long companyId);

	/**
	* Returns a range of all the todos where uuid = &#63; and companyId = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @return the range of matching todos
	*/
	public java.util.List<Todo> findByUuid_C(java.lang.String uuid,
		long companyId, int start, int end);

	/**
	* Returns an ordered range of all the todos where uuid = &#63; and companyId = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @return the ordered range of matching todos
	*/
	public java.util.List<Todo> findByUuid_C(java.lang.String uuid,
		long companyId, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns an ordered range of all the todos where uuid = &#63; and companyId = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @param retrieveFromCache whether to retrieve from the finder cache
	* @return the ordered range of matching todos
	*/
	public java.util.List<Todo> findByUuid_C(java.lang.String uuid,
		long companyId, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator,
		boolean retrieveFromCache);

	/**
	* Returns the first todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public Todo findByUuid_C_First(java.lang.String uuid, long companyId,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Returns the first todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchByUuid_C_First(java.lang.String uuid, long companyId,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns the last todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public Todo findByUuid_C_Last(java.lang.String uuid, long companyId,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Returns the last todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchByUuid_C_Last(java.lang.String uuid, long companyId,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns the todos before and after the current todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param todoId the primary key of the current todo
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the previous, current, and next todo
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public Todo[] findByUuid_C_PrevAndNext(long todoId, java.lang.String uuid,
		long companyId,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Removes all the todos where uuid = &#63; and companyId = &#63; from the database.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	*/
	public void removeByUuid_C(java.lang.String uuid, long companyId);

	/**
	* Returns the number of todos where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @return the number of matching todos
	*/
	public int countByUuid_C(java.lang.String uuid, long companyId);

	/**
	* Returns all the todos where done = &#63;.
	*
	* @param done the done
	* @return the matching todos
	*/
	public java.util.List<Todo> findBydone(boolean done);

	/**
	* Returns a range of all the todos where done = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param done the done
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @return the range of matching todos
	*/
	public java.util.List<Todo> findBydone(boolean done, int start, int end);

	/**
	* Returns an ordered range of all the todos where done = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param done the done
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @return the ordered range of matching todos
	*/
	public java.util.List<Todo> findBydone(boolean done, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns an ordered range of all the todos where done = &#63;.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param done the done
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @param retrieveFromCache whether to retrieve from the finder cache
	* @return the ordered range of matching todos
	*/
	public java.util.List<Todo> findBydone(boolean done, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator,
		boolean retrieveFromCache);

	/**
	* Returns the first todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public Todo findBydone_First(boolean done,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Returns the first todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchBydone_First(boolean done,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns the last todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public Todo findBydone_Last(boolean done,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Returns the last todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public Todo fetchBydone_Last(boolean done,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns the todos before and after the current todo in the ordered set where done = &#63;.
	*
	* @param todoId the primary key of the current todo
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the previous, current, and next todo
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public Todo[] findBydone_PrevAndNext(long todoId, boolean done,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator)
		throws NoSuchTodoException;

	/**
	* Removes all the todos where done = &#63; from the database.
	*
	* @param done the done
	*/
	public void removeBydone(boolean done);

	/**
	* Returns the number of todos where done = &#63;.
	*
	* @param done the done
	* @return the number of matching todos
	*/
	public int countBydone(boolean done);

	/**
	* Caches the todo in the entity cache if it is enabled.
	*
	* @param todo the todo
	*/
	public void cacheResult(Todo todo);

	/**
	* Caches the todos in the entity cache if it is enabled.
	*
	* @param todos the todos
	*/
	public void cacheResult(java.util.List<Todo> todos);

	/**
	* Creates a new todo with the primary key. Does not add the todo to the database.
	*
	* @param todoId the primary key for the new todo
	* @return the new todo
	*/
	public Todo create(long todoId);

	/**
	* Removes the todo with the primary key from the database. Also notifies the appropriate model listeners.
	*
	* @param todoId the primary key of the todo
	* @return the todo that was removed
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public Todo remove(long todoId) throws NoSuchTodoException;

	public Todo updateImpl(Todo todo);

	/**
	* Returns the todo with the primary key or throws a {@link NoSuchTodoException} if it could not be found.
	*
	* @param todoId the primary key of the todo
	* @return the todo
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public Todo findByPrimaryKey(long todoId) throws NoSuchTodoException;

	/**
	* Returns the todo with the primary key or returns <code>null</code> if it could not be found.
	*
	* @param todoId the primary key of the todo
	* @return the todo, or <code>null</code> if a todo with the primary key could not be found
	*/
	public Todo fetchByPrimaryKey(long todoId);

	@Override
	public java.util.Map<java.io.Serializable, Todo> fetchByPrimaryKeys(
		java.util.Set<java.io.Serializable> primaryKeys);

	/**
	* Returns all the todos.
	*
	* @return the todos
	*/
	public java.util.List<Todo> findAll();

	/**
	* Returns a range of all the todos.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @return the range of todos
	*/
	public java.util.List<Todo> findAll(int start, int end);

	/**
	* Returns an ordered range of all the todos.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @return the ordered range of todos
	*/
	public java.util.List<Todo> findAll(int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator);

	/**
	* Returns an ordered range of all the todos.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link TodoModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param start the lower bound of the range of todos
	* @param end the upper bound of the range of todos (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @param retrieveFromCache whether to retrieve from the finder cache
	* @return the ordered range of todos
	*/
	public java.util.List<Todo> findAll(int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator<Todo> orderByComparator,
		boolean retrieveFromCache);

	/**
	* Removes all the todos from the database.
	*/
	public void removeAll();

	/**
	* Returns the number of todos.
	*
	* @return the number of todos
	*/
	public int countAll();

	@Override
	public java.util.Set<java.lang.String> getBadColumnNames();
}