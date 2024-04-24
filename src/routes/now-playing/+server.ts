import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return redirect(301, '/');
};
