// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayOut from "./pages/Root";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as loaderEvents } from "./pages/EventsPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage, {
	loader as loaderDetailEvent,
	action as actionDetailEvent,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
	action as newsletterAction,
} from "./components/Newsletter";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayOut />,
			errorElement: <ErrorPage />,
			children: [
				{ index: true, element: <HomePage /> },
				{
					path: "events",
					element: <EventsRoot />,
					children: [
						{
							index: true,
							element: <EventsPage />,
							loader: loaderEvents,
						},
						{
							path: ":eventId",
							id: "eventDetails",
							loader: loaderDetailEvent,
							children: [
								{
									index: true,
									element: <EventDetailPage />,
									action: actionDetailEvent,
								},
								{
									path: "edit",
									element: <EditEventPage />,
									action: manipulateEventAction,
								},
							],
						},
						{
							path: "new",
							element: <NewEventPage />,
							action: manipulateEventAction,
						},
					],
				},
				{
					path: "newsletter",
					element: <NewsletterPage />,
					action: newsletterAction,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
