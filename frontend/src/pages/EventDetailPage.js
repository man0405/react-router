import { Suspense } from "react";
import {
	useRouteLoaderData,
	json,
	redirect,
	defer,
	Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
const EventDetailPage = (props) => {
	const data = useRouteLoaderData("eventDetails");
	const { event, events } = data;

	return (
		<>
			<Suspense
				fallback={<p style={{ textAlign: "center" }}>Loading ......</p>}
			>
				<Await resolve={event}>
					{(loaderEvent) => <EventItem event={loaderEvent} />}
				</Await>
			</Suspense>
			<Suspense
				fallback={<p style={{ textAlign: "center" }}>Loading ......</p>}
			>
				<Await resolve={events}>
					{(loaderEvents) => <EventsList events={loaderEvents} />}
				</Await>
			</Suspense>
		</>
	);
};

export default EventDetailPage;

async function loaderEvents() {
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

async function loaderEvent(id) {
	const response = await fetch("http://localhost:8080/events/" + id);

	if (!response.ok) {
		throw json(
			{ message: "Could not fetch details for selected event" },
			{ status: 500 }
		);
	} else {
		const resData = await response.json();
		return resData.event;
	}
}

export async function loader({ request, params }) {
	const id = params.eventId;

	return defer({
		event: loaderEvent(id),
		events: loaderEvents(),
	});
}

export async function action({ request, params }) {
	const id = params.eventId;
	const response = await fetch("http://localhost:8080/events/" + id, {
		method: request.method,
	});

	if (!response.ok) {
		throw json({ message: "Could not delete event" }, { status: 500 });
	}

	return redirect("/events");
}
