export type Message = {
	receiver_id: string;
	sender_id: string;
	message: string;
	time_sent: string;
};

export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	is_doctor: boolean;
}
