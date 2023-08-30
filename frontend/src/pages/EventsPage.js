import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
const EventsPage = (props) => {
	const { events } = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: "center" }}>Loading.......</p>}>
			<Await resolve={events}>
				{(loaderEvents) => <EventsList events={loaderEvents} />}
			</Await>
		</Suspense>
	);
};

async function loaderData() {
	const response = await fetch("http://localhost:8080/events");

	if (!response.ok) {
		//TODO: Error handling here
		// throw new Response(JSON.stringify({ message: " Could not fetch data" }), {
		// 	status: 500,
		// });
		throw json({ message: " Could not fetch data" }, { status: 500 });
	} else {
		const resData = await response.json();
		return resData.events;
	}
}

export function loader() {
	return defer({
		events: loaderData(),
	});
}

export default EventsPage;
