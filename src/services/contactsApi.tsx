/* eslint-disable @typescript-eslint/ban-types */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../types/contact.type";

export const contactsApi = createApi({
	reducerPath: "contactsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/contacts" }),
	tagTypes: ["Contact"], // This is used to invalidate the cache
	endpoints: builder => ({
		contacts: builder.query<Contact[], void>({
			query: () => "/contacts",
			providesTags: ["Contact"], // This is used to invalidate the cache
		}),
		contact: builder.query<Contact, string>({
			query: id => `/contacts/${id}`,
			providesTags: ["Contact"], // This is used to invalidate the cache
		}),
		addContact: builder.mutation<{}, Contact>({
			query: contact => ({
				url: "/contacts",
				method: "POST",
				body: contact,
			}),
			invalidatesTags: ["Contact"], // this line for auto fetching if new contact added
		}),
		deleteContact: builder.mutation<void, string>({
			query: id => ({
				url: `/contacts/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Contact"], // this line for auto fetching if contact deleted
		}),
		updateContact: builder.mutation<void, Contact>({
			query: ({ id, ...rest }) => ({
				url: `/contacts/${id}`,
				method: "PUT",
				body: rest,
			}),
			invalidatesTags: ["Contact"], // this line for auto fetching if contact updated
		}),
	}),
});

export const {
	useContactsQuery,
	useContactQuery,
	useAddContactMutation,
	useDeleteContactMutation,
	useUpdateContactMutation,
} = contactsApi;
