const useFriendStatus = () => {
	const { userId } = useParams();
	const queryClient = useQueryClient();
	const profileData: { id: string; data: IUserData } | undefined = queryClient.getQueryData(["profile", userId]);

	const { mutate: updateFriend, status } = useMutation({
		mutationFn: (input: IProfileFormInput) => updateUser({ input, userId, data: profileData?.data }),

		onSuccess: (data) => {
			queryClient.setQueryData(["profile", userId], { id: userId, data });
		},

		onError: (err) => {
			console.error("SUBMIT ERROR ", err);
		},
	});

	return { submit, status };
};

export default useFriendStatus;
