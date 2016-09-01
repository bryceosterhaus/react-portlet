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

import com.liferay.demo.todo.model.Todo;

import com.liferay.osgi.util.ServiceTrackerFactory;

import com.liferay.portal.kernel.dao.orm.DynamicQuery;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.OrderByComparator;

import org.osgi.util.tracker.ServiceTracker;

import java.util.List;

/**
 * The persistence utility for the todo service. This utility wraps {@link com.liferay.demo.todo.service.persistence.impl.TodoPersistenceImpl} and provides direct access to the database for CRUD operations. This utility should only be used by the service layer, as it must operate within a transaction. Never access this utility in a JSP, controller, model, or other front-end class.
 *
 * <p>
 * Caching information and settings can be found in <code>portal.properties</code>
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see TodoPersistence
 * @see com.liferay.demo.todo.service.persistence.impl.TodoPersistenceImpl
 * @generated
 */
@ProviderType
public class TodoUtil {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this class directly. Modify <code>service.xml</code> and rerun ServiceBuilder to regenerate this class.
	 */

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#clearCache()
	 */
	public static void clearCache() {
		getPersistence().clearCache();
	}

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#clearCache(com.liferay.portal.kernel.model.BaseModel)
	 */
	public static void clearCache(Todo todo) {
		getPersistence().clearCache(todo);
	}

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#countWithDynamicQuery(DynamicQuery)
	 */
	public static long countWithDynamicQuery(DynamicQuery dynamicQuery) {
		return getPersistence().countWithDynamicQuery(dynamicQuery);
	}

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#findWithDynamicQuery(DynamicQuery)
	 */
	public static List<Todo> findWithDynamicQuery(DynamicQuery dynamicQuery) {
		return getPersistence().findWithDynamicQuery(dynamicQuery);
	}

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#findWithDynamicQuery(DynamicQuery, int, int)
	 */
	public static List<Todo> findWithDynamicQuery(DynamicQuery dynamicQuery,
		int start, int end) {
		return getPersistence().findWithDynamicQuery(dynamicQuery, start, end);
	}

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#findWithDynamicQuery(DynamicQuery, int, int, OrderByComparator)
	 */
	public static List<Todo> findWithDynamicQuery(DynamicQuery dynamicQuery,
		int start, int end, OrderByComparator<Todo> orderByComparator) {
		return getPersistence()
				   .findWithDynamicQuery(dynamicQuery, start, end,
			orderByComparator);
	}

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#update(com.liferay.portal.kernel.model.BaseModel)
	 */
	public static Todo update(Todo todo) {
		return getPersistence().update(todo);
	}

	/**
	 * @see com.liferay.portal.kernel.service.persistence.BasePersistence#update(com.liferay.portal.kernel.model.BaseModel, ServiceContext)
	 */
	public static Todo update(Todo todo, ServiceContext serviceContext) {
		return getPersistence().update(todo, serviceContext);
	}

	/**
	* Returns all the todos where uuid = &#63;.
	*
	* @param uuid the uuid
	* @return the matching todos
	*/
	public static List<Todo> findByUuid(java.lang.String uuid) {
		return getPersistence().findByUuid(uuid);
	}

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
	public static List<Todo> findByUuid(java.lang.String uuid, int start,
		int end) {
		return getPersistence().findByUuid(uuid, start, end);
	}

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
	public static List<Todo> findByUuid(java.lang.String uuid, int start,
		int end, OrderByComparator<Todo> orderByComparator) {
		return getPersistence().findByUuid(uuid, start, end, orderByComparator);
	}

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
	public static List<Todo> findByUuid(java.lang.String uuid, int start,
		int end, OrderByComparator<Todo> orderByComparator,
		boolean retrieveFromCache) {
		return getPersistence()
				   .findByUuid(uuid, start, end, orderByComparator,
			retrieveFromCache);
	}

	/**
	* Returns the first todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public static Todo findByUuid_First(java.lang.String uuid,
		OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().findByUuid_First(uuid, orderByComparator);
	}

	/**
	* Returns the first todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchByUuid_First(java.lang.String uuid,
		OrderByComparator<Todo> orderByComparator) {
		return getPersistence().fetchByUuid_First(uuid, orderByComparator);
	}

	/**
	* Returns the last todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public static Todo findByUuid_Last(java.lang.String uuid,
		OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().findByUuid_Last(uuid, orderByComparator);
	}

	/**
	* Returns the last todo in the ordered set where uuid = &#63;.
	*
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchByUuid_Last(java.lang.String uuid,
		OrderByComparator<Todo> orderByComparator) {
		return getPersistence().fetchByUuid_Last(uuid, orderByComparator);
	}

	/**
	* Returns the todos before and after the current todo in the ordered set where uuid = &#63;.
	*
	* @param todoId the primary key of the current todo
	* @param uuid the uuid
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the previous, current, and next todo
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public static Todo[] findByUuid_PrevAndNext(long todoId,
		java.lang.String uuid, OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence()
				   .findByUuid_PrevAndNext(todoId, uuid, orderByComparator);
	}

	/**
	* Removes all the todos where uuid = &#63; from the database.
	*
	* @param uuid the uuid
	*/
	public static void removeByUuid(java.lang.String uuid) {
		getPersistence().removeByUuid(uuid);
	}

	/**
	* Returns the number of todos where uuid = &#63;.
	*
	* @param uuid the uuid
	* @return the number of matching todos
	*/
	public static int countByUuid(java.lang.String uuid) {
		return getPersistence().countByUuid(uuid);
	}

	/**
	* Returns the todo where uuid = &#63; and groupId = &#63; or throws a {@link NoSuchTodoException} if it could not be found.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public static Todo findByUUID_G(java.lang.String uuid, long groupId)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().findByUUID_G(uuid, groupId);
	}

	/**
	* Returns the todo where uuid = &#63; and groupId = &#63; or returns <code>null</code> if it could not be found. Uses the finder cache.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchByUUID_G(java.lang.String uuid, long groupId) {
		return getPersistence().fetchByUUID_G(uuid, groupId);
	}

	/**
	* Returns the todo where uuid = &#63; and groupId = &#63; or returns <code>null</code> if it could not be found, optionally using the finder cache.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @param retrieveFromCache whether to retrieve from the finder cache
	* @return the matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchByUUID_G(java.lang.String uuid, long groupId,
		boolean retrieveFromCache) {
		return getPersistence().fetchByUUID_G(uuid, groupId, retrieveFromCache);
	}

	/**
	* Removes the todo where uuid = &#63; and groupId = &#63; from the database.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the todo that was removed
	*/
	public static Todo removeByUUID_G(java.lang.String uuid, long groupId)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().removeByUUID_G(uuid, groupId);
	}

	/**
	* Returns the number of todos where uuid = &#63; and groupId = &#63;.
	*
	* @param uuid the uuid
	* @param groupId the group ID
	* @return the number of matching todos
	*/
	public static int countByUUID_G(java.lang.String uuid, long groupId) {
		return getPersistence().countByUUID_G(uuid, groupId);
	}

	/**
	* Returns all the todos where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @return the matching todos
	*/
	public static List<Todo> findByUuid_C(java.lang.String uuid, long companyId) {
		return getPersistence().findByUuid_C(uuid, companyId);
	}

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
	public static List<Todo> findByUuid_C(java.lang.String uuid,
		long companyId, int start, int end) {
		return getPersistence().findByUuid_C(uuid, companyId, start, end);
	}

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
	public static List<Todo> findByUuid_C(java.lang.String uuid,
		long companyId, int start, int end,
		OrderByComparator<Todo> orderByComparator) {
		return getPersistence()
				   .findByUuid_C(uuid, companyId, start, end, orderByComparator);
	}

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
	public static List<Todo> findByUuid_C(java.lang.String uuid,
		long companyId, int start, int end,
		OrderByComparator<Todo> orderByComparator, boolean retrieveFromCache) {
		return getPersistence()
				   .findByUuid_C(uuid, companyId, start, end,
			orderByComparator, retrieveFromCache);
	}

	/**
	* Returns the first todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public static Todo findByUuid_C_First(java.lang.String uuid,
		long companyId, OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence()
				   .findByUuid_C_First(uuid, companyId, orderByComparator);
	}

	/**
	* Returns the first todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchByUuid_C_First(java.lang.String uuid,
		long companyId, OrderByComparator<Todo> orderByComparator) {
		return getPersistence()
				   .fetchByUuid_C_First(uuid, companyId, orderByComparator);
	}

	/**
	* Returns the last todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public static Todo findByUuid_C_Last(java.lang.String uuid, long companyId,
		OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence()
				   .findByUuid_C_Last(uuid, companyId, orderByComparator);
	}

	/**
	* Returns the last todo in the ordered set where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchByUuid_C_Last(java.lang.String uuid,
		long companyId, OrderByComparator<Todo> orderByComparator) {
		return getPersistence()
				   .fetchByUuid_C_Last(uuid, companyId, orderByComparator);
	}

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
	public static Todo[] findByUuid_C_PrevAndNext(long todoId,
		java.lang.String uuid, long companyId,
		OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence()
				   .findByUuid_C_PrevAndNext(todoId, uuid, companyId,
			orderByComparator);
	}

	/**
	* Removes all the todos where uuid = &#63; and companyId = &#63; from the database.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	*/
	public static void removeByUuid_C(java.lang.String uuid, long companyId) {
		getPersistence().removeByUuid_C(uuid, companyId);
	}

	/**
	* Returns the number of todos where uuid = &#63; and companyId = &#63;.
	*
	* @param uuid the uuid
	* @param companyId the company ID
	* @return the number of matching todos
	*/
	public static int countByUuid_C(java.lang.String uuid, long companyId) {
		return getPersistence().countByUuid_C(uuid, companyId);
	}

	/**
	* Returns all the todos where done = &#63;.
	*
	* @param done the done
	* @return the matching todos
	*/
	public static List<Todo> findBydone(boolean done) {
		return getPersistence().findBydone(done);
	}

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
	public static List<Todo> findBydone(boolean done, int start, int end) {
		return getPersistence().findBydone(done, start, end);
	}

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
	public static List<Todo> findBydone(boolean done, int start, int end,
		OrderByComparator<Todo> orderByComparator) {
		return getPersistence().findBydone(done, start, end, orderByComparator);
	}

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
	public static List<Todo> findBydone(boolean done, int start, int end,
		OrderByComparator<Todo> orderByComparator, boolean retrieveFromCache) {
		return getPersistence()
				   .findBydone(done, start, end, orderByComparator,
			retrieveFromCache);
	}

	/**
	* Returns the first todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public static Todo findBydone_First(boolean done,
		OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().findBydone_First(done, orderByComparator);
	}

	/**
	* Returns the first todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the first matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchBydone_First(boolean done,
		OrderByComparator<Todo> orderByComparator) {
		return getPersistence().fetchBydone_First(done, orderByComparator);
	}

	/**
	* Returns the last todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo
	* @throws NoSuchTodoException if a matching todo could not be found
	*/
	public static Todo findBydone_Last(boolean done,
		OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().findBydone_Last(done, orderByComparator);
	}

	/**
	* Returns the last todo in the ordered set where done = &#63;.
	*
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the last matching todo, or <code>null</code> if a matching todo could not be found
	*/
	public static Todo fetchBydone_Last(boolean done,
		OrderByComparator<Todo> orderByComparator) {
		return getPersistence().fetchBydone_Last(done, orderByComparator);
	}

	/**
	* Returns the todos before and after the current todo in the ordered set where done = &#63;.
	*
	* @param todoId the primary key of the current todo
	* @param done the done
	* @param orderByComparator the comparator to order the set by (optionally <code>null</code>)
	* @return the previous, current, and next todo
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public static Todo[] findBydone_PrevAndNext(long todoId, boolean done,
		OrderByComparator<Todo> orderByComparator)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence()
				   .findBydone_PrevAndNext(todoId, done, orderByComparator);
	}

	/**
	* Removes all the todos where done = &#63; from the database.
	*
	* @param done the done
	*/
	public static void removeBydone(boolean done) {
		getPersistence().removeBydone(done);
	}

	/**
	* Returns the number of todos where done = &#63;.
	*
	* @param done the done
	* @return the number of matching todos
	*/
	public static int countBydone(boolean done) {
		return getPersistence().countBydone(done);
	}

	/**
	* Caches the todo in the entity cache if it is enabled.
	*
	* @param todo the todo
	*/
	public static void cacheResult(Todo todo) {
		getPersistence().cacheResult(todo);
	}

	/**
	* Caches the todos in the entity cache if it is enabled.
	*
	* @param todos the todos
	*/
	public static void cacheResult(List<Todo> todos) {
		getPersistence().cacheResult(todos);
	}

	/**
	* Creates a new todo with the primary key. Does not add the todo to the database.
	*
	* @param todoId the primary key for the new todo
	* @return the new todo
	*/
	public static Todo create(long todoId) {
		return getPersistence().create(todoId);
	}

	/**
	* Removes the todo with the primary key from the database. Also notifies the appropriate model listeners.
	*
	* @param todoId the primary key of the todo
	* @return the todo that was removed
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public static Todo remove(long todoId)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().remove(todoId);
	}

	public static Todo updateImpl(Todo todo) {
		return getPersistence().updateImpl(todo);
	}

	/**
	* Returns the todo with the primary key or throws a {@link NoSuchTodoException} if it could not be found.
	*
	* @param todoId the primary key of the todo
	* @return the todo
	* @throws NoSuchTodoException if a todo with the primary key could not be found
	*/
	public static Todo findByPrimaryKey(long todoId)
		throws com.liferay.demo.todo.exception.NoSuchTodoException {
		return getPersistence().findByPrimaryKey(todoId);
	}

	/**
	* Returns the todo with the primary key or returns <code>null</code> if it could not be found.
	*
	* @param todoId the primary key of the todo
	* @return the todo, or <code>null</code> if a todo with the primary key could not be found
	*/
	public static Todo fetchByPrimaryKey(long todoId) {
		return getPersistence().fetchByPrimaryKey(todoId);
	}

	public static java.util.Map<java.io.Serializable, Todo> fetchByPrimaryKeys(
		java.util.Set<java.io.Serializable> primaryKeys) {
		return getPersistence().fetchByPrimaryKeys(primaryKeys);
	}

	/**
	* Returns all the todos.
	*
	* @return the todos
	*/
	public static List<Todo> findAll() {
		return getPersistence().findAll();
	}

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
	public static List<Todo> findAll(int start, int end) {
		return getPersistence().findAll(start, end);
	}

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
	public static List<Todo> findAll(int start, int end,
		OrderByComparator<Todo> orderByComparator) {
		return getPersistence().findAll(start, end, orderByComparator);
	}

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
	public static List<Todo> findAll(int start, int end,
		OrderByComparator<Todo> orderByComparator, boolean retrieveFromCache) {
		return getPersistence()
				   .findAll(start, end, orderByComparator, retrieveFromCache);
	}

	/**
	* Removes all the todos from the database.
	*/
	public static void removeAll() {
		getPersistence().removeAll();
	}

	/**
	* Returns the number of todos.
	*
	* @return the number of todos
	*/
	public static int countAll() {
		return getPersistence().countAll();
	}

	public static java.util.Set<java.lang.String> getBadColumnNames() {
		return getPersistence().getBadColumnNames();
	}

	public static TodoPersistence getPersistence() {
		return _serviceTracker.getService();
	}

	private static ServiceTracker<TodoPersistence, TodoPersistence> _serviceTracker =
		ServiceTrackerFactory.open(TodoPersistence.class);
}