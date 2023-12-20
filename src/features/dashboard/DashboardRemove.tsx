import { BiSolidTrash } from "react-icons/bi";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import useDeletePost from "./useDeletePost";
import { toasterWarningOptions } from "../../ui/ToasterWarning.options";
import { Button } from "../../ui/Button";
import ToasterWarning from "../../ui/ToasterWarning";

const RemoveButton = styled(Button)`
	position: absolute;
	bottom: 1rem;
	right: 1rem;
`;

const message = "Are you sure you want to delete this post?";

//TODO: Change to dynamic loggedUserId
const DashboardRemove = ({ postCreatorId, postId }: { postCreatorId: string; postId: string }) => {
	const { deletePost, status } = useDeletePost();
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	if (postCreatorId !== loggedUserId) return null;

	const onRemoveHandler = () => {
		toast(
			(t) => (
				<ToasterWarning
					t={t}
					confirmHandler={() => deletePost(postId)}
					message={message}
				/>
			),
			toasterWarningOptions
		);
	};

	return (
		<RemoveButton
			variant="danger"
			onClick={onRemoveHandler}
			disabled={status === "pending"}
		>
			<BiSolidTrash />
		</RemoveButton>
	);
};

export default DashboardRemove;
