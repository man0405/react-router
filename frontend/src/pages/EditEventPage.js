import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
	const data = useRouteLoaderData("eventDetails");
	const event = data.event;
	return <EventForm event={event} method="patch" />;
};

export default EditEventPage;
