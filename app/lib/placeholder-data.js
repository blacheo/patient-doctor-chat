const user_list = [
	{
		id: '988bcbd1-55d8-4406-970e-c28959a85597',
		name: 'Dr. Thomas Josh',
		email: 'thomasjosh@mymail.com',
		password: 'hello',
		is_doctor: true,
	},
	{
		id: '9edba52f-e794-461e-8936-5fb1e29f5e3a',
		name: 'Dr. Steven Queen',
		email: 'stevenqueen@mymail.com',
		password: 'queen',
		is_doctor: true,

	},
	{
		id: '747a8d16-05ac-419a-af6e-af6eb02a2ae8',
		name: 'Taylor Taylor',
		email: 'taylortaylor@mymail.com',
		password: 'taylorswift',
		is_doctor: 'false'
	},

	{ 
		id: '69f4440a-24fe-4317-8b07-eeb2276b30eb',
		name: 'John Perry',
		email: 'johnperry@mymail.com',
		password: 'hellotoyou',
		is_doctor: false,
	}

];

const messages = [
	{
		receiver_id: '69f4440a-24fe-4317-8b07-eeb2276b30eb',
		sender_id: '988bcbd1-55d8-4406-970e-c28959a85597',
		message: "Hello John.",
		time_sent: '2024-01-08 04:05:06',
	}
]

module.exports = {
	user_list, messages
};
