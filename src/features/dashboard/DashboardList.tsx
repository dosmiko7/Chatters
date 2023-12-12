import { Timestamp } from "firebase/firestore";

const TEST_LIST = [
	{
		userId: "test1",
		message: "Test message from test1. There is only text.",
		type: "text",
		created_at: new Timestamp(10000, 10000),
	},
	{
		userId: "test2",
		message: "Test 2 message is here",
		file: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDlxeTlzb3FpNG03djdyMnRuODR0dTlvMGpvOTVsNnJjZzV0NWJpbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4Ki4biBSwhjyrS48/giphy.gif",
		type: "gif",
		created_at: new Timestamp(20000, 20000),
	},
	{
		userId: "test3",
		message: "I send image. Here test 3",
		file: "https://firebasestorage.googleapis.com/v0/b/chatters---chat-app.appspot.com/o/dashboard%2FpostId3_avatar2.png?alt=media&token=255d74db-e4f5-49a8-8d4f-f73c3c448b6e",
		type: "image/png",
		created_at: new Timestamp(30000, 30000),
	},
	{
		userId: "test4",
		message: "Wow, what a great video. Look at it. Here test 4",
		file: "https://firebasestorage.googleapis.com/v0/b/chatters---chat-app.appspot.com/o/dashboard%2FpostId4_autistic.mp4?alt=media&token=9544a3a9-c891-4cdb-bd19-64c09ba3885a",
		type: "video/mp4",
		created_at: new Timestamp(40000, 40000),
	},
	{
		userId: "test5",
		message: "Here should be file. It means something, right? Here test 5",
		file: "gs://chatters---chat-app.appspot.com/dashboard/postId5_walka.WAV",
		type: "audio/wav",
		created_at: new Timestamp(50000, 50000),
	},
];

const DashboardList = () => {
	return <div>Dashboard list</div>;
};

export default DashboardList;
