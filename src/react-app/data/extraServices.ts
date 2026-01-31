// src/react-app/data/extraServices.ts

export interface ExtraService {
	title: string;
	detail: string;
}

const extraServices: ExtraService[] = [
	{
		title: "Laundry Service",
		detail: "On-site laundry available for guests."
	},
	{
		title: "Airport Transfer",
		detail: "Shuttle service to and from the airport upon request."
	},
	{
		title: "Daily Housekeeping",
		detail: "Rooms are cleaned and tidied every day."
	},
	{
		title: "Free Wi-Fi",
		detail: "High-speed wireless internet throughout the property."
	},
	{
		title: "Breakfast Included",
		detail: "Complimentary breakfast served every morning."
	}
];

export default extraServices;
